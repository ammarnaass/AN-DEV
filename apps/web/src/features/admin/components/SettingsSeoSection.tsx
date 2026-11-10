import React, { useState } from "react";
import {
  Search,
  Globe,
  Share2,
  CheckCircle2,
  ExternalLink,
  Copy,
  Sparkles,
  Smartphone,
  Monitor,
  ShieldCheck,
  Eye,
  Tag,
  Check,
  Compass,
} from "lucide-react";

interface SettingsSeoSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

const ALGERIA_KEYWORD_SUGGESTIONS = [
  "تطوير برمجيات الجزائر",
  "برمجة مواقع ويب احترافية",
  "تطبيقات هواتف ذكية فلاتر",
  "نظام كاشير ونقاط بيع POS",
  "برنامج إدارة المقاولات ERP",
  "أنظمة سحابية مخصصة",
  "وكالة برمجيات معتمدة الجزائر",
  "مطور برامج في الجزائر",
];

export const SettingsSeoSection: React.FC<SettingsSeoSectionProps> = ({
  settings,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<"meta" | "serp" | "social" | "indexing">("meta");
  const [serpDevice, setSerpDevice] = useState<"desktop" | "mobile">("desktop");
  const [socialPlatform, setSocialPlatform] = useState<"whatsapp" | "facebook" | "linkedin" | "x">("whatsapp");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Resolved SEO values with clean defaults
  const titleAr =
    settings.seo_site_title_ar !== undefined
      ? settings.seo_site_title_ar
      : "AN DEV | وكالة تطوير برمجيات، مواقع وتطبيقات في الجزائر";
  const titleEn =
    settings.seo_site_title_en !== undefined
      ? settings.seo_site_title_en
      : "AN DEV | High-Performance Software Development Agency Algeria";

  const descAr =
    settings.seo_meta_description_ar !== undefined
      ? settings.seo_meta_description_ar
      : "وكالة برمجيات جزائرية متخصصة في تطوير مواقع الويب، تطبيقات الهاتف، أنظمة نقاط البيع POS، وبرمجيات إدارة المؤسسات ERP بأعلى معايير الأداء والسرعة.";
  const descEn =
    settings.seo_meta_description_en !== undefined
      ? settings.seo_meta_description_en
      : "Top software engineering agency in Algeria building bespoke web platforms, mobile apps, ERPs, and cloud systems engineered for scale and speed.";

  const keywordsAr =
    settings.seo_keywords_ar !== undefined
      ? settings.seo_keywords_ar
      : "تطوير برمجيات الجزائر, برمجة مواقع, تصميم تطبيقات, تطبيقات موبايل الجزائر, أنظمة نقاط البيع, برمجة أنظمة ERP, مطور برامج, وكالة برمجيات, AN DEV";
  const keywordsEn =
    settings.seo_keywords_en !== undefined
      ? settings.seo_keywords_en
      : "software agency algeria, web development algeria, mobile apps algeria, custom software, ERP systems, POS systems, AN DEV";

  const ogImage = settings.seo_og_image || "/brand/brand-board.webp";
  const canonicalUrl = settings.seo_canonical_url || "https://andev.dz";
  const robotsDirective = settings.seo_robots_indexing || "index, follow";
  const googleToken = settings.seo_google_verification || "";
  const bingToken = settings.seo_bing_verification || "";

  // Length calculations for health gauges
  const titleLength = titleAr.length;
  const descLength = descAr.length;

  const isTitleOptimal = titleLength >= 40 && titleLength <= 65;
  const isDescOptimal = descLength >= 120 && descLength <= 165;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleAddKeyword = (kw: string) => {
    const current = keywordsAr.trim();
    if (current.includes(kw)) return;
    const updated = current ? `${current}, ${kw}` : kw;
    onChange("seo_keywords_ar", updated);
  };

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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-surface-container/60 border border-line">
        <div className="space-y-1">
          <div className="text-[11px] font-mono text-text-muted">عنوان جوجل (Title)</div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold font-mono ${
                isTitleOptimal ? "text-status-ok" : "text-amber-400"
              }`}
            >
              {titleLength} / 60 حرف
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                isTitleOptimal ? "bg-status-ok" : "bg-amber-400 animate-pulse"
              }`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono text-text-muted">الوصف التعريفي (Snippet)</div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold font-mono ${
                isDescOptimal ? "text-status-ok" : "text-amber-400"
              }`}
            >
              {descLength} / 160 حرف
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                isDescOptimal ? "bg-status-ok" : "bg-amber-400 animate-pulse"
              }`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono text-text-muted">الاستهداف الجغرافي</div>
          <div className="text-xs font-bold text-text-primary font-mono flex items-center gap-1">
            <span>الجزائر (DZ-16)</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono text-text-muted">بيانات Schema.org</div>
          <div className="text-xs font-bold text-secondary font-mono flex items-center gap-1">
            <span>Organization + Local</span>
            <Sparkles className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* TAB 1: Search Meta & Keywords */}
      {activeTab === "meta" && (
        <div className="space-y-5 animate-fadeIn">
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
                placeholder="Algerian software agency engineering high-performance web, mobile, and custom systems built for scale and reliability with mathematical precision."
                className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Live Google SERP Simulator */}
      {activeTab === "serp" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Simulator Bar Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-line gap-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Search className="w-4 h-4 text-secondary" />
                <span>محاكاة بطاقة Google الحقيقية في صفحة النتائج (Google SERP Preview)</span>
              </h3>
              <p className="text-xs text-text-muted">
                هكذا يظهر موقع AN DEV للمستخدمين عندما يبحثون عن خدماتك على محرك بحث Google.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-line">
              <button
                type="button"
                onClick={() => setSerpDevice("desktop")}
                className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  serpDevice === "desktop"
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>كمبيوتر (Desktop)</span>
              </button>
              <button
                type="button"
                onClick={() => setSerpDevice("mobile")}
                className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  serpDevice === "mobile"
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>هاتف (Mobile)</span>
              </button>
            </div>
          </div>

          {/* Realistic Google Search Card Mockup */}
          <div className="p-6 rounded-2xl bg-[#ffffff] text-[#202124] border border-slate-200 shadow-md max-w-2xl text-start font-sans">
            {/* Header: Favicon + Brand Name + Domain Breadcrumbs */}
            <div className="flex items-center gap-3 pb-1.5">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-1">
                <img
                  src="/logo.svg"
                  alt="AN DEV Favicon"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[#202124] font-medium leading-none">AN DEV</div>
                <div className="text-[11px] text-[#4d5156] font-mono leading-tight truncate" dir="ltr">
                  {canonicalUrl.replace(/^https?:\/\//, "")} › algeria › software
                </div>
              </div>
            </div>

            {/* Clickable Blue Title */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[#1a0dab] hover:underline text-lg sm:text-xl font-normal leading-snug line-clamp-2 block pt-1"
            >
              {titleAr || "AN DEV | وكالة تطوير برمجيات، مواقع وتطبيقات في الجزائر"}
            </a>

            {/* Gray Meta Snippet */}
            <p className="text-[#4d5156] text-xs sm:text-sm leading-relaxed pt-1.5 line-clamp-3">
              {descAr ||
                "وكالة برمجيات جزائرية متخصصة في تطوير مواقع الويب، تطبيقات الهاتف، أنظمة نقاط البيع POS، وبرمجيات إدارة المؤسسات ERP بأعلى معايير الأداء والسرعة."}
            </p>

            {/* Simulated Sitelinks */}
            <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-slate-100 text-xs text-[#1a0dab]">
              <div>
                <span className="font-semibold hover:underline block">معرض المشاريع والأعمال</span>
                <span className="text-[11px] text-[#4d5156] line-clamp-1">تطبيقات ويب، موبايل، وأنظمة مؤسسية.</span>
              </div>
              <div>
                <span className="font-semibold hover:underline block">طلب استشارة وعرض فني</span>
                <span className="text-[11px] text-[#4d5156] line-clamp-1">رد سريع خلال 48 ساعة وعقد رسمي.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container border border-line text-xs text-text-muted space-y-1">
            <div className="font-bold text-text-primary flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>نصائح خوارزمية Google 2026:</span>
            </div>
            <p>
              • تم تضمين كلمات المفتاحية المكانية مثل "الجزائر" و"Algiers" تلقائياً مع أكواد التوسيم الجغرافي (Geo-Tags) لتحقيق الترتيب الأول في عمليات البحث المحلية (Local SEO).
            </p>
            <p>
              • طول العنوان الحالي هو <span className="font-bold font-mono text-text-primary">{titleLength}</span> حرف، وهو {isTitleOptimal ? "في النطاق الذهبي دون اقتطاع" : "يحتاج ضبطاً ليكون بين 45 و 60 حرفاً"}.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Social Share Simulator (OpenGraph & Twitter Card) */}
      {activeTab === "social" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-line gap-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Share2 className="w-4 h-4 text-secondary" />
                <span>محاكي بطاقات المشاركة على شبكات التواصل (Open Graph Simulator)</span>
              </h3>
              <p className="text-xs text-text-muted">
                كيف تظهر روابطك وصورتك البصرية عند إرسالها على واتساب، فيسبوك، أو تويتر.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-line">
              {(["whatsapp", "facebook", "linkedin", "x"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSocialPlatform(p)}
                  className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-colors ${
                    socialPlatform === p
                      ? "bg-primary text-white"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {p === "x" ? "X / Twitter" : p}
                </button>
              ))}
            </div>
          </div>

          {/* Social Image Setting */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              مسار أو رابط صورة المعاينة الاجتماعية (Open Graph Image URL) *
            </label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => onChange("seo_og_image", e.target.value)}
              placeholder="/brand/brand-board.webp أو رابط صورة خارجية https://..."
              className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
            />
            <p className="text-[11px] text-text-muted">
              المقاس الموصى به لمحركات البحث وشبكات التواصل: 1200x630 بكسل بدقة عالية.
            </p>
          </div>

          {/* Visual Social Card Mockup */}
          <div className="max-w-md mx-auto sm:mx-0 rounded-2xl overflow-hidden border border-line bg-surface-container shadow-lg">
            <div className="w-full h-48 bg-slate-900 overflow-hidden relative">
              <img
                src={ogImage}
                alt="Social Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/brand/brand-board.webp";
                }}
              />
              <div className="absolute top-2 end-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                {socialPlatform.toUpperCase()} PREVIEW
              </div>
            </div>

            <div className="p-4 space-y-1.5 text-start bg-surface border-t border-line">
              <div className="text-[10px] font-mono text-secondary uppercase tracking-wider">
                {canonicalUrl.replace(/^https?:\/\//, "")}
              </div>
              <h4 className="text-sm font-bold text-text-primary line-clamp-1">
                {titleAr}
              </h4>
              <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                {descAr}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Search Console & Indexing Directives */}
      {activeTab === "indexing" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Indexing Switch */}
          <div className="p-4 rounded-xl bg-surface-container border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Compass className="w-4 h-4 text-secondary" />
                <span>حالة الفهرسة العامة لمحركات البحث (Search Engines Crawling)</span>
              </div>
              <p className="text-xs text-text-muted">
                عند التفعيل، يسمح لـ Google و Bing وأرشفة الويب بفهرسة كافة صفحات الموقع وعرضها للمستخدمين.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextVal = robotsDirective.includes("noindex")
                  ? "index, follow"
                  : "noindex, nofollow";
                onChange("seo_robots_indexing", nextVal);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                robotsDirective.includes("noindex")
                  ? "bg-status-danger/15 text-status-danger border border-status-danger/30"
                  : "bg-status-ok/15 text-status-ok border border-status-ok/30"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{robotsDirective.includes("noindex") ? "الفهرسة محجوبة (NoIndex)" : "الفهرسة مفعلة (Index, Follow)"}</span>
            </button>
          </div>

          {/* Verification Tokens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                رمز التحقق من Google Search Console (Verification Token)
              </label>
              <input
                type="text"
                dir="ltr"
                value={googleToken}
                onChange={(e) => onChange("seo_google_verification", e.target.value)}
                placeholder="google-site-verification=abc123xyz..."
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
              <p className="text-[11px] text-text-muted">
                يُضاف تلقائياً في وسم &lt;meta name="google-site-verification"&gt; لإثبات ملكية النطاق.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                رمز التحقق من Bing Webmaster Tools (msvalidate.01)
              </label>
              <input
                type="text"
                dir="ltr"
                value={bingToken}
                onChange={(e) => onChange("seo_bing_verification", e.target.value)}
                placeholder="msvalidate.01 token..."
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
              <p className="text-[11px] text-text-muted">
                لتفعيل الزحف والفهرسة على محرك Bing ومساعد Copilot.
              </p>
            </div>
          </div>

          {/* Canonical & Sitemap Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                الرابط الكنسي المعتمد للموقع (Canonical Domain URL)
              </label>
              <input
                type="text"
                dir="ltr"
                value={canonicalUrl}
                onChange={(e) => onChange("seo_canonical_url", e.target.value)}
                placeholder="https://andev.dz"
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
              <p className="text-[11px] text-text-muted">
                النطاق الرئيسي لتفادي المحتوى المكرر في Google.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                خريطة الموقع المباشرة (Sitemap.xml Feed)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  dir="ltr"
                  readOnly
                  value={`${canonicalUrl}/sitemap.xml`}
                  className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container/60 text-secondary text-sm font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(`${canonicalUrl}/sitemap.xml`, "sitemap")}
                  className="h-11 px-3.5 rounded-lg border border-line bg-surface-container hover:bg-surface-container-high transition-colors text-xs font-semibold text-text-primary shrink-0 flex items-center gap-1.5"
                  title="نسخ الرابط"
                >
                  {copiedLink === "sitemap" ? (
                    <Check className="w-4 h-4 text-status-ok" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedLink === "sitemap" ? "تم!" : "نسخ"}</span>
                </button>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 px-3.5 rounded-lg border border-line bg-surface-container hover:bg-surface-container-high transition-colors text-xs font-semibold text-text-primary shrink-0 flex items-center gap-1.5"
                  title="فتح في تبويب جديد"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
