/**
 * upload.js — uploads the generated site files (index.html, products/*.html,
 * products-data.js) to your hosting target.
 *
 * Configure the target below or via environment variables:
 *   UPLOAD_TARGET   = "sftp" | "s3" | "netlify" | "ftp"   (default: sftp)
 *   UPLOAD_HOST     = e.g. "yourserver.com"   (sftp/ftp)
 *   UPLOAD_USER     = ssh/ftp user
 *   UPLOAD_PATH     = remote path, e.g. "/var/www/html"
 *   AWS_S3_BUCKET   = s3 bucket name (target = s3)
 *
 *   npm run upload            → upload all changed files
 *   npm run upload -- --all   → upload everything
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const FILES = ["index.html", "products-data.js", "products"];

const TARGET = process.env.UPLOAD_TARGET || "sftp";
const HOST = process.env.UPLOAD_HOST || "your-server.com";
const USER = process.env.UPLOAD_USER || "root";
const REMOTE = process.env.UPLOAD_PATH || "/var/www/html";

function run(cmd) {
  console.log("> " + cmd);
  execSync(cmd, { stdio: "inherit" });
}

function main() {
  const all = process.argv.includes("--all");
  for (const f of FILES) {
    const p = path.join(__dirname, f);
    if (!fs.existsSync(p)) {
      console.log("skip missing", f);
      continue;
    }
    if (TARGET === "sftp") {
      run(`npx --yes scp2 -f . ${f} ${USER}@${HOST}:${REMOTE}`);
    } else if (TARGET === "netlify") {
      run(`npx --yes netlify-cli deploy --dir ${__dirname} --prod`);
      break;
    } else if (TARGET === "s3") {
      const bucket = process.env.AWS_S3_BUCKET || "your-bucket";
      run(
        `npx --yes awscli s3 sync ${__dirname} s3://${bucket} ${all ? "" : "--size-only"}`,
      );
      break;
    } else {
      console.log("Unknown UPLOAD_TARGET:", TARGET);
      process.exit(1);
    }
  }
  console.log("\nUpload complete.");
}

if (require.main === module) main();
