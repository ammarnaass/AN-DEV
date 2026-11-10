import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export function usePublicSettings() {
  const query = useQuery({
    queryKey: ["public-settings"],
    queryFn: async () => {
      try {
        return await apiFetch<Record<string, string>>("/api/settings/public");
      } catch {
        return {} as Record<string, string>;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });

  return {
    settings: query.data || {},
    isLoading: query.isLoading,
  };
}

