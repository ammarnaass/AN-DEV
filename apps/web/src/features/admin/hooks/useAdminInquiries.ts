import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

export function useAdminInquiries(statusFilter = "all") {
  const queryClient = useQueryClient();

  const inquiriesQuery = useQuery({
    queryKey: ["admin-inquiries", statusFilter],
    queryFn: () => adminService.getInquiries(statusFilter),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, admin_note }: { id: number; status: string; admin_note: string }) =>
      adminService.updateInquiry(id, status, admin_note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  return {
    inquiries: inquiriesQuery.data || [],
    isLoading: inquiriesQuery.isLoading,
    refetch: inquiriesQuery.refetch,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdating: updateStatusMutation.isPending,
  };
}

