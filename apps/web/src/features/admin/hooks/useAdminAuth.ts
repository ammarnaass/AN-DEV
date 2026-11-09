import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

export function useAdminAuth() {
  const queryClient = useQueryClient();

  const authQuery = useQuery({
    queryKey: ["admin-me"],
    queryFn: adminService.getMe,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: adminService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-me"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: adminService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["admin-me"], null);
    },
  });

  return {
    admin: authQuery.data?.admin,
    isLoading: authQuery.isLoading,
    isError: authQuery.isError,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
}

