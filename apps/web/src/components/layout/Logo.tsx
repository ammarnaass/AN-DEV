import React from "react";
import { usePublicSettings } from "../../hooks/usePublicSettings";

export interface LogoProps {
  className?: string;
  size?: number;
  iconOnly?: boolean;
  showTagline?: boolean;
  // Overrides for live preview in admin settings
  customImage?: string;
  namePrefix?: string;
  nameSuffix?: string;
  tagline?: string;
  displayMode?: "full" | "icon_text" | "image_only" | "icon_only";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 38,
  iconOnly = false,
  showTagline = true,
  customImage,
  namePrefix,
  nameSuffix,
  tagline,
  displayMode,
}) => {
  const { settings } = usePublicSettings();

  const logoSrc = customImage !== undefined
    ? customImage || "/brand/logo-squircle.webp"
    : settings.logo_image || "/brand/logo-squircle.webp";

  const prefix = namePrefix !== undefined
    ? namePrefix
    : settings.logo_name_prefix || "AN";

  const suffix = nameSuffix !== undefined
    ? nameSuffix
    : settings.logo_name_suffix || "DEV";

  const finalTagline = tagline !== undefined
    ? tagline
    : settings.logo_tagline || "CODE · CREATE · SOLVE";

  const effectiveDisplayMode = displayMode || (settings.logo_display_mode as LogoProps["displayMode"]) || "full";

  // If display mode is image_only, render image directly
  if (effectiveDisplayMode === "image_only") {
    return (
      <div
        dir="ltr"
        className={`inline-flex items-center select-none text-start ${className}`}
      >
        <img
          src={logoSrc}
          alt={`${prefix} ${suffix}`}
          style={{ height: size, maxHeight: size }}
          className="w-auto max-w-[180px] object-contain transition-transform duration-200 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logo.svg";
          }}
        />
      </div>
    );
  }

  const isIconOnly = iconOnly || effectiveDisplayMode === "icon_only";
  const shouldShowTagline = showTagline && effectiveDisplayMode === "full";

  return (
    <div
      dir="ltr"
      className={`inline-flex items-center gap-3 select-none text-start ${className}`}
    >
      {/* Official Squircle Brand Icon */}
      <div
        style={{ width: size, height: size }}
        className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-glow border border-line bg-surface flex items-center justify-center transition-transform duration-200 hover:scale-105"
      >
        <img
          src={logoSrc}
          alt={`${prefix} ${suffix} Monogram`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logo.svg";
          }}
        />
      </div>

      {/* Typography Lockup: AN DEV & Tagline */}
      {!isIconOnly && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5 font-sans font-black tracking-tight">
            <span className="text-ink text-xl sm:text-2xl font-black">{prefix}</span>
            <span className="text-accent text-xl sm:text-2xl font-black">{suffix}</span>
          </div>
          {shouldShowTagline && (
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-mute uppercase tracking-[0.2em] font-sans font-semibold pt-1">
              {finalTagline.split(/[•·-]/).map((part, idx, arr) => (
                <React.Fragment key={idx}>
                  <span>{part.trim()}</span>
                  {idx < arr.length - 1 && <span className="text-accent font-bold">•</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
