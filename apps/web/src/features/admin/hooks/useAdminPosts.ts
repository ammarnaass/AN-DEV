import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";
import { Post } from "@andev/shared";

export function useAdminPosts(
  statusFilter = "all",
  categoryFilter = "all",
  searchQuery = ""
) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["admin-posts", statusFilter, categoryFilter, searchQuery],
    queryFn: () =>
      adminService.getPosts({
        status: statusFilter,
        category: categoryFilter,
        search: searchQuery
      }),
  });

  const savePostMutation = useMutation({
    mutationFn: (post: Partial<Post>) => adminService.savePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => adminService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: (id: number) => adminService.togglePublishPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: (id: number) => adminService.toggleFeaturedPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  return {
    posts: postsQuery.data || [],
    isLoading: postsQuery.isLoading,
    refetch: postsQuery.refetch,
    savePost: savePostMutation.mutateAsync,
    isSaving: savePostMutation.isPending,
    deletePost: deletePostMutation.mutateAsync,
    isDeleting: deletePostMutation.isPending,
    togglePublish: togglePublishMutation.mutateAsync,
    toggleFeatured: toggleFeaturedMutation.mutateAsync,
  };
}

