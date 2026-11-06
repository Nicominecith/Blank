import { store, env, json, safeEq, validName, keyOf, readBody } from "../lib/common.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Nur POST" }, 405);
  if (!env("JOIN_PASSWORD")) return json({ error: "JOIN_PASSWORD ist nicht gesetzt." }, 500);
  const { name, fullName, password } = await readBody(req);
  const full = typeof fullName === "string" ? fullName.trim().replace(/\s+/g, " ") : "";
  if (!/^[\p{L}][\p{L}\p{M} .'-]{1,39}$/u.test(full)) return json({ error: "Bitte deinen vollständigen Namen angeben (2–40 Zeichen)." }, 400);
  if (!validName(name)) return json({ error: "Ungültiger Minecraft-Name (3–16 Zeichen: Buchstaben, Zahlen, _ . Leerzeichen)." }, 400);
  if (!safeEq(password, env("JOIN_PASSWORD"))) return json({ error: "Falsches Passwort." }, 403);

  const s = store();
  const key = keyOf(name);
  const existing = await s.get(key, { type: "json" });
  if (existing) return json({ ok: true, status: existing.status, name: existing.name, realmCode: env("REALM_CODE") || null });

  const member = { name: name.trim(), fullName: full, status: "pending", createdAt: Date.now() };
  await s.setJSON(key, member);
  return json({ ok: true, status: "pending", name: member.name, realmCode: env("REALM_CODE") || null });
};

export const config = { path: "/api/register" };
