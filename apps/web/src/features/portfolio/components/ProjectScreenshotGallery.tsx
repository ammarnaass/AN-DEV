import React, { useState } from "react";
import { ProjectGalleryItem } from "@andev/shared";
import { useI18n } from "../../../lib/i18n";
import { DeviceFrame } from "./DeviceFrame";
import { ScreenshotLightbox } from "./ScreenshotLightbox";
import { Images, Eye } from "lucide-react";

export interface ProjectScreenshotGalleryProps {
  items: ProjectGalleryItem[];
  title: string;
  className?: string;
}

export const ProjectScreenshotGallery: React.FC<ProjectScreenshotGalleryProps> = ({
  items,
  title,
  className = ""
}) => {
  const { locale } = useI18n();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={`w-full space-y-6 text-start ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-surface-container border border-line flex items-center justify-center text-secondary">
            <Images className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              {locale === "ar" ? "واجهات النظام ولقطات الشاشة" : "System Interfaces & Screenshots"}
            </h3>
            <p className="text-xs font-mono text-text-muted">
              {locale === "ar"
                ? "انقر على أي شاشة لمعاينتها بدقة عالية وتكبير كامل"
                : "Click any preview to inspect in high-resolution lightbox"}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-surface-container border border-line font-mono text-xs text-secondary font-semibold">
          {items.length} {locale === "ar" ? "شاشات" : "Screens"}
        </span>
      </div>

      {/* Grid of Device Frames */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {items.map((item, index) => {
          const caption = locale === "ar"
            ? item.caption_ar || item.caption_en || ""
            : item.caption_en || item.caption_ar || "";

          return (
            <div
              key={index}
              data-testid={`gallery-item-${index}`}
              onClick={() => setActiveLightboxIndex(index)}
              className="relative group cursor-pointer"
            >
              <DeviceFrame
                frame={item.device_frame || "browser"}
                caption={caption}
              >
                <img
                  src={item.url}
                  alt={caption || `${title} screenshot ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/uploads/projects/default.webp";
                  }}
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{locale === "ar" ? "تكبير الشاشة" : "Zoom"}</span>
                  </div>
                </div>
              </DeviceFrame>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <ScreenshotLightbox
          items={items}
          currentIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
};
