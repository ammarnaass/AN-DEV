import React from "react";
import { Search } from "lucide-react";

interface SettingsSeoSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsSeoSection: React.FC<SettingsSeoSectionProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-5 shadow-sm text-start">
      <div className="flex items-center gap-2 pb-3 border-b border-line">
        <Search className="w-4 h-4 text-secondary" />
        <h2 className="text-base font-bold text-text-primary">إعدادات الـ SEO والظهور الرقمي</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            الشعار الرئيسي (Tagline بالعربية)
          </label>
          <input
            type="text"
            value={settings.tagline_ar || ""}
            onChange={e => onChange("tagline_ar", e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            الشعار الرئيسي (Tagline بالإنجليزية)
          </label>
          <input
            type="text"
            dir="ltr"
            value={settings.tagline_en || ""}
            onChange={e => onChange("tagline_en", e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>
    </div>
  );
};
