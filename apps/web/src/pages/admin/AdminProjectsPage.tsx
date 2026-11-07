import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Project } from "@andev/shared";
import { Button } from "../../components/ui/Button";
import { AdminProjectEditModal } from "./AdminProjectEditModal";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export const AdminProjectsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

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
    if (confirm(`هل أنت متأكد من حذف مشروع "${title}" نهائياً؟`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">إدارة معرض الأعمال</h1>
          <p className="text-mute text-xs font-mono">إضافة وتعديل وحذف مشاريع الشركة</p>
        </div>
        <Button size="sm" variant="primary" onClick={handleCreate}>
          <span className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>مشروع جديد</span>
          </span>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 rounded-lg bg-surface/50 border border-line" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="rounded-card border border-line bg-surface/40 overflow-hidden shadow-sm">
          <table className="w-full text-start text-sm">
            <thead className="bg-surface/80 border-b border-line text-xs font-mono text-mute">
              <tr>
                <th className="p-4 text-start">المشروع</th>
                <th className="p-4 text-start">التقنيات</th>
                <th className="p-4 text-center">الحالة</th>
                <th className="p-4 text-center">مميز</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {projects.map(p => {
                const techList: string[] = typeof p.tech_json === "string"
                  ? JSON.parse(p.tech_json || "[]")
                  : p.tech_json || [];

                return (
                  <tr key={p.id} className="hover:bg-surface/60 transition-colors h-16">
                    <td className="p-4">
                      <div className="font-bold text-ink line-clamp-1">{p.title_ar}</div>
                      <div className="text-xs text-mute font-mono">{p.slug}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {techList.slice(0, 3).map(t => (
                          <span key={t} dir="ltr" className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-bg border border-line text-mute">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => togglePublishMutation.mutate(p)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold ${
                          p.published
                            ? "bg-ok/10 text-ok border border-ok/30"
                            : "bg-mute/20 text-mute border border-mute/30"
                        }`}
                      >
                        {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{p.published ? "منشور" : "مخفي"}</span>
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-xs font-mono text-mute">
                        {p.featured ? "★ مميز" : "-"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-1.5 rounded hover:bg-surface text-mute hover:text-accent"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title_ar)}
                          className="p-1.5 rounded hover:bg-err/10 text-mute hover:text-err"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-16 text-center text-mute border border-line rounded-card bg-surface/30">
          لا توجد مشاريع مضافة حتى الآن
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <AdminProjectEditModal
          project={editingProject}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["public-projects"] });
          }}
        />
      )}
    </div>
  );
};
