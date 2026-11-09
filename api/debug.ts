export default async function handler(req: any, res: any) {
  const diagnostic: Record<string, any> = {
    time: new Date().toISOString(),
    node: process.version,
    database_url_present: !!process.env.DATABASE_URL,
  };

  try {
    const argon2 = await import("argon2");
    diagnostic.argon2 = "OK";
  } catch (e: any) {
    diagnostic.argon2 = "FAILED: " + (e?.message || String(e));
  }

  try {
    const sharp = await import("sharp");
    diagnostic.sharp = "OK";
  } catch (e: any) {
    diagnostic.sharp = "FAILED: " + (e?.message || String(e));
  }

  try {
    const { buildApp } = await import("../apps/api/src/app");
    const app = await buildApp();
    await app.ready();
    diagnostic.app = "OK";
  } catch (e: any) {
    diagnostic.app = "FAILED: " + (e?.message || String(e));
    diagnostic.app_stack = e?.stack;
  }

  res.statusCode = 200;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(diagnostic, null, 2));
}
