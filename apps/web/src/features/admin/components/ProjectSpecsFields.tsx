import React from "react";
import { PlatformIcon } from "../../portfolio/components/PlatformIcon";
import { Layers, Tag, HardDrive, Globe, Smartphone, Laptop, Store, Check } from "lucide-react";
import { WebSpecsEditor } from "./specs/WebSpecsEditor";
import { MobileSpecsEditor } from "./specs/MobileSpecsEditor";
import { DesktopSpecsEditor } from "./specs/DesktopSpecsEditor";
import { PosSpecsEditor } from "./specs/PosSpecsEditor";
import { ErpSpecsEditor } from "./specs/ErpSpecsEditor";

export interface ProjectSpecsFieldsProps {
  projectType: "web" | "mobile" | "desktop" | "pos" | "system";
  onTypeChange: (val: "web" | "mobile" | "desktop" | "pos" | "system") => void;
  version: string;
  onVersionChange: (val: string) => void;
  packageSize: string;
  onPackageSizeChange: (val: string) => void;
  platforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
  downloadUrl: string;
  onDownloadUrlChange: (val: string) => void;
  enableLivePreview: boolean;
  onEnableLivePreviewChange: (val: boolean) => void;
  typeSpecs?: Record<string, any>;
  onTypeSpecsChange?: (specs: Record<string, any>) => void;
  liveUrl?: string;
  onLiveUrlChange?: (val: string) => void;
}

const PROJECT_TYPE_OPTIONS: Array<{
  id: "web" | "mobile" | "desktop" | "pos" | "system";
  label_ar: string;
  label_en: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "web", label_ar: "منصة ويب / SaaS", label_en: "Web App", icon: Globe },
  { id: "mobile", label_ar: "تطبيق هواتف", label_en: "Mobile App", icon: Smartphone },
  { id: "desktop", label_ar: "برنامج مكتبي", label_en: "Desktop App", icon: Laptop },
  { id: "pos", label_ar: "نظام كاشير POS", label_en: "POS System", icon: Store },
  { id: "system", label_ar: "نظام مؤسسي ERP", label_en: "Enterprise System", icon: Layers }
];

const DEFAULT_TYPE_PLATFORMS: Record<string, string[]> = {
  web: ["web"],
  mobile: ["android", "ios"],
  desktop: ["windows", "macos", "linux"],
  pos: ["windows", "android", "pos_terminals"],
  system: ["web", "windows", "linux"]
};

const AVAILABLE_PLATFORMS = [
  { id: "web", label_ar: "ويب / متصفحات", label_en: "Web / PWA" },
  { id: "android", label_ar: "أندرويد", label_en: "Android" },
  { id: "ios", label_ar: "آيفون (iOS)", label_en: "iOS (Apple)" },
  { id: "windows", label_ar: "ويندوز", label_en: "Windows PC" },
  { id: "macos", label_ar: "ماك (macOS)", label_en: "macOS (Apple)" },
  { id: "linux", label_ar: "لينكس", label_en: "Linux" },
  { id: "pos_terminals", label_ar: "أجهزة الكاشير POS", label_en: "POS Terminals" }
];

function parsePlatforms(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    if (val.trim()) return [val.trim()];
  }
  return ["web"];
}

export const ProjectSpecsFields: React.FC<ProjectSpecsFieldsProps> = ({
  projectType,
  onTypeChange,
  version,
  onVersionChange,
  packageSize,
  onPackageSizeChange,
  platforms,
  onPlatformsChange,
  downloadUrl,
  onDownloadUrlChange,
  enableLivePreview,
  onEnableLivePreviewChange,
  typeSpecs = {},
  onTypeSpecsChange = () => {},
  liveUrl = "",
  onLiveUrlChange = () => {}
}) => {
  const currentPlatforms = parsePlatforms(platforms);

  const handleTypeSelect = (newType: "web" | "mobile" | "desktop" | "pos" | "system") => {
    onTypeChange(newType);
    // Auto-preselect logical platforms for this type if none or only default web was set
    const suggested = DEFAULT_TYPE_PLATFORMS[newType] || ["web"];
    onPlatformsChange(suggested);
  };

  const togglePlatform = (platformId: string) => {
    const list = parsePlatforms(platforms);
    if (list.includes(platformId)) {
      onPlatformsChange(list.filter(p => p !== platformId));
    } else {
      onPlatformsChange([...list, platformId]);
    }
  };

  const selectAllPlatforms = () => {
    onPlatformsChange(AVAILABLE_PLATFORMS.map(p => p.id));
  };

  const clearAllPlatforms = () => {
    onPlatformsChange([]);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-start">
      {/* 1. Project Type Selector - Visual Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="specs-project-type"
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold"
          >
            <Layers className="w-3.5 h-3.5 text-secondary" />
            <span>نوع التطبيق (Project Type) *</span>
          </label>
          <span className="text-[11px] font-mono text-secondary font-bold">
            {PROJECT_TYPE_OPTIONS.find(o => o.id === projectType)?.label_ar}
          </span>
        </div>

        {/* Quick-Select Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PROJECT_TYPE_OPTIONS.map(opt => {
            const IconComponent = opt.icon;
            const isSelected = projectType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleTypeSelect(opt.id)}
                className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-secondary/15 border-secondary text-text-primary shadow-sm ring-1 ring-secondary/30 font-bold"
                    : "bg-surface-container border-line text-text-muted hover:border-secondary/40 hover:text-text-primary"
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? "text-secondary" : "text-text-muted"}`} />
                <span className="text-[11px] leading-tight truncate w-full">{opt.label_ar}</span>
              </button>
            );
          })}
        </div>

        {/* Hidden select for standard form accessibility and testing */}
        <select
          id="specs-project-type"
          value={projectType}
          onChange={e => handleTypeSelect(e.target.value as any)}
          className="sr-only"
        >
          {PROJECT_TYPE_OPTIONS.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.label_ar} ({opt.label_en})
            </option>
          ))}
        </select>
      </div>

      {/* 2. Dynamic Domain-Specific Editor */}
      <div className="pt-1">
        {projectType === "web" && (
          <WebSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
            liveUrl={liveUrl}
            onLiveUrlChange={onLiveUrlChange}
            enableLivePreview={enableLivePreview}
            onEnableLivePreviewChange={onEnableLivePreviewChange}
          />
        )}

        {projectType === "mobile" && (
          <MobileSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
            packageSize={packageSize}
            onPackageSizeChange={onPackageSizeChange}
            downloadUrl={downloadUrl}
            onDownloadUrlChange={onDownloadUrlChange}
          />
        )}

        {projectType === "desktop" && (
          <DesktopSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
            packageSize={packageSize}
            onPackageSizeChange={onPackageSizeChange}
            downloadUrl={downloadUrl}
            onDownloadUrlChange={onDownloadUrlChange}
          />
        )}

        {projectType === "pos" && (
          <PosSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
          />
        )}

        {projectType === "system" && (
          <ErpSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
          />
        )}
      </div>

      {/* 3. Common Release Info (Version & Package Size) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
        {/* Version */}
        <div className="space-y-1">
          <label
            htmlFor="specs-version"
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold"
          >
            <Tag className="w-3.5 h-3.5 text-secondary" />
            <span>رقم الإصدار (Version)</span>
          </label>
          <input
            id="specs-version"
            type="text"
            value={version}
            onChange={e => onVersionChange(e.target.value)}
            placeholder="مثال: v2.4.0"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Package Size */}
        <div className="space-y-1">
          <label
            htmlFor="specs-package-size"
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold"
          >
            <HardDrive className="w-3.5 h-3.5 text-secondary" />
            <span>حجم الحزمة / التثبيت (Package Size)</span>
          </label>
          <input
            id="specs-package-size"
            type="text"
            value={packageSize}
            onChange={e => onPackageSizeChange(e.target.value)}
            placeholder="مثال: 48 MB أو 120 KB gzip"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* 4. Supported Platforms Multi-Select Buttons */}
      <div className="space-y-2 pt-2 border-t border-line">
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
              onClick={selectAllPlatforms}
              className="text-[11px] font-mono text-secondary hover:underline cursor-pointer"
            >
              تحديد الكل
            </button>
            <span className="text-text-muted text-[10px]">|</span>
            <button
              type="button"
              onClick={clearAllPlatforms}
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
                  togglePlatform(p.id);
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
    </div>
  );
};
