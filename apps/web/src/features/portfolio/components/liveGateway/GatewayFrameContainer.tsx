import React from "react";
import { useI18n } from "../../../../lib/i18n";

export interface GatewayFrameContainerProps {
  viewport: "desktop" | "tablet" | "mobile";
  liveUrl: string;
  title: string;
  coverImage?: string;
  reloadKey: number;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  hasFramingNotice: boolean;
  setHasFramingNotice: (val: boolean) => void;
}

export const GatewayFrameContainer: React.FC<GatewayFrameContainerProps> = ({
  viewport,
  liveUrl,
  title,
  coverImage,
  reloadKey,
  isLoading,
  setIsLoading,
  hasFramingNotice,
  setHasFramingNotice,
}) => {
  const { locale } = useI18n();

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

        {/* Iframe Viewport or Fallback */}
        <div className="flex-1 w-full h-full relative bg-background">
          {hasFramingNotice && coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

