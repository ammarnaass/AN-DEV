import React from "react";
import { Sparkles, Star, Search } from "lucide-react";
import { slugify } from "./postEditor.utils";

interface PostSeoTabProps {
  slug: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  published: boolean;
  featured: boolean;
  seoTitleAr?: string;
  seoTitleEn?: string;
  seoDescAr?: string;
  seoDescEn?: string;
  onChangeSlug: (val: string) => void;
  onChangePublished: (val: boolean) => void;
  onChangeFeatured: (val: boolean) => void;
  onChangeSeoTitleAr: (val: string) => void;
  onChangeSeoTitleEn: (val: string) => void;
  onChangeSeoDescAr: (val: string) => void;
  onChangeSeoDescEn: (val: string) => void;
  onError: (msg: string) => void;
}

export const PostSeoTab: React.FC<PostSeoTabProps> = ({
  slug,
  titleAr,
  titleEn,
  summaryAr,
  summaryEn,
  published,
  featured,
  seoTitleAr,
  seoTitleEn,
  seoDescAr,
  seoDescEn,
  onChangeSlug,
  onChangePublished,
  onChangeFeatured,
  onChangeSeoTitleAr,
  onChangeSeoTitleEn,
  onChangeSeoDescAr,
  onChangeSeoDescEn,
  onError,
}) => {
  const handleAutoSlug = () => {
    const baseText = titleEn.trim() || titleAr.trim();
    if (!baseText) {
      onError("يرجى كتابة العنوان أولاً لتوليد المعرّف");
      return;
    }
    const generated = slugify(baseText) || `article-${Date.now().toString(36)}`;
    onChangeSlug(generated);
  };

  return (
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
            value={slug}
            onChange={(e) => onChangeSlug(slugify(e.target.value))}
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
              checked={published}
              onChange={(e) => onChangePublished(e.target.checked)}
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
              checked={featured}
              onChange={(e) => onChangeFeatured(e.target.checked)}
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
              value={seoTitleAr || ""}
              onChange={(e) => onChangeSeoTitleAr(e.target.value)}
              placeholder={titleAr || "عنوان السيو الافتراضي"}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">Meta Title (English)</label>
            <input
              type="text"
              value={seoTitleEn || ""}
              onChange={(e) => onChangeSeoTitleEn(e.target.value)}
              placeholder={titleEn || "Default SEO Title"}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">Meta Description (بالعربية)</label>
            <textarea
              rows={2}
              value={seoDescAr || ""}
              onChange={(e) => onChangeSeoDescAr(e.target.value)}
              placeholder={summaryAr || "وصف السيو بالعربية..."}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">Meta Description (English)</label>
            <textarea
              rows={2}
              value={seoDescEn || ""}
              onChange={(e) => onChangeSeoDescEn(e.target.value)}
              placeholder={summaryEn || "English SEO description..."}
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
            https://andev.dz &gt; blog &gt; {slug || "post-slug"}
          </div>
          <div className="text-sm font-semibold text-primary hover:underline cursor-pointer truncate">
            {seoTitleAr || titleAr || "عنوان المقال في محرك البحث"} | AN DEV
          </div>
          <div className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {seoDescAr ||
              summaryAr ||
              "تحليلات معمارية عميقة، مقاييس أداء حقيقية، وأدلة عملية لتطوير منصات فائقة السرعة من فريق AN DEV."}
          </div>
        </div>
      </div>
    </div>
  );
};
