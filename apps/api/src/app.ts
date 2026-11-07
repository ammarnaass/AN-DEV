import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { initDb } from "./db";
import { authRoutes } from "./routes/auth";
import { inquiryRoutes } from "./routes/inquiries";
import path from "path";

export interface BuildAppOptions extends FastifyServerOptions {
  test?: boolean;
  dbPath?: string;
}

export async function buildApp(opts: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = fastify(opts);

  // Initialize SQLite database
  const dbPath = opts.test
    ? path.resolve(process.cwd(), `data/test_${Date.now()}_${Math.random().toString(36).substring(7)}.db`)
    : opts.dbPath;
  initDb(dbPath);

  // Register cookie parser
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || "andev-secret-session-key-32charsmin"
  });

  // Register CORS
  await app.register(fastifyCors, {
    origin: true,
    credentials: true
  });

  // Health check
  app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // Register routes
  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(inquiryRoutes, { prefix: "/api" });

  return app;
}
