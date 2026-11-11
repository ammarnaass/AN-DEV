import React from "react";
import { BioLink } from "@andev/shared";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ICON_MAP } from "../constants/bioIcons.constants";
import { getFontFamilyStyle } from "../utils/bioColor.utils";

interface BioLinkCardProps {
  link: BioLink;
  onLinkClick?: (id: number, url: string) => void;
  compact?: boolean;
}

export const BioLinkCard: React.FC<BioLinkCardProps> = ({
  link,
  onLinkClick,
  compact = false,
}) => {
  const isCustomImg =
    link.icon_or_image?.startsWith("http") ||
    link.icon_or_image?.startsWith("data:");
  const isBanner = isCustomImg && link.image_size === "banner";

  const handleClick = (e: React.MouseEvent) => {
    if (onLinkClick && link.id) {
      e.preventDefault();
      onLinkClick(link.id, link.url);
    }
  };

  // Image size styling
  let imgSizeClass = "w-9 h-9";
  if (link.image_size === "sm") imgSizeClass = "w-7 h-7";
  if (link.image_size === "lg") imgSizeClass = "w-12 h-12";

  // Image radius
  let radiusClass = "rounded-xl";
  if (link.image_radius === "full") radiusClass = "rounded-full";
  if (link.image_radius === "none") radiusClass = "rounded-none";

  // Banner Layout
  if (isBanner) {
    return (
      <a
        href={link.url}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full block relative overflow-hidden rounded-2xl border border-line shadow-md group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
          link.is_featured ? "ring-2 ring-secondary ring-offset-2 ring-offset-background" : ""
        }`}
      >
        <div className={compact ? "h-28 w-full relative" : "h-36 sm:h-40 w-full relative"}>
          <img
            src={link.icon_or_image}
            alt={link.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 text-start text-white">
            <span
              className={`font-bold block drop-shadow leading-snug ${
                compact ? "text-sm" : "text-base sm:text-lg"
              } ${getFontFamilyStyle(link.font_family)}`}
            >
              {link.title}
            </span>
            {link.subtitle && (
              <span className="text-xs text-white/80 line-clamp-1 drop-shadow-sm font-sans mt-0.5">
                {link.subtitle}
              </span>
            )}
          </div>
        </div>
      </a>
    );
  }

  // Card Variant Styles
  let cardStyle: React.CSSProperties = {
    color: link.text_color || "#ffffff",
  };
  let cardClasses =
    "w-full p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 text-start transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] group shadow-sm";

  if (link.style_variant === "gradient") {
    cardStyle.background = `linear-gradient(135deg, ${link.gradient_from || "#0d6efd"} 0%, ${
      link.gradient_to || "#00d2ff"
    } 100%)`;
    cardStyle.borderColor = "transparent";
    cardClasses += " border";
  } else if (link.style_variant === "outline") {
    cardStyle.backgroundColor = "transparent";
    cardStyle.borderColor = link.border_color || link.text_color || "#334155";
    cardClasses += " border-2 hover:bg-white/5";
  } else {
    // Solid default
    cardStyle.backgroundColor = link.bg_color || "#1e293b";
    cardStyle.borderColor = link.border_color || "#334155";
    cardClasses += " border";
  }

  return (
    <a
      href={link.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      style={cardStyle}
      className={`${cardClasses} ${link.is_featured ? "ring-2 ring-secondary/80 ring-offset-2 ring-offset-background" : ""}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Leading Media */}
        {isCustomImg ? (
          <img
            src={link.icon_or_image}
            alt=""
            className={`${imgSizeClass} ${radiusClass} object-cover shrink-0 border border-white/10`}
          />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            {ICON_MAP[link.icon_or_image] || <Sparkles className="w-5 h-5 shrink-0" />}
          </div>
        )}

        {/* Text info */}
        <div className="min-w-0 space-y-0.5">
          <div
            className={`font-bold leading-tight truncate ${
              compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
            } ${getFontFamilyStyle(link.font_family)}`}
          >
            {link.title}
          </div>
          {link.subtitle && (
            <div className="text-xs opacity-75 line-clamp-1 font-sans">
              {link.subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Trailing Action Icon */}
      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <ArrowUpRight className="w-4 h-4 rtl:rotate-[-90deg]" />
      </div>
    </a>
  );
};
