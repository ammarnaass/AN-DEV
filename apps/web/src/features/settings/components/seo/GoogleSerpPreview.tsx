import React, { useState } from "react";
import { Search, Monitor, Smartphone, Sparkles } from "lucide-react";

export interface GoogleSerpPreviewProps {
  canonicalUrl: string;
  titleAr: string;
  descAr: string;
  titleLength: number;
  isTitleOptimal: boolean;
}

export const GoogleSerpPreview: React.FC<GoogleSerpPreviewProps> = ({
  canonicalUrl,
  titleAr,
  descAr,
  titleLength,
  isTitleOptimal,
}) => {
  const [serpDevice, setSerpDevice] = useState<"desktop" | "mobile">("desktop");

  return (
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
  );
};

