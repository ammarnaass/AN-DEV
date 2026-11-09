const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 1. Identify monorepo root safely regardless of execution CWD
let rootDir = __dirname;
while (rootDir !== path.dirname(rootDir)) {
  const pkgPath = path.join(rootDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.name === "andev-monorepo") break;
    } catch {}
  }
  rootDir = path.dirname(rootDir);
}

console.log("[install.cjs] Execution CWD:", process.cwd());
console.log("[install.cjs] Monorepo Root:", rootDir);
console.log("[install.cjs] Running scoped workspace install...");

execSync(
  "npm install --workspace=@andev/web --workspace=@andev/shared --workspace=@andev/api --include-workspace-root",
  {
    cwd: rootDir,
    stdio: "inherit",
    env: { ...process.env, CI: "false" }
  }
);

console.log("[install.cjs] Dependencies installation complete!");

