import { useQuery } from "@tanstack/react-query";
import { Post } from "@andev/shared";
import { blogService } from "../services/blog.service";

export function useBlogPosts() {
  return useQuery<Post[]>({
    queryKey: ["public-posts"],
    queryFn: blogService.getPosts,
  });
}

export function useBlogPostDetail(slug: string | undefined) {
  return useQuery<Post>({
    queryKey: ["post-detail", slug],
    queryFn: () => blogService.getPostBySlug(slug!),
    enabled: !!slug,
  });
}

