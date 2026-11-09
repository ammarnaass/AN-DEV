import React from "react";
import { Project } from "@andev/shared";
import { Layers, Star, Edit, Trash2 } from "lucide-react";

interface ProjectListTableProps {
  projects: Project[];
  isLoading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: number, title: string) => void;
  onTogglePublish: (project: Project) => void;
}

export const ProjectListTable: React.FC<ProjectListTableProps> = ({
  projects,
  isLoading,
  onEdit,
  onDelete,
  onTogglePublish,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 rounded-xl bg-surface border border-line" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-text-muted text-sm border border-line rounded-xl bg-surface/30">
        لا توجد مشاريع تطابق الفلتر المحدد.
      </div>
    );
  }

  return (
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
            {projects.map(p => {
              const techList: string[] =
                typeof p.tech_json === "string"
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
                      onClick={() => onTogglePublish(p)}
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
                        onClick={() => onEdit(p)}
                        className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary transition-colors"
                        title="تعديل المشروع"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(p.id, p.title_ar)}
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
  );
};

