import React from "react";
import { PlatformIcon } from "../../portfolio/components/PlatformIcon";
import { Layers, Tag, HardDrive, Download, Globe } from "lucide-react";

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
}

const AVAILABLE_PLATFORMS = [
  { id: "web", label_ar: "ويب / متصفحات", label_en: "Web / PWA" },
  { id: "android", label_ar: "أندرويد", label_en: "Android" },
  { id: "ios", label_ar: "آيفون (iOS)", label_en: "iOS (Apple)" },
  { id: "windows", label_ar: "ويندوز", label_en: "Windows PC" },
  { id: "macos", label_ar: "ماك (macOS)", label_en: "macOS (Apple)" },
  { id: "linux", label_ar: "لينكس", label_en: "Linux" },
  { id: "pos_terminals", label_ar: "أجهزة الكاشير POS", label_en: "POS Terminals" }
];

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
  onEnableLivePreviewChange
}) => {
  const togglePlatform = (platformId: string) => {
    if (platforms.includes(platformId)) {
      onPlatformsChange(platforms.filter(p => p !== platformId));
    } else {
      onPlatformsChange([...platforms, platformId]);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn text-start">
      {/* App Type, Version, and Size in a 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Project Type */}
        <div className="space-y-1">
          <label
            htmlFor="specs-project-type"
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold"
          >
            <Layers className="w-3.5 h-3.5 text-secondary" />
            <span>نوع التطبيق (Project Type) *</span>
          </label>
          <select
            id="specs-project-type"
            value={projectType}
            onChange={e => onTypeChange(e.target.value as any)}
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-semibold focus:outline-none focus:border-secondary"
          >
            <option value="web">منصة ويب / SaaS (Web App)</option>
            <option value="mobile">تطبيق هواتف ذكية (Mobile App)</option>
            <option value="desktop">برنامج حاسوب مكتبي (Desktop App)</option>
            <option value="pos">نظام كاشير ونقاط بيع (POS System)</option>
            <option value="system">نظام مؤسسي سحابي (Enterprise System)</option>
          </select>
        </div>

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
            <span>حجم الحزمة (Package Size)</span>
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

      {/* Supported Platforms Multi-Select Grid */}
      <div className="space-y-2 pt-2 border-t border-line">
        <label className="block text-xs font-mono text-text-muted font-semibold">
          منصات التشغيل المدعومة (Supported Platforms)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {AVAILABLE_PLATFORMS.map(p => {
            const isChecked = platforms.includes(p.id);
            return (
              <label
                key={p.id}
                data-testid={`platform-checkbox-${p.id}`}
                onClick={() => togglePlatform(p.id)}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                  isChecked
                    ? "bg-secondary/15 border-secondary text-text-primary shadow-sm"
                    : "bg-surface-container border-line text-text-muted hover:border-secondary/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="hidden"
                />
                <PlatformIcon platform={p.id} className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-xs font-medium truncate">{p.label_ar}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Download URL & Live Preview Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
        <div className="space-y-1">
          <label
            htmlFor="specs-download-url"
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold"
          >
            <Download className="w-3.5 h-3.5 text-secondary" />
            <span>رابط التنزيل المباشر (Download URL)</span>
          </label>
          <input
            id="specs-download-url"
            type="text"
            value={downloadUrl}
            onChange={e => onDownloadUrlChange(e.target.value)}
            placeholder="https://.../setup.exe أو ملف apk"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="flex items-center gap-3 pt-6">
          <label className="flex items-center gap-2.5 text-xs font-semibold cursor-pointer select-none">
            <input
              type="checkbox"
              checked={enableLivePreview}
              onChange={e => onEnableLivePreviewChange(e.target.checked)}
              className="rounded border-line text-secondary focus:ring-secondary"
            />
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-secondary" />
              <span>تفعيل بوابة المعاينة الحية التفاعلية (Live Iframe Gateway)</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
