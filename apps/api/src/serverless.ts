import { buildApp } from "./app";
import type { FastifyInstance } from "fastify";
import { Readable } from "stream";

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
  try {
    const app = await getApp();

    return new Promise<void>((resolve, reject) => {
      res.on("finish", resolve);
      res.on("error", reject);

      // Extract original URL if rewritten by Vercel
      let originalUrl = (req.headers["x-matched-path"] as string) || req.url || "/";
      if (req.headers["x-matched-path"] && req.url && req.url.includes("?")) {
        const query = req.url.slice(req.url.indexOf("?"));
        if (!originalUrl.includes("?")) {
          originalUrl += query;
        }
      }
      if (!originalUrl.startsWith("/api") && !originalUrl.startsWith("/health")) {
        originalUrl = "/api" + (originalUrl.startsWith("/") ? originalUrl : "/" + originalUrl);
      }
      req.url = originalUrl;

      // If Vercel pre-parsed the body or consumed the stream, construct a new readable stream
      if (req.body !== undefined && req.body !== null) {
        const bodyStr = typeof req.body === "object" ? JSON.stringify(req.body) : String(req.body);
        const bodyBuf = Buffer.from(bodyStr);
        const stream = Readable.from(bodyBuf) as any;

        stream.headers = {
          ...req.headers,
          "content-length": String(bodyBuf.length),
        };
        stream.rawHeaders = req.rawHeaders;
        stream.method = req.method;
        stream.url = originalUrl;
        stream.httpVersion = req.httpVersion || "1.1";
        stream.socket = req.socket;
        stream.connection = req.connection;

        app.server.emit("request", stream, res);
      } else {
        app.server.emit("request", req, res);
      }
    });
  } catch (err: any) {
    console.error("Vercel Serverless Handler Error:", err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify(
        {
          error: "Internal Server Error",
          message: err?.message || String(err),
          stack: err?.stack,
        },
        null,
        2
      )
    );
  }
}
