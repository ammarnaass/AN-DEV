import { apiFetch } from "../../../lib/api";
import { Post } from "@andev/shared";

export const blogService = {
  getPosts: async (): Promise<Post[]> => {
    return apiFetch<Post[]>("/api/posts");
  },

  getPostBySlug: async (slug: string): Promise<Post> => {
    return apiFetch<Post>(`/api/posts/${slug}`);
  },
};

