import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Project } from "@andev/shared";
import { AdminProjectEditModal } from "./AdminProjectEditModal";
import {
  Plus,
  Edit,
  Trash2,
  FolderKanban,
  Star,
  Layers
} from "lucide-react";

export const AdminProjectsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["admin-projects"],
    queryFn: () => apiFetch<Project[]>("/api/admin/projects")
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: async (p: Project) => {
      return apiFetch(`/api/admin/projects/${p.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...p,
          published: !p.published
        })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
    }
  });

  const handleEdit = (p: Project) => {
    setEditingProject(p);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleDelete = (id: number, title: string) => {
    if (confirm(`هل أنت متأكد من حذف مشروع "${title}" نهائياً من قاعدة البيانات؟`)) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = projects.filter(p => {
    if (categoryFilter === "all") return true;
    const text = (p.tech_json + " " + p.title_ar + " " + p.title_en).toLowerCase();
    if (categoryFilter === "web") return text.includes("web") || text.includes("react");
    if (categoryFilter === "mobile") return text.includes("mobile") || text.includes("flutter");
    return true;
  });

  return (
    <div className="space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>PORTFOLIO_ENGINE // CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            إدارة المشاريع ومعرض الأعمال
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            نظام متكامل لإضافة، تحرير ونشر دراسات الحالة التقنية في الموقع العام.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
            categoryFilter === "all"
              ? "bg-primary-container text-white shadow-sm"
              : "bg-surface border border-line text-text-muted hover:text-text-primary"
          }`}
        >
          الكل ({projects.length})
        </button>
        <button
          onClick={() => setCategoryFilter("web")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
            categoryFilter === "web"
              ? "bg-primary-container text-white shadow-sm"
              : "bg-surface border border-line text-text-muted hover:text-text-primary"
          }`}
        >
          تطبيقات الويب
        </button>
        <button
          onClick={() => setCategoryFilter("mobile")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
            categoryFilter === "mobile"
              ? "bg-primary-container text-white shadow-sm"
              : "bg-surface border border-line text-text-muted hover:text-text-primary"
          }`}
        >
          تطبيقات الموبايل
        </button>
      </div>

      {/* Projects Table */}
      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 rounded-xl bg-surface border border-line" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-surface-container border-b border-line text-xs font-mono text-text-muted">
                <tr>
                  <th className="p-4 text-start">المشروع</th>
                  <th className="p-4 text-start">التقنيات المنفذة</th>
                  <th className="p-4 text-center">حالة النشر</th>
                  <th className="p-4 text-center">المعرض</th>
                  <th className="p-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map(p => {
                  const techList: string[] = typeof p.tech_json === "string"
                    ? JSON.parse(p.tech_json || "[]")
                    : p.tech_json || [];

                  return (
                    <tr key={p.id} className="hover:bg-surface-elevated/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-surface-container border border-line overflow-hidden shrink-0 flex items-center justify-center">
                            {p.cover_image ? (
                              <img src={p.cover_image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Layers className="w-5 h-5 text-secondary" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-text-primary text-sm">{p.title_ar}</div>
                            <div className="text-xs font-mono text-text-muted">{p.slug}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {techList.slice(0, 3).map(tech => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container border border-line text-text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                          {techList.length > 3 && (
                            <span className="text-[10px] font-mono text-text-muted self-center">
                              +{techList.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => togglePublishMutation.mutate(p)}
                          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border transition-all ${
                            p.published
                              ? "bg-status-ok/15 text-status-ok border-status-ok/30"
                              : "bg-surface-container text-text-muted border-line"
                          }`}
                        >
                          {p.published ? "منشور" : "مسودة"}
                        </button>
                      </td>

                      <td className="p-4 text-center">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-secondary/15 text-secondary border border-secondary/30">
                            <Star className="w-3 h-3 fill-current" />
                            <span>مميز</span>
                          </span>
                        ) : (
                          <span className="text-xs text-text-muted font-mono">-</span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary transition-colors"
                            title="تعديل المشروع"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.title_ar)}
                            className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-status-err transition-colors"
                            title="حذف المشروع"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-text-muted text-sm border border-line rounded-xl bg-surface/30">
          لا توجد مشاريع مضافة حالياً.
        </div>
      )}

      {/* Edit / Create Modal */}
      {modalOpen && (
        <AdminProjectEditModal
          project={editingProject}
          onSaved={() => {
            setModalOpen(false);
            setEditingProject(null);
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["public-projects"] });
          }}
          onClose={() => {
            setModalOpen(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
};
