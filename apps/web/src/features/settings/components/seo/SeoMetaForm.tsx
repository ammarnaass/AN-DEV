import React from "react";
import { Sparkles } from "lucide-react";
import { ALGERIA_KEYWORD_SUGGESTIONS } from "../../constants/seo.constants";

interface SeoMetaFormProps {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  keywordsAr: string;
  keywordsEn: string;
  settings: Record<string, string>;
  isTitleOptimal: boolean;
  isDescOptimal: boolean;
  titleLength: number;
  descLength: number;
  onChange: (key: string, val: string) => void;
}

export const SeoMetaForm: React.FC<SeoMetaFormProps> = ({
  titleAr,
  titleEn,
  descAr,
  descEn,
  keywordsAr,
  keywordsEn,
  settings,
  isTitleOptimal,
  isDescOptimal,
  titleLength,
  descLength,
  onChange,
}) => {
  const handleAddKeyword = (kw: string) => {
    const current = keywordsAr.trim();
    if (current.includes(kw)) return;
    const updated = current ? `${current}, ${kw}` : kw;
    onChange("seo_keywords_ar", updated);
  };

  return (
    <div className="space-y-5 animate-fadeIn text-start">
      {/* Titles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              عنوان الموقع الرئيسي لمحركات البحث (SEO Title بالعربية) *
            </label>
            <span
              className={`text-[10px] font-mono font-bold ${
                isTitleOptimal ? "text-status-ok" : "text-amber-400"
              }`}
            >
              {titleLength} حرف (المثالي: 50-60)
            </span>
          </div>
          <input
            type="text"
            value={titleAr}
            onChange={(e) => onChange("seo_site_title_ar", e.target.value)}
            placeholder="AN DEV | وكالة تطوير برمجيات، مواقع وتطبيقات في الجزائر"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              عنوان الموقع لمحركات البحث (SEO Title بالإنجليزية) *
            </label>
            <span className="text-[10px] font-mono text-text-muted">
              {titleEn.length} حرف
            </span>
          </div>
          <input
            type="text"
            dir="ltr"
            value={titleEn}
            onChange={(e) => onChange("seo_site_title_en", e.target.value)}
            placeholder="AN DEV | High-Performance Software Development Agency Algeria"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Meta Descriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              الوصف التعريفي للنتائج (Meta Description بالعربية) *
            </label>
            <span
              className={`text-[10px] font-mono font-bold ${
                isDescOptimal ? "text-status-ok" : "text-amber-400"
              }`}
            >
              {descLength} حرف (المثالي: 120-160)
            </span>
          </div>
          <textarea
            rows={3}
            value={descAr}
            onChange={(e) => onChange("seo_meta_description_ar", e.target.value)}
            placeholder="وكالة برمجيات جزائرية متخصصة في تطوير مواقع الويب، تطبيقات الهاتف، أنظمة نقاط البيع POS..."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              الوصف التعريفي للنتائج (Meta Description بالإنجليزية) *
            </label>
            <span className="text-[10px] font-mono text-text-muted">
              {descEn.length} حرف
            </span>
          </div>
          <textarea
            rows={3}
            dir="ltr"
            value={descEn}
            onChange={(e) => onChange("seo_meta_description_en", e.target.value)}
            placeholder="Top software engineering agency in Algeria building bespoke web platforms, mobile apps, ERPs..."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* Keywords with Quick Add Tags */}
      <div className="space-y-2.5 pt-2 border-t border-line">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            الكلمات المفتاحية للبحث المستهدف في الجزائر والمنطقة (Search Keywords)
          </label>
          <span className="text-[10px] text-secondary font-mono">
            مفصولة بفواصل (، أو ,)
          </span>
        </div>
        <textarea
          rows={2}
          value={keywordsAr}
          onChange={(e) => onChange("seo_keywords_ar", e.target.value)}
          placeholder="تطوير برمجيات الجزائر, برمجة مواقع, تصميم تطبيقات, تطبيقات موبايل الجزائر..."
          className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
        />

        {/* Keyword Pills for Quick Addition */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-text-muted font-mono flex items-center gap-1 me-1">
            <Sparkles className="w-3 h-3 text-secondary" />
            <span>اقتراحات الأكثر بحثاً:</span>
          </span>
          {ALGERIA_KEYWORD_SUGGESTIONS.map((kw) => {
            const isSelected = keywordsAr.includes(kw);
            return (
              <button
                key={kw}
                type="button"
                onClick={() => handleAddKeyword(kw)}
                className={`px-2 py-0.5 rounded-md text-[11px] transition-colors border ${
                  isSelected
                    ? "bg-secondary/15 text-secondary border-secondary/30 font-semibold"
                    : "bg-surface-container border-line text-text-muted hover:text-text-primary hover:border-secondary/40"
                }`}
              >
                {isSelected ? `✓ ${kw}` : `+ ${kw}`}
              </button>
            );
          })}
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            الكلمات المفتاحية بالإنجليزية (English Keywords)
          </label>
          <textarea
            rows={2}
            dir="ltr"
            value={keywordsEn}
            onChange={(e) => onChange("seo_keywords_en", e.target.value)}
            placeholder="software agency algeria, web development algeria, mobile apps algeria..."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* Tagline & Footer Bio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            شعار الهوية اللفظي (Tagline بالعربية)
          </label>
          <input
            type="text"
            value={settings.tagline_ar || ""}
            onChange={(e) => onChange("tagline_ar", e.target.value)}
            placeholder="نطوّر برمجيات تُحدث فرقاً حقيقياً في أعمالكم"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            شعار الهوية اللفظي (Tagline بالإنجليزية)
          </label>
          <input
            type="text"
            dir="ltr"
            value={settings.tagline_en || ""}
            onChange={(e) => onChange("tagline_en", e.target.value)}
            placeholder="We engineer software that transforms your business"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            نبذة وتوصيف الموقع في التذييل (Footer Bio بالعربية)
          </label>
          <textarea
            rows={2}
            value={settings.footer_description_ar ?? ""}
            onChange={(e) => onChange("footer_description_ar", e.target.value)}
            placeholder="نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية - ا. تجربة برمجية متقدمة تواكب التطور السحابي والخوارزمي بأعلى معايير الجودة."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            نبذة وتوصيف الموقع في التذييل (Footer Bio بالإنجليزية)
          </label>
          <textarea
            rows={2}
            dir="ltr"
            value={settings.footer_description_en ?? ""}
            onChange={(e) => onChange("footer_description_en", e.target.value)}
            placeholder="We engineer scalable digital solutions and high-performance apps with meticulous precision."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>
      </div>
    </div>
  );
};

