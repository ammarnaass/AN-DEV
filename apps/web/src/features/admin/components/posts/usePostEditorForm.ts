import React, { useState } from "react";
import { Post, PostInput, PostCategory } from "@andev/shared";
import { adminService } from "../../services/admin.service";

export function usePostEditorForm(post: Post | null | undefined, onSaved: () => void) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialTags = React.useMemo(() => {
    if (Array.isArray(post?.tags)) return post.tags;
    if (typeof post?.tags_json === "string") {
      try {
        const parsed = JSON.parse(post.tags_json);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return [];
  }, [post]);

  const [form, setForm] = useState<PostInput>({
    slug: post?.slug || "",
    title_ar: post?.title_ar || "",
    title_en: post?.title_en || "",
    summary_ar: post?.summary_ar || "",
    summary_en: post?.summary_en || "",
    body_md_ar: post?.body_md_ar || "",
    body_md_en: post?.body_md_en || "",
    cover_image: post?.cover_image || "/uploads/blog/default.webp",
    category: (post?.category as PostCategory) || "architecture",
    tags: initialTags,
    author_name: post?.author_name || "عمار ناعس",
    author_role: post?.author_role || "Senior Systems Architect",
    author_avatar: post?.author_avatar || "/uploads/author.webp",
    reading_time_minutes: post?.reading_time_minutes || 5,
    views_count: post?.views_count || 0,
    featured: post?.featured ?? false,
    published: post?.published ?? true,
    seo_title_ar: post?.seo_title_ar || "",
    seo_title_en: post?.seo_title_en || "",
    seo_desc_ar: post?.seo_desc_ar || "",
    seo_desc_en: post?.seo_desc_en || ""
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        setForm((prev) => ({ ...prev, cover_image: base64Url }));
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
          setForm((prev) => ({ ...prev, cover_image: data.path }));
        }
      }
    } catch {
      // Fallback already assigned via base64
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = (tag: string) => {
    if (!tag) return;
    if (!form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title_ar.trim() || !form.title_en.trim()) {
      setError("العنوان باللغتين العربية والإنجليزية مطلوب");
      return;
    }
    if (!form.slug.trim()) {
      setError("معرّف المقال (Slug) مطلوب للرابط");
      return;
    }
    if (!form.body_md_ar.trim() || !form.body_md_en.trim()) {
      setError("محتوى المقال باللغتين العربية والإنجليزية مطلوب");
      return;
    }

    try {
      setIsSaving(true);
      await adminService.savePost({
        ...form,
        id: post?.id,
        tags_json: JSON.stringify(form.tags),
      });
      onSaved();
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء حفظ المقال");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    setForm,
    isUploading,
    isSaving,
    error,
    setError,
    handleFileUpload,
    handleAddTag,
    handleRemoveTag,
    handleSave,
  };
}

