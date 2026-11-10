import React, { useState } from "react";
import { Project, ProjectInput, ProjectGalleryItem } from "@andev/shared";
import { Button } from "../../../components/ui/Button";
import { X, Upload, Layers, FileText, Images, Link as LinkIcon } from "lucide-react";
import { adminService } from "../services/admin.service";
import { ProjectLocalizedFields } from "./ProjectLocalizedFields";
import { ProjectSpecsFields } from "./ProjectSpecsFields";
import { ProjectGalleryManager } from "./ProjectGalleryManager";

interface ProjectEditModalProps {
  project?: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

const SECTIONS: Array<"content" | "specs" | "gallery" | "links"> = ["content", "specs", "gallery", "links"];

function parseArrayField<T>(val: any, fallback: T[]): T[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }
  return fallback;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  onClose,
  onSaved
}) => {
  const [activeSection, setActiveSection] = useState<"content" | "specs" | "gallery" | "links">("content");
  const [activeLocaleTab, setActiveLocaleTab] = useState<"ar" | "en">("ar");
  const [techInput, setTechInput] = useState<string>(
    project?.tech_json
      ? (typeof project.tech_json === "string" ? JSON.parse(project.tech_json).join(", ") : project.tech_json.join(", "))
      : "React, Fastify, TypeScript"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialPlatforms = parseArrayField<string>(
    project?.platforms_json ?? (project as any)?.platforms,
    ["web"]
  );
  const initialGallery = parseArrayField<ProjectGalleryItem>(
    project?.gallery_json ?? (project as any)?.gallery,
    []
  );

  const [form, setForm] = useState<ProjectInput>({
    slug: project?.slug || "",
    title_ar: project?.title_ar || "",
    title_en: project?.title_en || "",
    summary_ar: project?.summary_ar || "",
    summary_en: project?.summary_en || "",
    body_ar: project?.body_ar || "",
    body_en: project?.body_en || "",
    project_type: (project?.project_type as any) || "web",
    version: project?.version || "v1.0.0",
    package_size: project?.package_size || "",
    platforms_json: initialPlatforms,
    download_url: project?.download_url || "",
    enable_live_preview: project?.enable_live_preview ?? true,
    gallery_json: initialGallery,
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
      }
    } catch {
      // Base64 already set
    } finally {
      setIsUploading(false);
    }
  };

  const handleFieldChange = (field: keyof ProjectInput, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const currentSectionIdx = SECTIONS.indexOf(activeSection);
  const goToPrevSection = () => {
    if (currentSectionIdx > 0) {
      setActiveSection(SECTIONS[currentSectionIdx - 1]);
    }
  };
  const goToNextSection = () => {
    if (currentSectionIdx < SECTIONS.length - 1) {
      setActiveSection(SECTIONS[currentSectionIdx + 1]);
    }
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
      <div className="w-full max-w-3xl rounded-card border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-start">
        <button
          onClick={onClose}
          className="absolute top-5 end-5 text-mute hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-ink">
            {project ? "تعديل دراسة الحالة والمواصفات" : "إضافة مشروع / تطبيق جديد للمعرض"}
          </h2>
          <p className="text-xs text-mute font-mono">
            نظام متكامل لدراسات الحالة التقنية، المواصفات البرمجية، وبوابة المعاينة الحية
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-err/10 border border-err/30 text-err rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Main Section Navigation Pills */}
          <div className="flex flex-wrap border-b border-line gap-2 pb-2">
            <button
              type="button"
              onClick={() => setActiveSection("content")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === "content"
                  ? "bg-primary-container text-white shadow-sm"
                  : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>1. المحتوى والترجمة</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("specs")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === "specs"
                  ? "bg-primary-container text-white shadow-sm"
                  : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. المواصفات والمنصات</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("gallery")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === "gallery"
                  ? "bg-primary-container text-white shadow-sm"
                  : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
              }`}
            >
              <Images className="w-3.5 h-3.5" />
              <span>3. الصور والمعرض</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("links")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === "links"
                  ? "bg-primary-container text-white shadow-sm"
                  : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>4. الروابط والنشر</span>
            </button>
          </div>

          {/* Section 1: Content & Translations */}
          {activeSection === "content" && (
            <div className="space-y-4">
              <div className="flex border-b border-line gap-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveLocaleTab("ar")}
                  className={`pb-2 transition-colors ${
                    activeLocaleTab === "ar" ? "text-primary border-b-2 border-primary font-bold" : "text-mute"
                  }`}
                >
                  البيانات بالعربية (RTL)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocaleTab("en")}
                  className={`pb-2 transition-colors ${
                    activeLocaleTab === "en" ? "text-primary border-b-2 border-primary font-bold" : "text-mute"
                  }`}
                >
                  English Content (LTR)
                </button>
              </div>

              <ProjectLocalizedFields
                activeTab={activeLocaleTab}
                form={form}
                onChange={handleFieldChange}
              />
            </div>
          )}

          {/* Section 2: App Specs & Platforms */}
          {activeSection === "specs" && (
            <ProjectSpecsFields
              projectType={form.project_type as any}
              onTypeChange={val => setForm(prev => ({ ...prev, project_type: val }))}
              version={form.version}
              onVersionChange={val => setForm(prev => ({ ...prev, version: val }))}
              packageSize={form.package_size}
              onPackageSizeChange={val => setForm(prev => ({ ...prev, package_size: val }))}
              platforms={form.platforms_json}
              onPlatformsChange={val => setForm(prev => ({ ...prev, platforms_json: val }))}
              downloadUrl={form.download_url || ""}
              onDownloadUrlChange={val => setForm(prev => ({ ...prev, download_url: val }))}
              enableLivePreview={form.enable_live_preview}
              onEnableLivePreviewChange={val => setForm(prev => ({ ...prev, enable_live_preview: val }))}
            />
          )}

          {/* Section 3: Gallery & Cover */}
          {activeSection === "gallery" && (
            <div className="space-y-6">
              {/* Cover Image */}
              <div className="space-y-3 p-4 rounded-xl border border-line bg-surface-container/30">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-mute font-semibold">صورة الغلاف الرئيسية (Cover Image)</label>
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
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-line bg-surface flex-shrink-0 relative group shadow-sm">
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
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded border border-line bg-surface hover:border-accent text-xs font-semibold transition-colors">
                        <Upload className="w-4 h-4 text-accent" />
                        <span>{isUploading ? "جاري الرفع..." : "اختر صورة الغلاف"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-mute font-mono truncate flex-1">{form.cover_image}</span>
                    </div>

                    <input
                      type="text"
                      value={form.cover_image}
                      onChange={e => setForm({ ...form, cover_image: e.target.value })}
                      placeholder="/uploads/... أو رابط صورة خارجي"
                      className="w-full h-8 px-2.5 rounded border border-line bg-bg/50 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Screenshot Gallery Manager */}
              <ProjectGalleryManager
                items={form.gallery_json as ProjectGalleryItem[]}
                onChange={val => setForm(prev => ({ ...prev, gallery_json: val }))}
              />
            </div>
          )}

          {/* Section 4: Links & Publishing */}
          {activeSection === "links" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-mute">معرّف الرابط (Slug) *</label>
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
                  <label className="text-xs font-mono text-mute">الترسانة التقنية (مفصولة بفاصلة)</label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    placeholder="React, Flutter, Fastify"
                    className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-mute">رابط المعاينة المباشر (Live URL)</label>
                  <input
                    type="text"
                    value={form.live_url || ""}
                    onChange={e => setForm({ ...form, live_url: e.target.value })}
                    placeholder="https://anposwebsite.vercel.app"
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

              <div className="flex items-center gap-6 pt-4 border-t border-line">
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
            </div>
          )}

          {/* Action and Step Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line">
            <span className="text-xs font-mono text-text-muted">
              {activeSection === "content" && "الخطوة 1 من 4: المحتوى والترجمة"}
              {activeSection === "specs" && "الخطوة 2 من 4: المواصفات والمنصات"}
              {activeSection === "gallery" && "الخطوة 3 من 4: المعرض والمعاينة"}
              {activeSection === "links" && "الخطوة 4 من 4: الروابط والنشر"}
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                إلغاء
              </Button>

              {currentSectionIdx > 0 && (
                <button
                  type="button"
                  onClick={goToPrevSection}
                  className="px-3.5 py-1.5 rounded-lg border border-line bg-surface-container hover:bg-surface text-xs font-semibold text-text-primary transition-colors cursor-pointer"
                >
                  ← السابق
                </button>
              )}

              {currentSectionIdx < SECTIONS.length - 1 && (
                <button
                  type="button"
                  onClick={goToNextSection}
                  className="px-4 py-1.5 rounded-lg bg-secondary/15 border border-secondary/40 text-secondary hover:bg-secondary/25 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  التالي →
                </button>
              )}

              <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
                حفظ المشروع
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
