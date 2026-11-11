import React from "react";
import { Globe } from "lucide-react";
import { SOCIAL_PLATFORMS } from "../../constants/social.constants";

export interface SocialRibbonPreviewProps {
  settings: Record<string, string>;
  activeCount: number;
}

export const SocialRibbonPreview: React.FC<SocialRibbonPreviewProps> = ({
  settings,
  activeCount,
}) => {
  return (
    <div className="p-4 rounded-xl bg-surface-container/70 border border-line space-y-3 text-start">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-secondary" />
          معاينة شريط التواصل كما يظهر للزوار في أسفل الموقع:
        </span>
        <span className="text-[11px] font-mono text-text-muted">
          {activeCount === 0 ? "لا توجد روابط مضافة" : `${activeCount} أيقونات نشطة`}
        </span>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line flex flex-wrap items-center gap-3">
        {activeCount === 0 ? (
          <p className="text-xs text-text-muted italic">
            أدخل روابط حساباتك في الأعلى لتبدأ الأيقونات التفاعلية بالظهور هنا وفي تذييل الموقع.
          </p>
        ) : (
          SOCIAL_PLATFORMS.filter((p) => !!settings[p.key]?.trim()).map((p) => {
            const url = settings[p.key] || "";
            return (
              <a
                key={p.key}
                href={url.startsWith("http") ? url : `https://${url}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: p.color }}
                className="p-2.5 rounded-xl bg-surface-container border border-line hover:border-secondary transition-transform hover:-translate-y-0.5 flex items-center gap-2 shadow-sm"
                title={p.nameAr}
              >
                {p.icon}
                <span className="text-xs font-mono font-semibold text-text-primary">
                  {p.nameEn.split(" ")[0]}
                </span>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
};

