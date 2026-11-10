import React, { useState } from "react";
import { Project, ProjectInput } from "@andev/shared";
import { Button } from "../../../components/ui/Button";
import { X, Upload } from "lucide-react";
import { adminService } from "../services/admin.service";
import { ProjectLocalizedFields } from "./ProjectLocalizedFields";

interface ProjectEditModalProps {
  project?: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  onClose,
  onSaved
}) => {
  const [activeTab, setActiveTab] = useState<"ar" | "en">("ar");
  const [techInput, setTechInput] = useState<string>(
    project?.tech_json
      ? (typeof project.tech_json === "string" ? JSON.parse(project.tech_json).join(", ") : project.tech_json.join(", "))
      : "React, Fastify, TypeScript"
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

    // Immediately read file as base64 for instant preview and fallback
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        setForm(prev => ({ ...prev, cover_image: base64Url }));
      }
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        if (data.path) {
          setForm(prev => ({ ...prev, cover_image: data.path }));
        }
      } else {
        // Keep the local base64 preview without blocking the user
        console.warn("Upload server returned non-200 status, using base64 fallback");
      }
    } catch (uploadErr) {
      console.warn("Upload fetch failed, using local base64 fallback:", uploadErr);
      // Base64 already previewed by FileReader
    } finally {
      setIsUploading(false);
    }
  };

  const handleFieldChange = (field: keyof ProjectInput, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    // Sanitize slug
    let cleanSlug = (form.slug || "").trim().toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!cleanSlug) {
      cleanSlug = "project-" + Date.now();
    }

    // Auto-fallback English fields from Arabic if empty
    const title_en = form.title_en?.trim() ? form.title_en.trim() : form.title_ar.trim();
    const summary_en = form.summary_en?.trim() ? form.summary_en.trim() : form.summary_ar.trim();
    const body_en = form.body_en?.trim() ? form.body_en.trim() : form.body_ar.trim();

    // Sanitize URLs
    let cleanRepoUrl = (form.repo_url || "").trim();
    if (cleanRepoUrl.includes("...") || cleanRepoUrl === "https://github.com/") {
      cleanRepoUrl = "";
    }

    let cleanLiveUrl = (form.live_url || "").trim();
    if (cleanLiveUrl.includes("...")) {
      cleanLiveUrl = "";
    }

    const techArray = techInput.split(",").map(s => s.trim()).filter(Boolean);
    const payload = {
      ...form,
      slug: cleanSlug,
      title_ar: form.title_ar.trim(),
      title_en,
      summary_ar: form.summary_ar.trim(),
      summary_en,
      body_ar: form.body_ar.trim(),
      body_en,
      live_url: cleanLiveUrl,
      repo_url: cleanRepoUrl,
      cover_image: form.cover_image?.trim() || "/uploads/projects/default.webp",
      id: project?.id,
      tech_json: techArray
    };

    try {
      await adminService.saveProject(payload);
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

          {/* Localized Fields */}
          <ProjectLocalizedFields
            activeTab={activeTab}
            form={form}
            onChange={handleFieldChange}
          />

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

          {/* Image Upload & Path */}
          <div className="space-y-3 pt-2 border-t border-line">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-mute font-semibold">صورة الغلاف (Cover Image)</label>
              {form.cover_image && form.cover_image !== "/uploads/projects/default.webp" && (
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, cover_image: "/uploads/projects/default.webp" }))}
                  className="text-[11px] text-accent hover:underline"
                >
                  استعادة الصورة الافتراضية
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {form.cover_image && (
                <div className="w-20 h-14 rounded-lg overflow-hidden border border-line bg-surface-container flex-shrink-0 relative group shadow-sm">
                  <img
                    src={form.cover_image}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/uploads/projects/default.webp";
                    }}
                  />
                </div>
              )}

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded border border-line bg-surface hover:border-accent text-xs font-semibold transition-colors">
                    <Upload className="w-4 h-4 text-accent" />
                    <span>{isUploading ? "جاري الرفع..." : "اختر صورة من جهازك"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-mute">تحويل تلقائي ومعاينة فورية</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={form.cover_image}
                    onChange={e => setForm({ ...form, cover_image: e.target.value })}
                    placeholder="/uploads/projects/default.webp أو رابط صورة خارجي"
                    className="w-full h-9 px-3 rounded border border-line bg-bg/50 text-xs font-mono"
                  />
                </div>
              </div>
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
