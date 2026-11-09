import React, { useState } from "react";
import { Project } from "@andev/shared";
import { FolderKanban, Plus } from "lucide-react";
import { useAdminProjects } from "../hooks/useAdminProjects";
import { ProjectListTable } from "../components/ProjectListTable";
import { ProjectEditModal } from "../components/ProjectEditModal";

export const AdminProjectsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const {
    projects,
    isLoading,
    refetch,
    deleteProject,
    togglePublish,
  } = useAdminProjects();

  const handleEdit = (p: Project) => {
    setEditingProject(p);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`هل أنت متأكد من حذف مشروع "${title}" نهائياً من قاعدة البيانات؟`)) {
      await deleteProject(id);
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
      <ProjectListTable
        projects={filtered}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublish={togglePublish}
      />

      {/* Edit / Create Modal */}
      {modalOpen && (
        <ProjectEditModal
          project={editingProject}
          onSaved={() => {
            setModalOpen(false);
            setEditingProject(null);
            refetch();
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
