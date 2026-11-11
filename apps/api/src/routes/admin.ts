import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth";
import { adminStatsRoutes } from "./admin/adminStats.routes";
import { adminProjectsRoutes } from "./admin/adminProjects.routes";
import { adminPostsRoutes } from "./admin/adminPosts.routes";
import { adminSettingsRoutes } from "./admin/adminSettings.routes";
import { adminUploadsRoutes } from "./admin/adminUploads.routes";
import { adminInquiriesRoutes } from "./admin/adminInquiries.routes";
import { adminInquiriesActionsRoutes } from "./admin/adminInquiriesActions.routes";

export async function adminRoutes(app: FastifyInstance) {
  // Enforce session check on all admin routes
  app.addHook("preHandler", requireAdmin);

  await app.register(adminStatsRoutes);
  await app.register(adminProjectsRoutes);
  await app.register(adminPostsRoutes);
  await app.register(adminSettingsRoutes);
  await app.register(adminUploadsRoutes);
  await app.register(adminInquiriesRoutes);
  await app.register(adminInquiriesActionsRoutes);
}

export default adminRoutes;
