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

const currentCwd = process.cwd();
const webDir = path.resolve(rootDir, "apps/web");
const rootDist = path.resolve(rootDir, "dist");
const webDist = path.resolve(webDir, "dist");
const cwdDist = path.resolve(currentCwd, "dist");

console.log("[build.cjs] Execution CWD:", currentCwd);
console.log("[build.cjs] Monorepo Root:", rootDir);
console.log("[build.cjs] Web Directory:", webDir);

// 2. Build the web app
console.log("[build.cjs] Running web build (tsc && vite build)...");
execSync("npm run build --workspace=@andev/web", {
  cwd: rootDir,
  stdio: "inherit",
  env: { ...process.env, CI: "false" }
});

// 3. Locate the generated dist directory
let sourceDist = null;
if (fs.existsSync(webDist) && fs.existsSync(path.join(webDist, "index.html"))) {
  sourceDist = webDist;
} else if (fs.existsSync(rootDist) && fs.existsSync(path.join(rootDist, "index.html"))) {
  sourceDist = rootDist;
} else if (fs.existsSync(cwdDist) && fs.existsSync(path.join(cwdDist, "index.html"))) {
  sourceDist = cwdDist;
}

if (!sourceDist) {
  console.error("[build.cjs] FATAL: Could not locate built index.html in any expected dist folder!");
  console.error("  webDist:", webDist, fs.existsSync(webDist));
  console.error("  rootDist:", rootDist, fs.existsSync(rootDist));
  console.error("  cwdDist:", cwdDist, fs.existsSync(cwdDist));
  process.exit(1);
}

console.log("[build.cjs] Found build artifacts in:", sourceDist);

// 4. Mirror build artifacts to all possible target dist directories
const targetDirs = new Set([rootDist, webDist, cwdDist]);

for (const target of targetDirs) {
  if (target !== sourceDist) {
    console.log("[build.cjs] Mirroring artifacts to:", target);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
    }
    fs.cpSync(sourceDist, target, { recursive: true });
  }
}

// 5. Final validation
console.log("[build.cjs] Final Verification:");
for (const target of targetDirs) {
  const hasIndex = fs.existsSync(path.join(target, "index.html"));
  const count = fs.existsSync(target) ? fs.readdirSync(target).length : 0;
  console.log(` - ${target} => exists: true, index.html: ${hasIndex}, fileCount: ${count}`);
}

console.log("[build.cjs] Build completed successfully with all paths synchronized!");
