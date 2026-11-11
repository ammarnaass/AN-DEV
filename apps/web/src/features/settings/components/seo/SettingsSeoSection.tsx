import React, { useState } from "react";
import { Globe, Tag, Eye, Share2, ShieldCheck } from "lucide-react";
import { SEO_DEFAULTS } from "../../constants/seo.constants";
import { SeoHealthRadar } from "./SeoHealthRadar";
import { SeoMetaForm } from "./SeoMetaForm";
import { GoogleSerpPreview } from "./GoogleSerpPreview";
import { SocialCardsPreview } from "./SocialCardsPreview";
import { SeoIndexingManager } from "./SeoIndexingManager";

export interface SettingsSeoSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsSeoSection: React.FC<SettingsSeoSectionProps> = ({
  settings,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<"meta" | "serp" | "social" | "indexing">("meta");

  // Resolved SEO values with clean defaults
  const titleAr = settings.seo_site_title_ar ?? SEO_DEFAULTS.titleAr;
  const titleEn = settings.seo_site_title_en ?? SEO_DEFAULTS.titleEn;
  const descAr = settings.seo_meta_description_ar ?? SEO_DEFAULTS.descAr;
  const descEn = settings.seo_meta_description_en ?? SEO_DEFAULTS.descEn;
  const keywordsAr = settings.seo_keywords_ar ?? SEO_DEFAULTS.keywordsAr;
  const keywordsEn = settings.seo_keywords_en ?? SEO_DEFAULTS.keywordsEn;

  const ogImage = settings.seo_og_image || SEO_DEFAULTS.ogImage;
  const canonicalUrl = settings.seo_canonical_url || SEO_DEFAULTS.canonicalUrl;
  const robotsDirective = settings.seo_robots_indexing || SEO_DEFAULTS.robotsDirective;
  const googleToken = settings.seo_google_verification || "";
  const bingToken = settings.seo_bing_verification || "";

  const titleLength = titleAr.length;
  const descLength = descAr.length;
  const isTitleOptimal = titleLength >= 40 && titleLength <= 65;
  const isDescOptimal = descLength >= 120 && descLength <= 165;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-6 shadow-sm text-start">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-line gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-secondary/15 text-secondary border border-secondary/25">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-text-primary">
                مركز إدارة الـ SEO وتصدر محركات البحث (SEO Engine Hub)
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-status-ok/15 text-status-ok border border-status-ok/30 text-[10px] font-mono font-bold">
                {robotsDirective.includes("noindex") ? "فهرسة محجوبة" : "مفعل ومفهرس ★"}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              تهيئة شاملة لنتائج بحث Google، بطاقات المشاركة، التوسيم الجغرافي للجزائر، وخرائط السايت ماب.
            </p>
          </div>
        </div>

        {/* Sub-nav Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container border border-line self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("meta")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "meta"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>الميتا والكلمات</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("serp")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "serp"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>محاكي Google SERP</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("social")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "social"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>المعاينة الاجتماعية</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("indexing")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "indexing"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>الفهرسة وأدوات المشرفين</span>
          </button>
        </div>
      </div>

      {/* Quick SEO Health Radar */}
      <SeoHealthRadar
        titleLength={titleLength}
        descLength={descLength}
        isTitleOptimal={isTitleOptimal}
        isDescOptimal={isDescOptimal}
      />

      {/* Tab Views */}
      {activeTab === "meta" && (
        <SeoMetaForm
          titleAr={titleAr}
          titleEn={titleEn}
          descAr={descAr}
          descEn={descEn}
          keywordsAr={keywordsAr}
          keywordsEn={keywordsEn}
          settings={settings}
          isTitleOptimal={isTitleOptimal}
          isDescOptimal={isDescOptimal}
          titleLength={titleLength}
          descLength={descLength}
          onChange={onChange}
        />
      )}

      {activeTab === "serp" && (
        <GoogleSerpPreview
          canonicalUrl={canonicalUrl}
          titleAr={titleAr}
          descAr={descAr}
          titleLength={titleLength}
          isTitleOptimal={isTitleOptimal}
        />
      )}

      {activeTab === "social" && (
        <SocialCardsPreview
          ogImage={ogImage}
          canonicalUrl={canonicalUrl}
          titleAr={titleAr}
          descAr={descAr}
          onChange={onChange}
        />
      )}

      {activeTab === "indexing" && (
        <SeoIndexingManager
          robotsDirective={robotsDirective}
          googleToken={googleToken}
          bingToken={bingToken}
          canonicalUrl={canonicalUrl}
          onChange={onChange}
        />
      )}
    </div>
  );
};

