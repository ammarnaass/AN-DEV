import React, { useState } from "react";
import { useI18n } from "../../../lib/i18n";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Maximize2,
  Minimize2,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

interface ProjectLiveGatewayProps {
  liveUrl: string;
  title: string;
  coverImage?: string;
  className?: string;
}

export const ProjectLiveGateway: React.FC<ProjectLiveGatewayProps> = ({
  liveUrl,
  title,
  coverImage,
  className = ""
}) => {
  const { locale } = useI18n();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasFramingNotice, setHasFramingNotice] = useState<boolean>(false);

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey(prev => prev + 1);
  };

  const getContainerDimensions = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[390px] h-[720px] rounded-[36px] border-[6px] border-line shadow-2xl";
      case "tablet":
        return "max-w-[768px] h-[680px] rounded-2xl border border-line shadow-xl";
      case "desktop":
      default:
        return "w-full max-w-full h-[650px] rounded-xl border border-line shadow-lg";
    }
  };

  return (
    <section
      className={`w-full space-y-4 text-start transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
          : className
      }`}
    >
      {/* Gateway Header / Toolbar */}
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
            onClick={handleReload}
            className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary hover:border-secondary transition-colors"
            title={locale === "ar" ? "إعادة تحميل المعاينة" : "Reload preview"}
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(prev => !prev)}
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

      {/* Main Preview Screen */}
      <div className="w-full flex justify-center py-2">
        <div
          data-testid="gateway-viewport-container"
          className={`w-full relative bg-surface-container transition-all duration-300 overflow-hidden flex flex-col ${getContainerDimensions()}`}
        >
          {/* Mobile Shell Notch Accent */}
          {viewport === "mobile" && (
            <div className="w-full pt-2 pb-1 bg-surface flex justify-center items-center shrink-0">
              <div className="w-24 h-4 rounded-full bg-black/60 flex items-center justify-end px-2">
                <span className="w-2 h-2 rounded-full bg-surface-container" />
              </div>
            </div>
          )}

          {/* Tablet & Desktop Header Mock Bar */}
          {viewport !== "mobile" && (
            <div className="w-full px-4 py-2.5 bg-surface border-b border-line flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="px-4 py-1 rounded-md bg-surface-container border border-line text-[11px] font-mono text-text-muted truncate max-w-sm">
                https://{liveUrl.replace(/^https?:\/\//, "")}
              </div>
              <div className="w-8" />
            </div>
          )}

          {/* Iframe Viewport */}
          <div className="flex-1 w-full h-full relative bg-background">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface/80 backdrop-blur-sm animate-fadeIn">
                <div className="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-text-muted">
                  {locale === "ar" ? "جاري تحميل المنصة الحية..." : "Loading live platform..."}
                </span>
              </div>
            )}

            <iframe
              key={reloadKey}
              data-testid="gateway-iframe"
              src={liveUrl}
              title={`${title} Live Platform Sandbox`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasFramingNotice(true);
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>

      {/* Helpful CSP / Framing Notice Banner */}
      <div className="p-3 rounded-xl bg-surface-container/60 border border-line text-xs flex items-center justify-between gap-3 text-text-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
          <span>
            {locale === "ar"
              ? "بيئة المعاينة تعمل بنمط محمي. إذا منعت سياسة أمان الموقع (CSP) التضمين، يمكنك دائماً تشغيله بضغطة زر في نافذة مستقلة."
              : "Sandboxed interactive environment. If third-party CSP policies prevent framing, you can launch directly in an isolated tab."}
          </span>
        </div>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline font-semibold whitespace-nowrap"
        >
          {locale === "ar" ? "تشغيل مباشر" : "Launch Directly"}
        </a>
      </div>
    </section>
  );
};
