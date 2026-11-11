import React from "react";
import { Share2, CheckCircle2 } from "lucide-react";
import { SOCIAL_PLATFORMS } from "../../constants/social.constants";
import { SocialPlatformCard } from "./SocialPlatformCard";
import { SocialRibbonPreview } from "./SocialRibbonPreview";

export interface SettingsSocialSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsSocialSection: React.FC<SettingsSocialSectionProps> = ({
  settings,
  onChange,
}) => {
  const activeCount = SOCIAL_PLATFORMS.filter(
    (platform) => !!settings[platform.key]?.trim()
  ).length;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-6 shadow-sm text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-secondary/15 text-secondary border border-secondary/20">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              روابط شبكات التواصل الاجتماعي والمجتمعات
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              إدارة كافة منصات التواصل وحسابات الشركة الرسمية المعروضة تلقائياً في تذييل الموقع وصفحة التواصل.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-surface-container border border-line text-secondary">
            <CheckCircle2 className="w-3.5 h-3.5 text-status-ok" />
            <span>{activeCount} منصات مفعلة</span>
          </span>
        </div>
      </div>

      {/* Grid of All Supported Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOCIAL_PLATFORMS.map((platform) => (
          <SocialPlatformCard
            key={platform.key}
            platform={platform}
            value={settings[platform.key] || ""}
            onChange={onChange}
          />
        ))}
      </div>

      {/* Live Social Ribbon Preview */}
      <SocialRibbonPreview settings={settings} activeCount={activeCount} />
    </div>
  );
};

