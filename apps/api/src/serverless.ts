import { buildApp } from "./app";
import type { FastifyInstance } from "fastify";

let appPromise: Promise<FastifyInstance> | null = null;

async function getApp(): Promise<FastifyInstance> {
  if (!appPromise) {
    appPromise = (async () => {
      const app = await buildApp();
      await app.ready();
      return app;
    })();
  }
  return appPromise;
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: any, res: any) {
  const app = await getApp();

  // If Vercel pre-parsed the body or consumed the stream, use Fastify inject
  if (req.body !== undefined || req.readableEnded) {
    const payload = typeof req.body === "object" ? JSON.stringify(req.body) : req.body;
    const response = await app.inject({
      method: req.method,
      url: req.url,
      headers: req.headers,
      payload,
    });

    res.statusCode = response.statusCode;
    for (const [key, value] of Object.entries(response.headers)) {
      if (value !== undefined) {
        res.setHeader(key, value as any);
      }
    }
    return res.end(response.rawPayload);
  }

  // Otherwise delegate natively to Fastify HTTP server
  return new Promise<void>((resolve, reject) => {
    res.on("finish", resolve);
    res.on("error", reject);
    app.server.emit("request", req, res);
  });
}
