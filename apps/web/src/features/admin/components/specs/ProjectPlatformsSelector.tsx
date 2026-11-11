import React from "react";
import { PlatformIcon } from "../../../portfolio/components/PlatformIcon";
import { Check } from "lucide-react";

export const AVAILABLE_PLATFORMS = [
  { id: "web", label_ar: "ويب / متصفحات", label_en: "Web / PWA" },
  { id: "android", label_ar: "أندرويد", label_en: "Android" },
  { id: "ios", label_ar: "آيفون (iOS)", label_en: "iOS (Apple)" },
  { id: "windows", label_ar: "ويندوز", label_en: "Windows PC" },
  { id: "macos", label_ar: "ماك (macOS)", label_en: "macOS (Apple)" },
  { id: "linux", label_ar: "لينكس", label_en: "Linux" },
  { id: "pos_terminals", label_ar: "أجهزة الكاشير POS", label_en: "POS Terminals" }
] as const;

export interface ProjectPlatformsSelectorProps {
  currentPlatforms: string[];
  onTogglePlatform: (platformId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export const ProjectPlatformsSelector: React.FC<ProjectPlatformsSelectorProps> = ({
  currentPlatforms,
  onTogglePlatform,
  onSelectAll,
  onClearAll,
}) => {
  return (
    <div className="space-y-2 pt-2 border-t border-line text-start">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-mono text-text-muted font-semibold">
          منصات التشغيل المدعومة (Supported Platforms)
        </label>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-secondary">
            {currentPlatforms.length} منصات محددة
          </span>
          <span className="text-text-muted text-[10px]">|</span>
          <button
            type="button"
            onClick={onSelectAll}
            className="text-[11px] font-mono text-secondary hover:underline cursor-pointer"
          >
            تحديد الكل
          </button>
          <span className="text-text-muted text-[10px]">|</span>
          <button
            type="button"
            onClick={onClearAll}
            className="text-[11px] font-mono text-text-muted hover:text-err cursor-pointer"
          >
            إلغاء التحديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {AVAILABLE_PLATFORMS.map(p => {
          const isChecked = currentPlatforms.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              data-testid={`platform-checkbox-${p.id}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTogglePlatform(p.id);
              }}
              className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border text-start transition-all cursor-pointer select-none ${
                isChecked
                  ? "bg-secondary/15 border-secondary text-text-primary shadow-sm ring-1 ring-secondary/30"
                  : "bg-surface-container border-line text-text-muted hover:border-secondary/40 hover:text-text-primary"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 pointer-events-none">
                <PlatformIcon platform={p.id} className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-xs font-semibold truncate">{p.label_ar}</span>
              </div>
              <div
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border pointer-events-none transition-colors ${
                  isChecked
                    ? "bg-secondary text-white border-secondary"
                    : "border-line bg-surface text-transparent"
                }`}
              >
                <Check className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

