const $ = (s, r = document) => r.querySelector(s);
const head = (n, s = 80) => `https://minotar.net/helm/${encodeURIComponent(n)}/${s}.png`;
async function api(path, opts = {}) {
  const r = await fetch(path, opts);
  let d = {};
  try { d = await r.json(); } catch {}
  if (!r.ok) throw new Error(d.error || "Fehler " + r.status);
  return d;
}
const post = (path, body, headers = {}) =>
  api(path, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
function msg(el, text, type = "") { el.className = "msg " + type; el.textContent = text; el.classList.remove("hide"); }
function memberRow(m, extra) {
  const row = document.createElement("div"); row.className = "row";
  const who = document.createElement("div"); who.className = "who";
  const img = document.createElement("img"); img.src = head(m.name, 40); img.alt = ""; img.loading = "lazy";
  const nm = document.createElement("span"); nm.textContent = (m.fullName ? m.fullName + " · " : "") + m.name;
  who.append(img, nm); row.append(who);
  if (extra) row.append(extra);
  return row;
}
