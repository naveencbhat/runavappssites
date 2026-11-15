# Runav Apps — Company Site

A modern static website (single-page + child product pages) built from the projects under `C:\Naveen`.

## Files

| File | What |
|---|---|
| `index.html` | The main page: hero, Products menu/grid (with category filters), Vision, Mission, Team, footer |
| `products-data.js` | **The data array.** One entry per product. Set `"enabled": false` to hide a product everywhere on the site (menu, grid and child page) |
| `products/*.html` | Child pages with detailed info per product (generated) |
| `generate.js` | Regenerates `products/*.html` from `products-data.js` |
| `scan.js` | Re-scans every project folder under `C:\Naveen` (excluding this one), matches repos to data entries, keeps your `enabled` flags |
| `upload.js` | Uploads the site (edit the config at the top: sftp / s3 / netlify) |

## NPM scripts

```bash
npm run generate          # regenerate the product child pages from products-data.js
npm run generate:scan     # re-scan C:\Naveen READMEs, then regenerate everything
npm run upload            # upload the generated files to your host
npm run serve             # preview locally at http://localhost:3000
```

## Turning a product on/off

Open `products-data.js` and set the flag:

```js
{ "enabled": false, "name": "BharatBolo", ... }   // hidden everywhere
{ "enabled": true,  "name": "Bharatham",  ... }   // shown in menu + grid
```

Then run `npm run generate` (removes/keeps child pages automatically) — or use the CLI:

```bash
node scan.js --disable "BharatBolo" --enable "Vybrasonic"
```

## Adding a brand-new project

Add a new object to the `PRODUCTS` array in `products-data.js` (copy an existing one), set `enabled: true`, then `npm run generate`. `npm run generate:scan` also detects repos it doesn't know yet and prints their README title as a starting point.
