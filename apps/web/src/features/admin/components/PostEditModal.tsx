import React, { useState, useEffect } from "react";
import { Post, PostInput, PostCategory } from "@andev/shared";
import { Button } from "../../../components/ui/Button";
import {
  X,
  Upload,
  FileText,
  Image as ImageIcon,
  Search,
  Globe,
  Sparkles,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Code,
  Quote,
  List,
  Eye,
  Edit3,
  Clock,
  User,
  Star
} from "lucide-react";
import { adminService } from "../services/admin.service";

interface PostEditModalProps {
  post?: Post | null;
  onClose: () => void;
  onSaved: () => void;
}

type TabType = "arabic" | "english" | "media" | "seo";

const CATEGORIES: Array<{ id: PostCategory; label_ar: string; label_en: string }> = [
  { id: "architecture", label_ar: "معمارية الأنظمة (Architecture)", label_en: "System Architecture" },
  { id: "performance", label_ar: "الأداء وقواعد البيانات (Databases & Performance)", label_en: "Databases & Performance" },
  { id: "security", label_ar: "الأمان والامتثال (Security & Compliance)", label_en: "Security & Compliance" },
  { id: "pos_erp", label_ar: "نقاط البيع والمؤسسات (POS & ERP Systems)", label_en: "POS & ERP Systems" },
  { id: "ai_llm", label_ar: "الذكاء الاصطناعي والأتمتة (AI & Automation)", label_en: "AI & Automation" },
  { id: "frontend", label_ar: "هندسة الواجهات الحديثة (Modern UI/UX)", label_en: "Modern UI/UX" },
  { id: "general", label_ar: "مقالات عامة وتجارب هندسية (General)", label_en: "General" }
];

const PRESET_TAGS = [
  "PostgreSQL",
  "React 19",
  "Fastify",
  "Docker",
  "SQLite",
  "WAL Mode",
  "Redis",
  "Zod",
  "Drizzle ORM",
  "High Performance",
  "DevOps",
  "Linux Kernel"
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export const PostEditModal: React.FC<PostEditModalProps> = ({
  post,
  onClose,
  onSaved,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("arabic");
  const [previewModeAr, setPreviewModeAr] = useState(false);
  const [previewModeEn, setPreviewModeEn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse initial tags
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

  const [tagInput, setTagInput] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Fast base64 preview
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

  const handleAddTag = (tagToAdd?: string) => {
    const tag = (tagToAdd || tagInput).trim();
    if (!tag) return;
    if (!form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleAutoSlug = () => {
    const baseText = form.title_en.trim() || form.title_ar.trim();
    if (!baseText) {
      setError("يرجى كتابة العنوان أولاً لتوليد المعرّف");
      return;
    }
    const generated = slugify(baseText) || `article-${Date.now().toString(36)}`;
    setForm((prev) => ({ ...prev, slug: generated }));
  };

  const handleAutoReadingTime = () => {
    const combined = `${form.body_md_ar} ${form.body_md_en}`;
    const calculated = calculateReadingTime(combined);
    setForm((prev) => ({ ...prev, reading_time_minutes: calculated }));
  };

  const insertMarkdownSyntax = (
    field: "body_md_ar" | "body_md_en",
    syntax: string,
    prefix = "",
    suffix = ""
  ) => {
    const currentText = form[field] || "";
    const updated = `${currentText}\n${prefix}${syntax}${suffix}\n`;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-md animate-fade-in text-start overflow-y-auto">
      <div className="w-full max-w-5xl my-auto rounded-2xl border border-line bg-surface shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:px-8 border-b border-line flex items-center justify-between bg-surface-container/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-primary-container text-white">
                <FileText className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-text-primary">
                {post ? `تحرير المقال: ${post.title_ar}` : "إضافة مقال تقني جديد للمدونة"}
              </h2>
            </div>
            <p className="text-xs text-text-muted">
              نظام إدارة المقالات التقنية، الأكواد، مقاييس الأداء وإعدادات محركات البحث.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-line transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-line bg-surface px-4 sm:px-8 overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("arabic")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "arabic"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>المحتوى العربي (RTL)</span>
            {form.title_ar && <span className="w-1.5 h-1.5 rounded-full bg-status-ok" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("english")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "english"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>English Content (LTR)</span>
            {form.title_en && <span className="w-1.5 h-1.5 rounded-full bg-status-ok" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "media"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>الوسائط والتصنيف</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-container text-text-muted">
              {form.tags.length} وسوم
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "seo"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>السيو وحالة النشر</span>
            {form.published ? (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-status-ok/15 text-status-ok font-mono">
                منشور
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-container text-text-muted font-mono">
                مسودة
              </span>
            )}
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-err/10 border border-err/30 text-err text-xs sm:text-sm font-medium flex items-center gap-2">
              <X className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: Arabic Content */}
          {activeTab === "arabic" && (
            <div className="space-y-5" dir="rtl">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary">
                  عنوان المقال بالعربية *
                </label>
                <input
                  type="text"
                  value={form.title_ar}
                  onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
                  placeholder="مثال: استبدال خادم قواعد البيانات بـ SQLite بنمط WAL وLitestream"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary">
                  الموجز التنفيذي (Summary)
                </label>
                <textarea
                  rows={2}
                  value={form.summary_ar}
                  onChange={(e) => setForm({ ...form, summary_ar: e.target.value })}
                  placeholder="موجز سريع يظهر في بطاقة المقال وفي نتائج البحث..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all resize-y"
                />
              </div>

              {/* Markdown Editor / Preview Switch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <label className="text-xs font-bold text-text-primary">
                    محتوى المقال التقني (Markdown GFM) *
                  </label>
                  <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-line">
                    <button
                      type="button"
                      onClick={() => setPreviewModeAr(false)}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                        !previewModeAr
                          ? "bg-surface text-secondary shadow-sm"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>المحرر</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewModeAr(true)}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                        previewModeAr
                          ? "bg-surface text-secondary shadow-sm"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة مباشرة</span>
                    </button>
                  </div>
                </div>

                {!previewModeAr ? (
                  <div className="border border-line rounded-xl overflow-hidden focus-within:border-secondary transition-all">
                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-container/60 border-b border-line text-text-muted">
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_ar", "## عنوان فرعي (H2)")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Heading 2"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_ar", "### عنوان فرعي 3 (H3)")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Heading 3"
                      >
                        <Heading3 className="w-4 h-4" />
                      </button>
                      <span className="w-[1px] h-4 bg-line mx-1" />
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_ar", "**نص عريض**")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_ar", "*نص مائل*")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <span className="w-[1px] h-4 bg-line mx-1" />
                      <button
                        type="button"
                        onClick={() =>
                          insertMarkdownSyntax(
                            "body_md_ar",
                            "```typescript\n// Example Code\nconst benchmark = 24.5;\n```"
                          )
                        }
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Code Block"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_ar", "> اقتباس هندسي أو ملاحظة معمارية")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Blockquote"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_ar", "- نقطة أولى\n- نقطة ثانية")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={14}
                      value={form.body_md_ar}
                      onChange={(e) => setForm({ ...form, body_md_ar: e.target.value })}
                      placeholder="# مقدمة معمارية&#10;&#10;اكتب المقال التقني هنا باستخدام Markdown..."
                      className="w-full p-4 bg-surface-container font-mono text-xs sm:text-sm text-text-primary outline-none resize-y leading-relaxed"
                      required
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-surface-container/50 border border-line min-h-[300px] max-h-[450px] overflow-y-auto space-y-4">
                    <h3 className="text-xl font-bold text-text-primary pb-2 border-b border-line">
                      {form.title_ar || "عنوان المقال التجريبي"}
                    </h3>
                    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-text-primary whitespace-pre-line leading-relaxed">
                      {form.body_md_ar || "لا يوجد محتوى لمعاينته حتى الآن."}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: English Content */}
          {activeTab === "english" && (
            <div className="space-y-5" dir="ltr">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary">
                  Article Title (English) *
                </label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                  placeholder="e.g. Replacing External DB with SQLite WAL and Litestream Replication"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary">
                  Executive Summary
                </label>
                <textarea
                  rows={2}
                  value={form.summary_en}
                  onChange={(e) => setForm({ ...form, summary_en: e.target.value })}
                  placeholder="Brief synopsis for cards and search snippets..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all resize-y"
                />
              </div>

              {/* English Markdown Editor / Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <label className="text-xs font-bold text-text-primary">
                    Article Technical Markdown (GFM) *
                  </label>
                  <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-line">
                    <button
                      type="button"
                      onClick={() => setPreviewModeEn(false)}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                        !previewModeEn
                          ? "bg-surface text-secondary shadow-sm"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewModeEn(true)}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                        previewModeEn
                          ? "bg-surface text-secondary shadow-sm"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </button>
                  </div>
                </div>

                {!previewModeEn ? (
                  <div className="border border-line rounded-xl overflow-hidden focus-within:border-secondary transition-all">
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-container/60 border-b border-line text-text-muted">
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_en", "## Architecture Overview")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Heading 2"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_en", "### Benchmark Results")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Heading 3"
                      >
                        <Heading3 className="w-4 h-4" />
                      </button>
                      <span className="w-[1px] h-4 bg-line mx-1" />
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_en", "**Bold text**")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_en", "*Italic text*")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <span className="w-[1px] h-4 bg-line mx-1" />
                      <button
                        type="button"
                        onClick={() =>
                          insertMarkdownSyntax(
                            "body_md_en",
                            "```typescript\n// Benchmark snippet\nconst latencyMs = 21.4;\n```"
                          )
                        }
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Code Block"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_en", "> Architectural note")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Blockquote"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax("body_md_en", "- Point 1\n- Point 2")}
                        className="p-1.5 rounded hover:bg-surface hover:text-text-primary"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={14}
                      value={form.body_md_en}
                      onChange={(e) => setForm({ ...form, body_md_en: e.target.value })}
                      placeholder="# Architectural Deep Dive&#10;&#10;Write article content in Markdown..."
                      className="w-full p-4 bg-surface-container font-mono text-xs sm:text-sm text-text-primary outline-none resize-y leading-relaxed"
                      required
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-surface-container/50 border border-line min-h-[300px] max-h-[450px] overflow-y-auto space-y-4">
                    <h3 className="text-xl font-bold text-text-primary pb-2 border-b border-line">
                      {form.title_en || "Sample Article Title"}
                    </h3>
                    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-text-primary whitespace-pre-line leading-relaxed">
                      {form.body_md_en || "No content to preview yet."}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Media & Tech Attributes */}
          {activeTab === "media" && (
            <div className="space-y-6">
              {/* Cover Image & Upload */}
              <div className="p-5 rounded-xl border border-line bg-surface-container/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-secondary" />
                      <span>صورة الغلاف التقنية (Cover Image)</span>
                    </h4>
                    <p className="text-xs text-text-muted">
                      يُفضل استخدام صور WebP خفيفة بنسبة أبعاد 16:9 لعرض المقال بشكل احترافي.
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-secondary/15 hover:bg-secondary/25 border border-secondary/30 text-secondary text-xs font-semibold cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? "جارٍ الرفع..." : "رفع صورة جديدة"}</span>
                    <input
                      type="file"
                      accept="image/webp,image/png,image/jpeg"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs text-text-muted">رابط الصورة (URL أو مسار محلي)</label>
                    <input
                      type="text"
                      value={form.cover_image}
                      onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                      placeholder="/uploads/blog/architecture-wal.webp"
                      className="w-full px-3.5 py-2 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
                    />
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative h-24 rounded-lg border border-line overflow-hidden bg-background flex items-center justify-center">
                    {form.cover_image ? (
                      <img
                        src={form.cover_image}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-[10px] text-text-muted font-mono">لا توجد صورة</span>
                    )}
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-background/80 text-[9px] font-mono text-secondary border border-line">
                      16:9
                    </span>
                  </div>
                </div>
              </div>

              {/* Category & Reading Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-primary">
                    التصنيف الهندسي (Category) *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as PostCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-line text-xs sm:text-sm text-text-primary outline-none focus:border-secondary"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label_ar}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-text-primary">
                      وقت القراءة التقديري (بالدقائق)
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoReadingTime}
                      className="text-[11px] text-secondary hover:underline flex items-center gap-1 font-mono"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>حساب تلقائي (~200 wpm)</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={form.reading_time_minutes}
                      onChange={(e) =>
                        setForm({ ...form, reading_time_minutes: parseInt(e.target.value) || 5 })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-line text-xs sm:text-sm text-text-primary outline-none focus:border-secondary"
                    />
                    <Clock className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Tags Chip Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-primary">
                  الوسوم والتقنيات (Tags & Technologies)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="اكتب الوسم واضغط Enter (مثال: SQLite, Docker, React 19)"
                    className="flex-1 px-3.5 py-2 rounded-lg bg-surface-container border border-line text-xs text-text-primary outline-none focus:border-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag()}
                    className="px-4 py-2 rounded-lg bg-secondary/15 border border-secondary/30 text-secondary text-xs font-semibold hover:bg-secondary/25 transition-all"
                  >
                    إضافة وسم
                  </button>
                </div>

                {/* Active Tags */}
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/25 text-secondary text-xs font-mono"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-err transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Preset Suggestions */}
                <div className="pt-2">
                  <span className="text-[10px] text-text-muted block mb-1 font-mono">
                    وسوم مقترحة شائعة:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_TAGS.map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => handleAddTag(pt)}
                        disabled={form.tags.includes(pt)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                          form.tags.includes(pt)
                            ? "bg-surface-container text-text-muted/50 border-line cursor-not-allowed"
                            : "bg-surface hover:bg-surface-container text-text-muted hover:text-text-primary border-line"
                        }`}
                      >
                        + {pt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Information */}
              <div className="p-4 rounded-xl border border-line bg-surface-container/30 space-y-3">
                <h4 className="text-xs font-bold text-text-primary flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-secondary" />
                  <span>بطاقة الكاتب / المهندس (Author Profile)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted">اسم الكاتب</label>
                    <input
                      type="text"
                      value={form.author_name}
                      onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted">المسمى الوظيفي</label>
                    <input
                      type="text"
                      value={form.author_role}
                      onChange={(e) => setForm({ ...form, author_role: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted">صورة الكاتب (Avatar)</label>
                    <input
                      type="text"
                      value={form.author_avatar}
                      onChange={(e) => setForm({ ...form, author_avatar: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEO & Publishing */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              {/* Slug Configuration */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text-primary">
                    المعرّف الثابت في الرابط (Slug) *
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoSlug}
                    className="text-[11px] text-secondary hover:underline flex items-center gap-1 font-mono"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>توليد تلقائي من العنوان</span>
                  </button>
                </div>
                <div className="flex items-center rounded-xl bg-surface-container border border-line px-3 focus-within:border-secondary transition-all">
                  <span className="text-xs font-mono text-text-muted select-none">
                    andev.dz/blog/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    placeholder="fast-sqlite-wal-architecture"
                    className="flex-1 py-2.5 px-1 bg-transparent text-xs sm:text-sm font-mono text-secondary outline-none"
                    required
                  />
                </div>
              </div>

              {/* Switches: Published & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-line bg-surface-container/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-primary block">
                      حالة النشر (Published)
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      المقال يظهر للزوار في المدونة العامة فور تفعيله.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-status-ok"></div>
                  </label>
                </div>

                <div className="p-4 rounded-xl border border-line bg-surface-container/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-warn fill-warn" />
                      <span>مقال مميز (Featured Article)</span>
                    </span>
                    <span className="text-[11px] text-text-muted block">
                      تثبيت المقال في أعلى واجهة المدونة كدراسة رئيسية.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warn"></div>
                  </label>
                </div>
              </div>

              {/* SEO Overrides */}
              <div className="p-4 rounded-xl border border-line bg-surface-container/20 space-y-4">
                <h4 className="text-xs font-bold text-text-primary flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-secondary" />
                  <span>تخصيص علامات الميتا لمحركات البحث (SEO Overrides)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted">Meta Title (بالعربية)</label>
                    <input
                      type="text"
                      value={form.seo_title_ar}
                      onChange={(e) => setForm({ ...form, seo_title_ar: e.target.value })}
                      placeholder={form.title_ar || "عنوان السيو الافتراضي"}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted">Meta Title (English)</label>
                    <input
                      type="text"
                      value={form.seo_title_en}
                      onChange={(e) => setForm({ ...form, seo_title_en: e.target.value })}
                      placeholder={form.title_en || "Default SEO Title"}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted">Meta Description (بالعربية)</label>
                    <textarea
                      rows={2}
                      value={form.seo_desc_ar}
                      onChange={(e) => setForm({ ...form, seo_desc_ar: e.target.value })}
                      placeholder={form.summary_ar || "وصف السيو بالعربية..."}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted">Meta Description (English)</label>
                    <textarea
                      rows={2}
                      value={form.seo_desc_en}
                      onChange={(e) => setForm({ ...form, seo_desc_en: e.target.value })}
                      placeholder={form.summary_en || "English SEO description..."}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Search Engine Snippet Preview (SERP Card) */}
              <div className="p-4 rounded-xl border border-line bg-surface-container/50 space-y-2">
                <span className="text-[11px] font-mono text-text-muted block">
                  معاينة مقتطف البحث في Google (SERP Preview):
                </span>
                <div className="p-3.5 rounded-lg bg-surface border border-line text-start space-y-1">
                  <div className="text-[11px] text-text-muted font-mono truncate">
                    https://andev.dz &gt; blog &gt; {form.slug || "post-slug"}
                  </div>
                  <div className="text-sm font-semibold text-primary hover:underline cursor-pointer truncate">
                    {form.seo_title_ar || form.title_ar || "عنوان المقال في محرك البحث"} | AN DEV
                  </div>
                  <div className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {form.seo_desc_ar ||
                      form.summary_ar ||
                      "تحليلات معمارية عميقة، مقاييس أداء حقيقية، وأدلة عملية لتطوير منصات فائقة السرعة من فريق AN DEV."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-line">
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>{form.reading_time_minutes} دقيقة قراءة</span>
              <span>•</span>
              <span>{form.tags.length} وسوم تقنية</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-all"
              >
                إلغاء
              </button>
              <Button type="submit" variant="primary" isLoading={isSaving}>
                {post ? "حفظ التعديلات" : "نشر المقال التقني"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
