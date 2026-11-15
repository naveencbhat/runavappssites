/**
 * generate.js — builds the Runav Apps site from products-data.js.
 *
 *   npm run generate          → regenerates products/*.html child pages
 *   npm run generate:scan     → re-scans C:\Naveen project READMEs and refreshes
 *                               products-data.js (preserves `enabled` flags & edits)
 *   npm run upload            → uploads new files to the site (see upload.js)
 *
 * The `enabled` flag in products-data.js controls whether a product appears
 * in the Products menu and grid.
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const OUT = path.join(ROOT, "products");
const DATA = path.join(ROOT, "products-data.js");

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function loadProducts() {
  // products-data.js is a plain script that defines `const PRODUCTS = [...]`
  const src = fs.readFileSync(DATA, "utf8");
  const m = src.match(/const PRODUCTS = ([\s\S]*?\n\]);/);
  if (!m) throw new Error("Could not find PRODUCTS array in products-data.js");
  return eval(m[1]); // eslint-disable-line no-eval
}

function saveProducts(products) {
  const src = fs.readFileSync(DATA, "utf8");
  const next = src.replace(
    /const PRODUCTS = \[[\s\S]*?\n\];/,
    "const PRODUCTS = " + JSON.stringify(products, null, 2) + ";",
  );
  fs.writeFileSync(DATA, next);
}

function childPage(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23c9a86a'/><text x='50' y='72' font-size='62' font-weight='bold' text-anchor='middle' fill='%230b0e14'>R</text></svg>">
<title>${esc(p.name)} — Runav Apps</title>
<meta name="description" content="${esc(p.short)}">
<style>
  :root{--bg:#0b0e14;--card:#151b29;--text:#e8ecf4;--muted:#9aa5b8;--accent:#c9a86a;--accent2:#e6cfa0;--line:rgba(255,255,255,.07)}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.7}
  .wrap{max-width:900px;margin:0 auto;padding:0 24px}
  header{border-bottom:1px solid var(--line);padding:20px 0}
  .back{color:var(--muted);font-size:.9rem;text-decoration:none}
  .back:hover{color:var(--accent)}
  .hero{padding:70px 0 40px;background:radial-gradient(800px 300px at 70% -20%,rgba(201,168,106,.12),transparent 60%)}
  .kicker{color:var(--accent);text-transform:uppercase;letter-spacing:.28em;font-size:.75rem;font-weight:700}
  h1{font-size:clamp(2rem,4.5vw,3rem);margin:.4rem 0 .3rem;letter-spacing:-.02em}
  .tagline{color:var(--muted);font-size:1.1rem}
  .status{display:inline-block;margin-top:14px;font-size:.75rem;padding:5px 14px;border-radius:99px;border:1px solid rgba(201,168,106,.4);color:var(--accent2)}
  section{padding:40px 0}
  h2{font-size:1.35rem;margin-bottom:1rem}
  p{color:var(--muted)}
  .badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
  .badge{font-size:.78rem;padding:5px 13px;border-radius:99px;background:var(--card);border:1px solid var(--line);color:var(--muted)}
  ul{list-style:none;margin-top:10px}
  li{color:var(--muted);padding:8px 0 8px 28px;position:relative}
  li::before{content:'✦';position:absolute;left:0;color:var(--accent)}
  footer{border-top:1px solid var(--line);padding:30px 0;text-align:center;color:var(--muted);font-size:.85rem}
  footer a{color:var(--accent);text-decoration:none}
</style>
</head>
<body>
<header><div class="wrap"><a class="back" href="../index.html">← Runav Apps</a></div></header>
<div class="hero">
  <div class="wrap">
    <div class="kicker">${esc(p.category)}</div>
    <h1>${esc(p.name)}</h1>
    <div class="tagline">${esc(p.tagline)}</div>
    <span class="status">${esc(p.status)}</span>
  </div>
</div>
<section><div class="wrap">
  <h2>About</h2>
  <p>${esc(p.description)}</p>
  <div class="badges" style="margin-top:22px">${p.stack.map((s) => `<span class="badge">${esc(s)}</span>`).join("")}</div>
</div></section>
<section><div class="wrap">
  <h2>Highlights</h2>
  <ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
</div></section>
<footer><div class="wrap">© ${new Date().getFullYear()} <a href="../index.html">Runav Apps</a></div></footer>
</body>
</html>`;
}

function main() {
  const products = loadProducts();
  const enabled = products.filter((p) => p.enabled);
  fs.mkdirSync(OUT, { recursive: true });

  for (const p of enabled) {
    const file = path.join(OUT, slug(p.name) + ".html");
    fs.writeFileSync(file, childPage(p));
    console.log("  ✓", file.replace(ROOT + path.sep, ""));
  }
  // remove stale pages for disabled/renamed products
  const valid = new Set(enabled.map((p) => slug(p.name) + ".html"));
  for (const f of fs.readdirSync(OUT)) {
    if (!valid.has(f)) {
      fs.unlinkSync(path.join(OUT, f));
      console.log("  ✗ removed", f);
    }
  }
  console.log(`\n${enabled.length} product page(s) written to products/`);
}

if (require.main === module) main();
module.exports = { loadProducts, saveProducts, slug };
