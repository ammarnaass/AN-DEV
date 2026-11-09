import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "@andev/shared";
import { adminService } from "../services/admin.service";

export function useAdminProjects() {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery({
    queryKey: ["admin-projects"],
    queryFn: adminService.getProjects,
  });

  const saveMutation = useMutation({
    mutationFn: (project: Partial<Project>) => adminService.saveProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const togglePublish = async (p: Project) => {
    return saveMutation.mutateAsync({
      ...p,
      published: !p.published,
    });
  };

  return {
    projects: projectsQuery.data || [],
    isLoading: projectsQuery.isLoading,
    refetch: projectsQuery.refetch,
    saveProject: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    deleteProject: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    togglePublish,
  };
}

