import { FastifyRequest, FastifyReply } from "fastify";
import { validateSession } from "../services/auth";

declare module "fastify" {
  interface FastifyRequest {
    admin?: {
      id: number;
      email: string;
    };
  }
}

export async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.andev_session;

  if (!sessionId) {
    return reply.status(401).send({ error: "Unauthorized: Missing session cookie" });
  }

  const session = await validateSession(sessionId);
  if (!session) {
    return reply.status(401).send({ error: "Unauthorized: Invalid or expired session" });
  }

  request.admin = {
    id: session.adminId,
    email: session.email
  };
}

