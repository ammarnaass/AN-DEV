import { FastifyInstance } from "fastify";
import { processAndSaveImage } from "../../services/upload";

export async function adminUploadsRoutes(app: FastifyInstance) {
  app.post("/uploads", async (request, reply) => {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    const buffer = await data.toBuffer();
    const result = await processAndSaveImage(buffer, "projects");
    return reply.send(result);
  });
}

