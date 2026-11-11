import React, { useState, useMemo } from "react";
import { Project, ProjectInput, ProjectGalleryItem } from "@andev/shared";
import { adminService } from "../services/admin.service";

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

export function useProjectForm(project?: Project | null, onSaved?: () => void) {
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

  const initialTypeSpecs = useMemo(() => {
    const raw = (project as any)?.type_specs ?? project?.type_specs_json;
    if (typeof raw === "object" && raw !== null) return raw;
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "object" && parsed !== null) return parsed;
      } catch {}
    }
    return {};
  }, [project]);

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
    type_specs_json: initialTypeSpecs,
    tech_json: project?.tech_json ? (typeof project.tech_json === "string" ? JSON.parse(project.tech_json) : project.tech_json) : [],
    cover_image: project?.cover_image || "/uploads/projects/default.webp",
    live_url: project?.live_url || "",
    repo_url: project?.repo_url || "",
    featured: project?.featured ?? false,
    published: project?.published ?? true,
    sort_order: project?.sort_order ?? 0,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        credentials: "include",
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    let cleanSlug = (form.slug || "").trim().toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!cleanSlug) {
      cleanSlug = "project-" + Date.now();
    }

    const title_en = form.title_en?.trim() ? form.title_en.trim() : form.title_ar.trim();
    const summary_en = form.summary_en?.trim() ? form.summary_en.trim() : form.summary_ar.trim();
    const body_en = form.body_en?.trim() ? form.body_en.trim() : form.body_ar.trim();

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
      tech_json: techArray,
    };

    try {
      await adminService.saveProject(payload);
      onSaved?.();
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء حفظ المشروع");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    setForm,
    techInput,
    setTechInput,
    isUploading,
    isSaving,
    error,
    handleFileUpload,
    handleSave,
  };
}

