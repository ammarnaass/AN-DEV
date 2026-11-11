import React, { useState } from "react";
import { BioLink } from "@andev/shared";
import { Sun, Moon } from "lucide-react";
import { BioSocialsRibbon } from "../components/BioSocialsRibbon";
import { BioLinkCard } from "../components/BioLinkCard";
import { isColorDark, adjustBrightness } from "../utils/bioColor.utils";

interface BioLinksLivePreviewProps {
  settings: Record<string, string>;
  links: BioLink[];
}

export const BioLinksLivePreview: React.FC<BioLinksLivePreviewProps> = ({
  settings,
  links,
}) => {
  const [previewDark, setPreviewDark] = useState(true);

  const title = settings.bio_page_title || "AN DEV | وكالة البرمجيات";
  const bio =
    settings.bio_page_bio ||
    "نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية. تواصل معنا أو تصفح أعمالنا وأحدث حلولنا التقنية.";
  const avatar = settings.bio_page_avatar || "/brand/logo-squircle.webp";
  const bgType = settings.bio_page_bg_type || "mesh";
  const bgValue = settings.bio_page_bg_value || "#090d16";

  const effectiveBg = bgValue || "#090d16";
  let previewBgColor: string;
  let previewBgImage: string;

  if (bgType === "color") {
    previewBgColor = previewDark
      ? effectiveBg
      : isColorDark(effectiveBg)
      ? "#f4f7fd"
      : effectiveBg;
    previewBgImage = "none";
  } else if (bgType === "gradient") {
    if (previewDark) {
      const topColor = adjustBrightness(effectiveBg, 22);
      const bottomColor = adjustBrightness(effectiveBg, -15);
      previewBgColor = topColor;
      previewBgImage = `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;
    } else {
      previewBgColor = "#f4f7fd";
      previewBgImage = "linear-gradient(180deg, #ffffff 0%, #e2e8f8 100%)";
    }
  } else {
    previewBgColor = previewDark ? effectiveBg : "#f4f7fd";
    previewBgImage = previewDark
      ? "radial-gradient(circle at 50% 10%, rgba(13, 110, 253, 0.35) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(0, 242, 254, 0.20) 0%, transparent 50%)"
      : "radial-gradient(circle at 50% 10%, rgba(13, 110, 253, 0.10) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(2, 132, 199, 0.08) 0%, transparent 50%)";
  }

  const activeLinks = links.filter((l) => l.is_active);

  return (
    <div className="flex flex-col items-center select-none sticky top-6">
      {/* Dual-Theme Mode Switcher for Preview */}
      <div className="flex items-center justify-between w-[300px] mb-2 px-1">
        <span className="text-[11px] font-mono text-text-muted">وضع المعاينة:</span>
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-container border border-line">
          <button
            type="button"
            onClick={() => setPreviewDark(true)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 ${
              previewDark
                ? "bg-primary-container text-white font-bold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Moon className="w-3 h-3 text-sky-400" />
            <span>مظلم</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewDark(false)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 ${
              !previewDark
                ? "bg-primary-container text-white font-bold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Sun className="w-3 h-3 text-amber-400" />
            <span>مشرق</span>
          </button>
        </div>
      </div>

      {/* Phone Mockup Frame */}
      <div
        className={`w-[300px] h-[610px] rounded-[44px] border-[7px] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between transition-colors ${
          previewDark
            ? "bg-slate-900 border-slate-700"
            : "bg-slate-200 border-slate-300"
        }`}
      >
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        </div>

        {/* Screen Viewport */}
        <div
          dir="rtl"
          className="flex-1 w-full overflow-y-auto px-4 pt-8 pb-6 flex flex-col justify-between text-center relative transition-colors"
          style={{
            backgroundColor: previewBgColor,
            backgroundImage: previewBgImage,
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border shadow-lg border-white/20 bg-slate-800">
              <img
                src={avatar}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/brand/logo-squircle.webp";
                }}
              />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-sm font-bold text-white flex items-center justify-center gap-1">
                <span className="truncate max-w-[200px]">{title}</span>
                <span className="w-3.5 h-3.5 rounded-full bg-secondary text-white text-[9px] flex items-center justify-center">
                  ✓
                </span>
              </h2>
              <p className="text-[11px] text-white/70 line-clamp-2 max-w-[220px]">
                {bio}
              </p>
            </div>

            {/* Social Ribbon */}
            <BioSocialsRibbon settings={settings} />
          </div>

          {/* Links List */}
          <div className="space-y-2 my-4">
            {activeLinks.length === 0 ? (
              <div className="text-[11px] text-white/50 py-4 font-mono">
                لا توجد روابط نشطة للمعاينة.
              </div>
            ) : (
              activeLinks.map((link) => (
                <BioLinkCard key={link.id} link={link} compact={true} />
              ))
            )}
          </div>

          {/* Mini Footer */}
          <div className="text-[10px] text-white/40 font-mono pt-2">
            AN DEV · BIO ENGINE
          </div>
        </div>
      </div>
    </div>
  );
};
