import { apiFetch } from "../../../lib/api";
import { BioLink, BioLinkInput, ReorderBioLinksInput } from "@andev/shared";

export interface AdminBioLinksResponse {
  links: BioLink[];
  settings: Record<string, string>;
  stats: {
    totalLinks: number;
    activeLinks: number;
    totalClicks: number;
  };
}

export interface PublicBioLinksResponse {
  settings: Record<string, string>;
  links: BioLink[];
}

export const bioLinksService = {
  // Public
  getPublicBioLinks: () =>
    apiFetch<PublicBioLinksResponse>("/api/bio-links/public"),

  trackClick: (id: number) =>
    apiFetch<{ success: boolean }>(`/api/bio-links/${id}/click`, {
      method: "POST",
    }),

  // Admin
  getAdminBioLinks: () =>
    apiFetch<AdminBioLinksResponse>("/api/admin/bio-links"),

  createBioLink: (data: BioLinkInput) =>
    apiFetch<BioLink>("/api/admin/bio-links", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateBioLink: (id: number, data: BioLinkInput) =>
    apiFetch<BioLink>(`/api/admin/bio-links/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteBioLink: (id: number) =>
    apiFetch<{ success: boolean }>(`/api/admin/bio-links/${id}`, {
      method: "DELETE",
    }),

  reorderBioLinks: (items: ReorderBioLinksInput) =>
    apiFetch<{ success: boolean }>("/api/admin/bio-links/reorder", {
      method: "PUT",
      body: JSON.stringify(items),
    }),

  updateBioSettings: (payload: Record<string, string>) =>
    apiFetch<{ success: boolean }>("/api/admin/bio-links/settings", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
