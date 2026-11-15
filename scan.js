/**
 * scan.js — re-scans each project folder under C:\Naveen (excluding runavappssites)
 * and refreshes products-data.js, while preserving your `enabled` flags and any
 * custom edits to tagline/short/description/highlights.
 *
 *   npm run generate:scan
 *
 * NEW repos found under C:\Naveen (or one level deep, containing a README.md or
 * package.json) are ADDED AUTOMATICALLY as disabled products ("enabled": false),
 * with name/tagline/short pulled from the README so they're ready to review.
 * Enable them with:  npm run generate:scan -- --enable "NewProjectName"
 * (or set "enabled": true in products-data.js).
 *
 * Enable/disable any product via: npm run generate:scan -- --disable "BharatBolo"
 */
const fs = require("fs");
const path = require("path");
const { loadProducts, saveProducts } = require("./generate");

const C_NAVEEN = "C:\\Naveen";
const SKIP = ["runavappssites"];

// Where to find repo metadata inside each scanned folder (repo may be nested).
const SUBDIR_HINTS = ["bharat-ai-engine"];

function readFirstLines(p, n = 80) {
  try {
    return fs.readFileSync(p, "utf8").split(/\r?\n/).slice(0, n).join("\n");
  } catch {
    return "";
  }
}

function discoverRepos() {
  const repos = [];
  for (const dir of fs.readdirSync(C_NAVEEN, { withFileTypes: true })) {
    if (!dir.isDirectory() || SKIP.includes(dir.name)) continue;
    const root = path.join(C_NAVEEN, dir.name);
    if (fs.existsSync(path.join(root, "README.md"))) repos.push(root);
    // nested repos (e.g. AI_Model_Project/bharat-ai-engine)
    for (const hint of SUBDIR_HINTS) {
      const nested = path.join(root, hint);
      if (fs.existsSync(path.join(nested, "README.md"))) repos.push(nested);
    }
  }
  return repos;
}

function titleCase(s) {
  return s
    .replace(/[-_.]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** Pull name, first-heading tagline and summary paragraph from a repo's README. */
function extractInfo(repoPath) {
  const lines = readFirstLines(path.join(repoPath, "README.md"), 120)
    .split(/\r?\n/)
    .map((l) => l.trim());

  let name = "";
  const h1Idx = lines.findIndex((l) => /^#\s+/.test(l));
  if (h1Idx >= 0) name = titleCase(lines[h1Idx].replace(/^#+\s*/, "").trim());

  const paras = [];
  let current = [];
  for (const l of lines.slice(h1Idx + 1)) {
    if (
      l === "" ||
      l.startsWith("#") ||
      l.startsWith("|") ||
      l.startsWith("```") ||
      l.startsWith("![")
    ) {
      if (current.length) paras.push(current.join(" "));
      current = [];
      if (paras.length >= 3) break;
    } else {
      current.push(
        l.replace(/[`*_\]]/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"),
      );
    }
  }
  if (current.length) paras.push(current.join(" "));
  const clean = paras
    .map((p) =>
      p
        .replace(/[^\x20-\x7E]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(
      (p) =>
        p.length > 40 &&
        !/^quick start|^prerequisites|^table of contents|^run it|^the native audio/i.test(
          p,
        ),
    );
  const tagline = (clean[0] || "New product").slice(0, 90);
  const short = (
    clean.join(" ") || "Description pending — edit products-data.js."
  ).slice(0, 400);

  if (!name) {
    try {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(repoPath, "package.json"), "utf8"),
      );
      if (pkg.name) name = titleCase(pkg.name);
    } catch {}
  }
  if (!name) name = titleCase(path.basename(repoPath));

  return { name, tagline, short };
}

function summarize(repoPath) {
  const name = path.basename(repoPath);
  const readme =
    readFirstLines(path.join(repoPath, "README.md"), 90) ||
    readFirstLines(path.join(repoPath, "package.json"), 30);
  return {
    repoPath,
    readmeHead: readme.replace(/[^\x00-\x7F]/g, ""),
    name,
    existing,
  };
}

function main() {
  const args = process.argv.slice(2);
  const enable =
    (args.includes("--enable") &&
      args[args.indexOf("--enable") + 1].split(",")) ||
    [];
  const disable =
    (args.includes("--disable") &&
      args[args.indexOf("--disable") + 1].split(",")) ||
    [];

  const products = loadProducts();
  const repos = discoverRepos();

  for (const repoPath of repos) {
    const name = path.basename(repoPath);
    let p = products.find(
      (x) =>
        path.basename(x.repoPath).toLowerCase() === name.toLowerCase() ||
        x.name.toLowerCase() === name.toLowerCase(),
    );
    if (!p) {
      // NEW repo → add it automatically as a disabled product, ready to review
      const info = extractInfo(repoPath);
      products.push({
        enabled: false,
        status: "internal",
        name: info.name,
        repoPath,
        tagline: info.tagline,
        category: "Other",
        short: info.short,
        description: info.short,
        stack: [],
        highlights: [],
        docsUrl: "",
      });
      console.log(
        `  + NEW project added (disabled): "${info.name}" — ${repoPath}`,
      );
      console.log(
        `    -> review it in products-data.js, then: npm run generate:scan -- --enable "${info.name}"`,
      );
      continue;
    }
    // refresh repoPath in case of moves; keep all human-edited fields intact
    p.repoPath = repoPath;
    if (enable.includes(p.name)) p.enabled = true;
    if (disable.includes(p.name)) p.enabled = false;
  }

  // prune products whose repo folder no longer exists
  for (let i = products.length - 1; i >= 0; i--) {
    if (!fs.existsSync(products[i].repoPath)) {
      console.log(
        `  - removed (repo folder gone): "${products[i].name}" — ${products[i].repoPath}`,
      );
      products.splice(i, 1);
    }
  }

  saveProducts(products);
  console.log(
    `\nScanned ${repos.length} repo(s). products-data.js refreshed (enabled flags kept).`,
  );
  products.forEach((p) =>
    console.log(`  ${p.enabled ? "✓" : "✗"} ${p.name} — ${p.repoPath}`),
  );
}

if (require.main === module) main();
