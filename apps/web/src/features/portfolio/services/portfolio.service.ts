import { apiFetch } from "../../../lib/api";
import { Project } from "@andev/shared";

export const portfolioService = {
  getProjects: async (): Promise<Project[]> => {
    return apiFetch<Project[]>("/api/projects");
  },
  getProjectBySlug: async (slug: string): Promise<Project> => {
    return apiFetch<Project>(`/api/projects/${slug}`);
  }
};

