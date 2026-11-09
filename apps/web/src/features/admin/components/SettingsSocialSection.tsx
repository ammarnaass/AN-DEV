import React from "react";
import { Share2 } from "lucide-react";

interface SettingsSocialSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsSocialSection: React.FC<SettingsSocialSectionProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-5 shadow-sm text-start">
      <div className="flex items-center gap-2 pb-3 border-b border-line">
        <Share2 className="w-4 h-4 text-secondary" />
        <h2 className="text-base font-bold text-text-primary">روابط الشبكات والمجتمعات التقنية</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            رابط منظمة GitHub
          </label>
          <input
            type="text"
            dir="ltr"
            value={settings.github || ""}
            onChange={e => onChange("github", e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            صفحة LinkedIn الرسمية
          </label>
          <input
            type="text"
            dir="ltr"
            value={settings.linkedin || ""}
            onChange={e => onChange("linkedin", e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>
    </div>
  );
};

