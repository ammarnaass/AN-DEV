import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bioLinksService } from "../services/bioLinks.service";
import { BioLinkInput, ReorderBioLinksInput } from "@andev/shared";

export function usePublicBioLinks() {
  const query = useQuery({
    queryKey: ["public-bio-links"],
    queryFn: bioLinksService.getPublicBioLinks,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });

  const trackClickMutation = useMutation({
    mutationFn: (id: number) => bioLinksService.trackClick(id),
  });

  return {
    data: query.data,
    links: query.data?.links || [],
    settings: query.data?.settings || {},
    isLoading: query.isLoading,
    isError: query.isError,
    trackClick: trackClickMutation.mutate,
  };
}

export function useAdminBioLinks() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-bio-links"],
    queryFn: bioLinksService.getAdminBioLinks,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-bio-links"] });
    queryClient.invalidateQueries({ queryKey: ["public-bio-links"] });
  };

  const createMutation = useMutation({
    mutationFn: (data: BioLinkInput) => bioLinksService.createBioLink(data),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BioLinkInput }) =>
      bioLinksService.updateBioLink(id, data),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => bioLinksService.deleteBioLink(id),
    onSuccess: invalidate,
  });

  const reorderMutation = useMutation({
    mutationFn: (items: ReorderBioLinksInput) => bioLinksService.reorderBioLinks(items),
    onSuccess: invalidate,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (payload: Record<string, string>) =>
      bioLinksService.updateBioSettings(payload),
    onSuccess: invalidate,
  });

  return {
    links: query.data?.links || [],
    settings: query.data?.settings || {},
    stats: query.data?.stats || { totalLinks: 0, activeLinks: 0, totalClicks: 0 },
    isLoading: query.isLoading,
    isError: query.isError,
    createBioLink: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateBioLink: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteBioLink: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    reorderBioLinks: reorderMutation.mutateAsync,
    isReordering: reorderMutation.isPending,
    updateBioSettings: updateSettingsMutation.mutateAsync,
    isUpdatingSettings: updateSettingsMutation.isPending,
  };
}

