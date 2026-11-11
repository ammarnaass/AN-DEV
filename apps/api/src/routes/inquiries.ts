import { FastifyInstance } from "fastify";
import { inquirySubmitRoutes } from "./inquiries/inquirySubmit.routes";
import { inquiryTrackRoutes } from "./inquiries/inquiryTrack.routes";

export async function inquiryRoutes(app: FastifyInstance) {
  await app.register(inquirySubmitRoutes);
  await app.register(inquiryTrackRoutes);
}

export default inquiryRoutes;
