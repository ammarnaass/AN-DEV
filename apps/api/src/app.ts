import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { initDb } from "./db";
import { authRoutes } from "./routes/auth";
import { inquiryRoutes } from "./routes/inquiries";
import { publicRoutes } from "./routes/public";
import { adminRoutes } from "./routes/admin";
import path from "path";

export interface BuildAppOptions extends FastifyServerOptions {
  test?: boolean;
  dbPath?: string;
}

export async function buildApp(opts: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = fastify(opts);

  // Initialize Neon PostgreSQL database
  await initDb();

  // Register cookie parser
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || "andev-secret-session-key-32charsmin"
  });

  // Register CORS
  await app.register(fastifyCors, {
    origin: true,
    credentials: true
  });

  // Register Multipart for file uploads
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB
    }
  });

  // Health check
  app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // Register routes
  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(inquiryRoutes, { prefix: "/api" });
  await app.register(publicRoutes, { prefix: "/api" });
  await app.register(adminRoutes, { prefix: "/api/admin" });

  return app;
}
