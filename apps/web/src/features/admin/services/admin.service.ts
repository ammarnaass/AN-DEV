import { apiFetch } from "../../../lib/api";
import { AdminStats, Inquiry, Project } from "@andev/shared";

export const adminService = {
  login: (credentials: { email: string; password: string }) =>
    apiFetch<{ success: boolean }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getMe: () =>
    apiFetch<{ admin: { email: string } }>("/api/auth/me"),

  logout: () =>
    apiFetch<{ success: boolean }>("/api/auth/logout", {
      method: "POST",
    }),

  getStats: () =>
    apiFetch<AdminStats>("/api/admin/stats"),

  getInquiries: (filters?: { status?: string; type?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== "all") params.append("status", filters.status);
    if (filters?.type && filters.type !== "all") params.append("type", filters.type);
    if (filters?.search && filters.search.trim()) params.append("search", filters.search.trim());
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<Inquiry[]>(`/api/admin/inquiries${query}`);
  },

  updateInquiry: (id: number, status: string, admin_note: string) =>
    apiFetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status, admin_note }),
    }),

  approveProject: (id: number, payload: { quote_amount: string; estimated_timeline: string; admin_note?: string }) =>
    apiFetch<{ success: boolean; message: string }>(`/api/admin/inquiries/${id}/approve`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  scheduleConsultation: (id: number, payload: { confirmed_datetime: string; meeting_mode: string; meeting_link?: string; admin_note?: string }) =>
    apiFetch<{ success: boolean; message: string }>(`/api/admin/inquiries/${id}/schedule`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  rejectInquiry: (id: number, reason: string) =>
    apiFetch<{ success: boolean; message: string }>(`/api/admin/inquiries/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),

  deleteInquiry: (id: number) =>
    apiFetch<{ success: boolean; message: string }>(`/api/admin/inquiries/${id}`, {
      method: "DELETE",
    }),

  getProjects: () =>
    apiFetch<Project[]>("/api/admin/projects"),

  saveProject: (project: Partial<Project>) => {
    if (project.id) {
      return apiFetch<Project>(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(project),
      });
    }
    return apiFetch<Project>("/api/admin/projects", {
      method: "POST",
      body: JSON.stringify(project),
    });
  },

  deleteProject: (id: number) =>
    apiFetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    }),

  getSettings: () =>
    apiFetch<Record<string, string>>("/api/admin/settings"),

  updateSettings: (payload: Record<string, string>) =>
    apiFetch("/api/admin/settings", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};

