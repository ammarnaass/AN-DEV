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

  getInquiries: (statusFilter?: string) => {
    const param = statusFilter && statusFilter !== "all" ? `?status=${statusFilter}` : "";
    return apiFetch<Inquiry[]>(`/api/admin/inquiries${param}`);
  },

  updateInquiry: (id: number, status: string, admin_note: string) =>
    apiFetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status, admin_note }),
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

