/**
 * scan.js — re-scans each project folder under C:\Naveen (excluding runavappssites)
 * and refreshes products-data.js descriptions from README/docs, while preserving
 * your `enabled` flags and any custom edits to tagline/short/description/highlights.
 *
 *   npm run generate:scan
 *
 * Enable/disable a product by setting `"enabled": true/false` in products-data.js
 * or by passing: npm run generate:scan -- --disable "BharatBolo" --enable "Vybrasonic"
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

function summarize(repoPath, existing) {
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
    const { readmeHead } = summarize(repoPath, p);
    if (!p) {
      console.log(
        "  + new repo found (add manually or edit products-data.js):",
        repoPath,
      );
      if (readmeHead)
        console.log(
          "    first README line:",
          readmeHead.split("\n").find((l) => l.startsWith("#")) || "",
        );
      continue;
    }
    // refresh repoPath in case of moves; keep all human-edited fields intact
    p.repoPath = repoPath;
    if (enable.includes(p.name)) p.enabled = true;
    if (disable.includes(p.name)) p.enabled = false;
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
