import { store, env, json, safeEq, validName, keyOf, readBody, listAll } from "../lib/common.mjs";

export default async (req) => {
  const pw = req.headers.get("x-admin-password");
  if (!env("ADMIN_PASSWORD")) return json({ error: "ADMIN_PASSWORD ist nicht gesetzt." }, 500);
  if (!safeEq(pw, env("ADMIN_PASSWORD"))) return json({ error: "Falsches Admin-Passwort." }, 401);

  const s = store();
  if (req.method === "GET") {
    const all = await listAll(s);
    all.sort((a, b) => a.createdAt - b.createdAt);
    return json({ members: all });
  }
  if (req.method === "POST") {
    const { action, name } = await readBody(req);
    if (!validName(name)) return json({ error: "Ungültiger Name." }, 400);
    const key = keyOf(name);
    const m = await s.get(key, { type: "json" });
    if (!m) return json({ error: "Nicht gefunden." }, 404);
    if (action === "approve") {
      await s.setJSON(key, { ...m, status: "approved", approvedAt: Date.now() });
    } else if (action === "reject" || action === "remove") {
      await s.delete(key);
    } else {
      return json({ error: "Unbekannte Aktion." }, 400);
    }
    return json({ ok: true });
  }
  return json({ error: "Methode nicht erlaubt" }, 405);
};

export const config = { path: "/api/admin" };
