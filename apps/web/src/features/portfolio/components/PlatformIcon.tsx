import React from "react";
import {
  Globe,
  Smartphone,
  Monitor,
  Terminal,
  Store,
  Laptop
} from "lucide-react";

export interface PlatformIconProps {
  platform: string;
  className?: string;
  showTooltip?: boolean;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  className = "w-4 h-4",
  showTooltip = true
}) => {
  const norm = platform.toLowerCase().trim();

  let labelAr = "ويب";
  let labelEn = "Web";
  let IconNode: React.ReactNode = <Globe className={className} />;

  switch (norm) {
    case "android":
      labelAr = "أندرويد";
      labelEn = "Android";
      IconNode = (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Android antenna and head */}
          <line x1="7" y1="4" x2="8.5" y2="7" />
          <line x1="17" y1="4" x2="15.5" y2="7" />
          <path d="M5 11a7 7 0 0 1 14 0v9H5z" />
          <circle cx="9" cy="14" r="1" fill="currentColor" />
          <circle cx="15" cy="14" r="1" fill="currentColor" />
        </svg>
      );
      break;

    case "ios":
      labelAr = "آيفون iOS";
      labelEn = "iOS";
      IconNode = <Smartphone className={className} />;
      break;

    case "macos":
      labelAr = "ماك macOS";
      labelEn = "macOS";
      IconNode = <Laptop className={className} />;
      break;

    case "windows":
      labelAr = "ويندوز Windows";
      labelEn = "Windows";
      IconNode = (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 5.5L10 4.5V11H3V5.5Z" />
          <path d="M11 4.3L21 3V11H11V4.3Z" />
          <path d="M3 13H10V19.5L3 18.5V13Z" />
          <path d="M11 13H21V21L11 19.7V13Z" />
        </svg>
      );
      break;

    case "linux":
      labelAr = "لينكس Linux";
      labelEn = "Linux";
      IconNode = <Terminal className={className} />;
      break;

    case "pos_terminals":
    case "pos":
      labelAr = "محطات نقاط البيع POS";
      labelEn = "POS Terminals";
      IconNode = <Store className={className} />;
      break;

    case "web":
    default:
      labelAr = "الويب ومتصفحات الإنترنت";
      labelEn = "Web";
      IconNode = <Globe className={className} />;
      break;
  }

  return (
    <span
      data-testid={`platform-icon-${norm}`}
      title={showTooltip ? `${labelAr} / ${labelEn}` : undefined}
      className="inline-flex items-center justify-center transition-transform hover:scale-110"
    >
      {IconNode}
    </span>
  );
};
