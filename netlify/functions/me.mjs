import { store, env, json, safeEq, validName, keyOf, readBody } from "../lib/common.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Nur POST" }, 405);
  const { name, password } = await readBody(req);
  if (!validName(name)) return json({ error: "Ungültiger Name." }, 400);
  if (!safeEq(password, env("JOIN_PASSWORD"))) return json({ error: "Falsches Passwort." }, 403);
  const realmCode = env("REALM_CODE") || null;
  const m = await store().get(keyOf(name), { type: "json" });
  if (!m) return json({ status: "none", realmCode });
  return json({ status: m.status, name: m.name, realmCode });
};

export const config = { path: "/api/me" };
