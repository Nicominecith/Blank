import { env, json, safeEq, readBody } from "../lib/common.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Nur POST" }, 405);
  const { password } = await readBody(req);
  if (!safeEq(password, env("JOIN_PASSWORD"))) return json({ error: "Falsches Passwort." }, 403);
  const code = env("REALM_CODE");
  if (!code) return json({ error: "Realm-Code ist noch nicht hinterlegt." }, 404);
  return json({ realmCode: code });
};

export const config = { path: "/api/realm" };
