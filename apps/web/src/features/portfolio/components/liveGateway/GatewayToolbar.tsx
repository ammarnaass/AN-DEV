import React from "react";
import { useI18n } from "../../../../lib/i18n";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Maximize2,
  Minimize2
} from "lucide-react";

export interface GatewayToolbarProps {
  liveUrl: string;
  viewport: "desktop" | "tablet" | "mobile";
  setViewport: (vp: "desktop" | "tablet" | "mobile") => void;
  isLoading: boolean;
  onReload: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const GatewayToolbar: React.FC<GatewayToolbarProps> = ({
  liveUrl,
  viewport,
  setViewport,
  isLoading,
  onReload,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { locale } = useI18n();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-line bg-surface/90 backdrop-blur-md shadow-card">
      {/* Left: Indicator & URL Bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-line font-mono text-xs text-text-primary">
          <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
          <span className="font-semibold text-secondary">
            {locale === "ar" ? "بوابة المعاينة الحية" : "Live Preview Gateway"}
          </span>
        </div>

        <span className="hidden sm:inline-block text-xs font-mono text-text-muted truncate max-w-xs">
          {liveUrl}
        </span>
      </div>

      {/* Center: Viewport Switcher */}
      <div className="flex items-center p-1 rounded-xl bg-surface-container border border-line gap-1">
        <button
          type="button"
          data-testid="viewport-btn-desktop"
          onClick={() => setViewport("desktop")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewport === "desktop"
              ? "bg-primary-container text-white shadow-sm"
              : "text-text-muted hover:text-text-primary"
          }`}
          title={locale === "ar" ? "شاشة سطح المكتب (حاسوب)" : "Desktop Viewport"}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{locale === "ar" ? "حاسوب" : "Desktop"}</span>
        </button>

        <button
          type="button"
          data-testid="viewport-btn-tablet"
          onClick={() => setViewport("tablet")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewport === "tablet"
              ? "bg-primary-container text-white shadow-sm"
              : "text-text-muted hover:text-text-primary"
          }`}
          title={locale === "ar" ? "شاشة لوحية (تابلت)" : "Tablet Viewport"}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{locale === "ar" ? "تابلت" : "Tablet"}</span>
        </button>

        <button
          type="button"
          data-testid="viewport-btn-mobile"
          onClick={() => setViewport("mobile")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewport === "mobile"
              ? "bg-primary-container text-white shadow-sm"
              : "text-text-muted hover:text-text-primary"
          }`}
          title={locale === "ar" ? "شاشة هاتف ذكي" : "Mobile Viewport"}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{locale === "ar" ? "جوال" : "Mobile"}</span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReload}
          className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary hover:border-secondary transition-colors"
          title={locale === "ar" ? "إعادة تحميل المعاينة" : "Reload preview"}
        >
          <RotateCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>

        <button
          type="button"
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary hover:border-secondary transition-colors"
          title={
            isFullscreen
              ? locale === "ar"
                ? "إنهاء وضع ملء الشاشة"
                : "Exit Fullscreen"
              : locale === "ar"
              ? "عرض بملء الشاشة"
              : "Expand Fullscreen"
          }
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-elevated border border-line hover:border-secondary text-xs font-semibold text-text-primary hover:text-secondary transition-all"
        >
          <span>{locale === "ar" ? "فتح في نافذة جديدة" : "Open in New Tab"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

