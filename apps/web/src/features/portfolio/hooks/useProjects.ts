import { useQuery } from "@tanstack/react-query";
import { portfolioService } from "../services/portfolio.service";
import { Project } from "@andev/shared";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["public-projects"],
    queryFn: portfolioService.getProjects
  });
}

export function useProjectDetail(slug?: string) {
  return useQuery<Project>({
    queryKey: ["project-detail", slug],
    queryFn: () => portfolioService.getProjectBySlug(slug!),
    enabled: Boolean(slug)
  });
}
