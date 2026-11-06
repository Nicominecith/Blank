import { getStore } from "@netlify/blobs";
import { timingSafeEqual } from "node:crypto";

export const store = () => getStore({ name: "members", consistency: "strong" });

export const env = (k) => (globalThis.Netlify?.env?.get(k) ?? process.env[k] ?? "");

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export function safeEq(a, b) {
  if (!a || !b) return false;
  const A = Buffer.from(String(a));
  const B = Buffer.from(String(b));
  return A.length === B.length && timingSafeEqual(A, B);
}

export const validName = (n) => typeof n === "string" && /^[A-Za-z0-9_. ]{3,16}$/.test(n.trim());
export const keyOf = (n) => n.trim().toLowerCase().replace(/\s+/g, "_");

export async function readBody(req) {
  try { return await req.json(); } catch { return {}; }
}

export async function listAll(s) {
  const { blobs } = await s.list();
  const all = await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })));
  return all.filter(Boolean);
}
