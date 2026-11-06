import { store, json, listAll } from "../lib/common.mjs";

export default async () => {
  const all = await listAll(store());
  const members = all
    .filter((m) => m.status === "approved")
    .sort((a, b) => (a.approvedAt || 0) - (b.approvedAt || 0))
    .map((m) => ({ name: m.name, fullName: m.fullName || "" }));
  return json({ members });
};

export const config = { path: "/api/members" };
