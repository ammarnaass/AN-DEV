import React from "react";
import { Tag, HardDrive } from "lucide-react";

export interface ProjectReleaseInfoFieldsProps {
  version: string;
  onVersionChange: (val: string) => void;
  packageSize: string;
  onPackageSizeChange: (val: string) => void;
}

export const ProjectReleaseInfoFields: React.FC<ProjectReleaseInfoFieldsProps> = ({
  version,
  onVersionChange,
  packageSize,
  onPackageSizeChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line text-start">
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
  );
};

