import { buildApp } from "./app";

async function start() {
  const app = await buildApp({
    logger: {
      level: process.env.LOG_LEVEL || "info"
    }
  });

  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || "0.0.0.0";

  try {
    await app.listen({ port, host });
    console.log(`AN DEV API Server running at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
