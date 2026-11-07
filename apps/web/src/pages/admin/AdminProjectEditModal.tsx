import React, { useState } from "react";
import { Project, ProjectInput } from "@andev/shared";
import { Button } from "../../components/ui/Button";
import { apiFetch } from "../../lib/api";
import { X, Upload, Check } from "lucide-react";

interface AdminProjectEditModalProps {
  project?: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

export const AdminProjectEditModal: React.FC<AdminProjectEditModalProps> = ({
  project,
  onClose,
  onSaved
}) => {
  const [activeTab, setActiveTab] = useState<"ar" | "en">("ar");
  const [techInput, setTechInput] = useState<string>(
    project?.tech_json ? (typeof project.tech_json === "string" ? JSON.parse(project.tech_json).join(", ") : project.tech_json.join(", ")) : "React, Fastify, TypeScript"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProjectInput>({
    slug: project?.slug || "",
    title_ar: project?.title_ar || "",
    title_en: project?.title_en || "",
    summary_ar: project?.summary_ar || "",
    summary_en: project?.summary_en || "",
    body_ar: project?.body_ar || "",
    body_en: project?.body_en || "",
    tech_json: project?.tech_json ? (typeof project.tech_json === "string" ? JSON.parse(project.tech_json) : project.tech_json) : [],
    cover_image: project?.cover_image || "/uploads/projects/default.webp",
    live_url: project?.live_url || "",
    repo_url: project?.repo_url || "",
    featured: project?.featured ?? false,
    published: project?.published ?? true,
    sort_order: project?.sort_order ?? 0
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      const data = await res.json();
      if (data.path) {
        setForm(prev => ({ ...prev, cover_image: data.path }));
      }
    } catch {
      setError("فشل رفع الصورة");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const techArray = techInput.split(",").map(s => s.trim()).filter(Boolean);
    const payload = {
      ...form,
      tech_json: techArray
    };

    try {
      if (project?.id) {
        await apiFetch(`/api/admin/projects/${project.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
      } else {
        await apiFetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }
      onSaved();
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء حفظ المشروع");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-card border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-start">
        <button
          onClick={onClose}
          className="absolute top-5 end-5 text-mute hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-ink">
            {project ? "تعديل بيانات المشروع" : "إضافة مشروع جديد إلى المعرض"}
          </h2>
          <p className="text-xs text-mute font-mono">يدعم المحتوى الثنائي (العربية والإنجليزية)</p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-err/10 border border-err/30 text-err rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          {/* Language Tabs */}
          <div className="flex border-b border-line gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("ar")}
              className={`pb-2 transition-colors ${
                activeTab === "ar" ? "text-primary border-b-2 border-primary font-bold" : "text-mute"
              }`}
            >
              البيانات بالعربية (RTL)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("en")}
              className={`pb-2 transition-colors ${
                activeTab === "en" ? "text-primary border-b-2 border-primary font-bold" : "text-mute"
              }`}
            >
              English Content (LTR)
            </button>
          </div>

          {/* Tab 1: Arabic */}
          {activeTab === "ar" && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-mute">عنوان المشروع (عربي)</label>
                <input
                  type="text"
                  required
                  value={form.title_ar}
                  onChange={e => setForm({ ...form, title_ar: e.target.value })}
                  className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-mute">الملخص القصير (عربي)</label>
                <textarea
                  rows={2}
                  required
                  value={form.summary_ar}
                  onChange={e => setForm({ ...form, summary_ar: e.target.value })}
                  className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-mute">التفاصيل والتحدي والحل (Markdown)</label>
                <textarea
                  rows={5}
                  required
                  value={form.body_ar}
                  onChange={e => setForm({ ...form, body_ar: e.target.value })}
                  className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* Tab 2: English */}
          {activeTab === "en" && (
            <div className="space-y-4" dir="ltr">
              <div className="space-y-1 text-start">
                <label className="text-xs font-mono text-mute">Project Title (EN)</label>
                <input
                  type="text"
                  required
                  value={form.title_en}
                  onChange={e => setForm({ ...form, title_en: e.target.value })}
                  className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm"
                />
              </div>

              <div className="space-y-1 text-start">
                <label className="text-xs font-mono text-mute">Summary (EN)</label>
                <textarea
                  rows={2}
                  required
                  value={form.summary_en}
                  onChange={e => setForm({ ...form, summary_en: e.target.value })}
                  className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm"
                />
              </div>

              <div className="space-y-1 text-start">
                <label className="text-xs font-mono text-mute">Case Study Body (Markdown)</label>
                <textarea
                  rows={5}
                  required
                  value={form.body_en}
                  onChange={e => setForm({ ...form, body_en: e.target.value })}
                  className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* Common attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
            <div className="space-y-1">
              <label className="text-xs font-mono text-mute">معرّف الرابط (Slug)</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                placeholder="project-slug-name"
                className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-mute">التقنيات (مفصولة بفاصلة)</label>
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder="React, Flutter, Fastify"
                className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-mute">رابط مباشر (Live URL)</label>
              <input
                type="text"
                value={form.live_url || ""}
                onChange={e => setForm({ ...form, live_url: e.target.value })}
                placeholder="https://client-demo.andev.dz"
                className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-mute">رابط الكود (Repo URL)</label>
              <input
                type="text"
                value={form.repo_url || ""}
                onChange={e => setForm({ ...form, repo_url: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2 pt-2 border-t border-line">
            <label className="block text-xs font-mono text-mute">صورة الغلاف (تحويل تلقائي إلى WebP)</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded border border-line bg-surface hover:border-accent text-xs font-semibold">
                <Upload className="w-4 h-4 text-accent" />
                <span>{isUploading ? "جاري الرفع..." : "اختر صورة"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs font-mono text-mute truncate flex-1">{form.cover_image}</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-line"
              />
              <span>مشروع مميز بالرئيسية</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.published}
                onChange={e => setForm({ ...form, published: e.target.checked })}
                className="rounded border-line"
              />
              <span>منشور للعامة</span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
              حفظ المشروع
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
