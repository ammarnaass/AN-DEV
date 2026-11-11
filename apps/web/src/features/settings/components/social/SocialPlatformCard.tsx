import React from "react";
import { ExternalLink } from "lucide-react";
import { SocialPlatformDef } from "../../constants/social.constants";

export interface SocialPlatformCardProps {
  platform: SocialPlatformDef;
  value: string;
  onChange: (key: string, val: string) => void;
}

export const SocialPlatformCard: React.FC<SocialPlatformCardProps> = ({
  platform,
  value,
  onChange,
}) => {
  const isPopulated = !!value.trim();

  return (
    <div
      className={`p-4 rounded-xl border transition-all text-start ${
        isPopulated
          ? "bg-surface border-line-hover shadow-sm"
          : "bg-surface-container/50 border-line opacity-85 hover:opacity-100"
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-line/60">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
            style={{
              backgroundColor: platform.badgeBg,
              color: platform.color,
            }}
          >
            {platform.icon}
          </div>
          <div>
            <span className="text-xs font-bold text-text-primary block">
              {platform.nameAr}
            </span>
            <span className="text-[10px] font-mono text-text-muted">
              {platform.nameEn}
            </span>
          </div>
        </div>

        {isPopulated && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-status-ok font-semibold">
              معروض
            </span>
            <a
              href={value.startsWith("http") ? value : `https://${value}`}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded text-text-muted hover:text-secondary transition-colors"
              title="فتح الرابط في تبويب جديد"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          dir="ltr"
          placeholder={platform.placeholder}
          value={value}
          onChange={(e) => onChange(platform.key, e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono focus:outline-none focus:border-secondary transition-all"
        />
      </div>
    </div>
  );
};

