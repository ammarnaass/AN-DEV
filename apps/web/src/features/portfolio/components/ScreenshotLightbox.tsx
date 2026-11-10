import React, { useEffect } from "react";
import { ProjectGalleryItem } from "@andev/shared";
import { useI18n } from "../../../lib/i18n";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export interface ScreenshotLightboxProps {
  items: ProjectGalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const { locale, isRtl } = useI18n();
  const currentItem = items[currentIndex];

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (isRtl) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (isRtl) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, isRtl, onClose]);

  if (!currentItem) return null;

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onNavigate(nextIdx);
  };

  const caption = locale === "ar"
    ? currentItem.caption_ar || currentItem.caption_en || ""
    : currentItem.caption_en || currentItem.caption_ar || "";

  return (
    <div
      data-testid="screenshot-lightbox"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="w-full flex items-center justify-between pb-3 border-b border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-white/80 font-mono text-xs">
          <span className="px-2 py-1 rounded bg-white/10">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="truncate max-w-sm font-semibold">{caption}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={locale === "ar" ? "إغلاق" : "Close"}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div
        className="flex-1 w-full flex items-center justify-center relative p-2"
        onClick={e => e.stopPropagation()}
      >
        {items.length > 1 && (
          <button
            type="button"
            onClick={isRtl ? handleNext : handlePrev}
            aria-label="Previous"
            className="absolute start-2 sm:start-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md active:scale-90"
          >
            {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
        )}

        <img
          src={currentItem.url}
          alt={caption || "App Screenshot"}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform"
        />

        {items.length > 1 && (
          <button
            type="button"
            onClick={isRtl ? handlePrev : handleNext}
            aria-label="Next"
            className="absolute end-2 sm:end-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md active:scale-90"
          >
            {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Bottom Bar Indicator */}
      <div
        className="w-full flex items-center justify-center pt-2"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 overflow-x-auto max-w-lg p-2 rounded-xl bg-white/5 border border-white/10">
          {items.map((it, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate(idx)}
              className={`w-12 h-8 rounded overflow-hidden border transition-all shrink-0 ${
                idx === currentIndex
                  ? "border-secondary ring-2 ring-secondary/50 scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={it.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
