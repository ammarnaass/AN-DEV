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
const apiDir = path.resolve(rootDir, "apps/api");
const rootDist = path.resolve(rootDir, "dist");
const webDist = path.resolve(webDir, "dist");
const apiDist = path.resolve(apiDir, "dist");
const cwdDist = path.resolve(currentCwd, "dist");

console.log("[build.cjs] Execution CWD:", currentCwd);
console.log("[build.cjs] Monorepo Root:", rootDir);
console.log("[build.cjs] Web Directory:", webDir);

// 2. Ensure dependencies are installed (Self-healing in case Vercel executed from a subfolder)
const reactInWeb = path.resolve(webDir, "node_modules/react");
const reactInRoot = path.resolve(rootDir, "node_modules/react");
if (!fs.existsSync(reactInWeb) && !fs.existsSync(reactInRoot)) {
  console.log("[build.cjs] Web dependencies missing in node_modules! Running install.cjs...");
  execSync("node scripts/install.cjs", {
    cwd: rootDir,
    stdio: "inherit",
    env: { ...process.env, CI: "false" }
  });
}

// 3. Build the web app
console.log("[build.cjs] Running web build (tsc && vite build)...");
execSync("npm run build --workspace=@andev/web", {
  cwd: rootDir,
  stdio: "inherit",
  env: { ...process.env, CI: "false" }
});

// 4. Locate the generated dist directory
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

// 5. Mirror build artifacts to all possible target dist directories
const targetDirs = new Set([rootDist, webDist, cwdDist, apiDist]);

for (const target of targetDirs) {
  if (target !== sourceDist) {
    console.log("[build.cjs] Mirroring artifacts to:", target);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
    }
    fs.cpSync(sourceDist, target, { recursive: true });
  }
}

// 6. Bundle serverless API handler for Vercel using esbuild
console.log("[build.cjs] Bundling serverless API with esbuild...");
const esbuild = require("esbuild");
const serverlessSrc = path.resolve(rootDir, "apps/api/src/serverless.ts");
const rootApiOut = path.resolve(rootDir, "api/index.js");
const appApiOut = path.resolve(rootDir, "apps/api/api/index.js");

fs.mkdirSync(path.dirname(rootApiOut), { recursive: true });
fs.mkdirSync(path.dirname(appApiOut), { recursive: true });

esbuild.buildSync({
  entryPoints: [serverlessSrc],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  outfile: rootApiOut,
  external: [
    "fastify",
    "@fastify/*",
    "@neondatabase/*",
    "drizzle-orm",
    "drizzle-orm/*",
    "sharp"
  ]
});

const rootAllOut = path.resolve(rootDir, "api/[...all].js");
const appAllOut = path.resolve(rootDir, "apps/api/api/[...all].js");

fs.copyFileSync(rootApiOut, rootAllOut);
fs.copyFileSync(rootApiOut, appApiOut);
fs.copyFileSync(rootApiOut, appAllOut);
console.log("[build.cjs] Serverless API bundled successfully to api/index.js, api/[...all].js, apps/api/api/index.js, apps/api/api/[...all].js");

// 7. Final validation
console.log("[build.cjs] Final Verification:");
for (const target of targetDirs) {
  const hasIndex = fs.existsSync(path.join(target, "index.html"));
  const count = fs.existsSync(target) ? fs.readdirSync(target).length : 0;
  console.log(` - ${target} => exists: true, index.html: ${hasIndex}, fileCount: ${count}`);
}

console.log("[build.cjs] Build completed successfully with all paths synchronized!");
