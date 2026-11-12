import React from "react";
import { SeoKeywordsForm } from "./SeoKeywordsForm";
import { SeoBrandBioForm } from "./SeoBrandBioForm";

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
            placeholder="AN DEV | تطوير برمجيات، مواقع وتطبيقات في الجزائر"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              العنوان بالإنجليزية (English SEO Title)
            </label>
            <span
              className={`text-[10px] font-mono font-bold ${
                titleEn.length >= 40 && titleEn.length <= 65
                  ? "text-status-ok"
                  : "text-text-muted"
              }`}
            >
              {titleEn.length} chars
            </span>
          </div>
          <input
            type="text"
            dir="ltr"
            value={titleEn}
            onChange={(e) => onChange("seo_site_title_en", e.target.value)}
            placeholder="AN DEV | Software Development Agency Algeria"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              الوصف لمحركات البحث (Meta Description بالعربية) *
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
            placeholder="وكالة برمجيات جزائرية متخصصة في تطوير مواقع الويب، تطبيقات الهاتف، وأنظمة ERP..."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              الوصف بالإنجليزية (English Meta Description)
            </label>
            <span
              className={`text-[10px] font-mono font-bold ${
                descEn.length >= 100 && descEn.length <= 165
                  ? "text-status-ok"
                  : "text-text-muted"
              }`}
            >
              {descEn.length} chars
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

      {/* Keywords Form Component */}
      <SeoKeywordsForm
        keywordsAr={keywordsAr}
        keywordsEn={keywordsEn}
        onChange={onChange}
      />

      {/* Brand Taglines & Bio Form Component */}
      <SeoBrandBioForm
        settings={settings}
        onChange={onChange}
      />
    </div>
  );
};
