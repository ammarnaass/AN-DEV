import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

export function useAdminInquiries(
  statusFilter = "all",
  typeFilter = "all",
  searchQuery = ""
) {
  const queryClient = useQueryClient();

  const inquiriesQuery = useQuery({
    queryKey: ["admin-inquiries", statusFilter, typeFilter, searchQuery],
    queryFn: () =>
      adminService.getInquiries({
        status: statusFilter,
        type: typeFilter,
        search: searchQuery
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, admin_note }: { id: number; status: string; admin_note: string }) =>
      adminService.updateInquiry(id, status, admin_note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const approveProjectMutation = useMutation({
    mutationFn: ({
      id,
      quote_amount,
      estimated_timeline,
      admin_note
    }: {
      id: number;
      quote_amount: string;
      estimated_timeline: string;
      admin_note?: string;
    }) => adminService.approveProject(id, { quote_amount, estimated_timeline, admin_note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const scheduleConsultationMutation = useMutation({
    mutationFn: ({
      id,
      confirmed_datetime,
      meeting_mode,
      meeting_link,
      admin_note
    }: {
      id: number;
      confirmed_datetime: string;
      meeting_mode: string;
      meeting_link?: string;
      admin_note?: string;
    }) =>
      adminService.scheduleConsultation(id, {
        confirmed_datetime,
        meeting_mode,
        meeting_link,
        admin_note
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const rejectInquiryMutation = useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      adminService.rejectInquiry(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (id: number) => adminService.deleteInquiry(id),
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
    approveProject: approveProjectMutation.mutateAsync,
    isApproving: approveProjectMutation.isPending,
    scheduleConsultation: scheduleConsultationMutation.mutateAsync,
    isScheduling: scheduleConsultationMutation.isPending,
    rejectInquiry: rejectInquiryMutation.mutateAsync,
    isRejecting: rejectInquiryMutation.isPending,
    deleteInquiry: deleteInquiryMutation.mutateAsync,
    isDeleting: deleteInquiryMutation.isPending,
  };
}
