import React, { useState } from "react";
import { BioLink } from "@andev/shared";
import {
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  FolderKanban,
  MessageCircle,
  BookOpen,
  Globe,
  Code2,
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  Send,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

interface BioLinksLivePreviewProps {
  settings: Record<string, string>;
  links: BioLink[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-3.5 h-3.5 shrink-0" />,
  FolderKanban: <FolderKanban className="w-3.5 h-3.5 shrink-0" />,
  MessageCircle: <MessageCircle className="w-3.5 h-3.5 shrink-0" />,
  BookOpen: <BookOpen className="w-3.5 h-3.5 shrink-0" />,
  Globe: <Globe className="w-3.5 h-3.5 shrink-0" />,
  Code2: <Code2 className="w-3.5 h-3.5 shrink-0" />,
  Cpu: <Cpu className="w-3.5 h-3.5 shrink-0" />,
  Layers: <Layers className="w-3.5 h-3.5 shrink-0" />,
  Terminal: <Terminal className="w-3.5 h-3.5 shrink-0" />,
  ShieldCheck: <ShieldCheck className="w-3.5 h-3.5 shrink-0" />,
  Send: <Send className="w-3.5 h-3.5 shrink-0" />,
  Zap: <Zap className="w-3.5 h-3.5 shrink-0" />,
};

const SOCIAL_SVGS: Record<string, { color: string; path: string }> = {
  whatsapp: {
    color: "#25D366",
    path: "M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.108.549 4.167 1.594 5.975L.062 24l6.236-1.636c1.73.944 3.679 1.442 5.733 1.442 6.633 0 12.002-5.367 12.002-11.987S18.664 0 12.031 0z",
  },
  telegram: {
    color: "#229ED9",
    path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z",
  },
  linkedin: {
    color: "#0A66C2",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  github: {
    color: "#8B949E",
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  facebook: {
    color: "#1877F2",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  twitter: {
    color: "#E7E9EA",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  instagram: {
    color: "#E4405F",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  youtube: {
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
};

const isColorDark = (hex: string): boolean => {
  if (!hex || !hex.startsWith("#")) return true;
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 140;
};

const adjustBrightness = (hex: string, percent: number): string => {
  if (!hex || !hex.startsWith("#")) return hex;
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return hex;
  const num = parseInt(clean, 16);
  if (isNaN(num)) return hex;
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
};

export const BioLinksLivePreview: React.FC<BioLinksLivePreviewProps> = ({
  settings,
  links,
}) => {
  const [previewDark, setPreviewDark] = useState(true);

  const title = settings.bio_page_title || "AN DEV | وكالة البرمجيات";
  const bio =
    settings.bio_page_bio ||
    "نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية.";
  const avatar = settings.bio_page_avatar || "/brand/logo-squircle.webp";
  const bgType = settings.bio_page_bg_type || "mesh";
  const bgValue = settings.bio_page_bg_value || "#090d16";

  const activeLinks = links.filter((l) => l.is_active);

  let parsedSocials: Record<string, string> = {};
  if (settings.bio_page_socials) {
    try {
      parsedSocials = JSON.parse(settings.bio_page_socials);
    } catch {
      // ignore
    }
  }
  const resolvedSettings = { ...parsedSocials, ...settings };

  const activeSocialKeys = Object.keys(SOCIAL_SVGS).filter(
    (key) => !!resolvedSettings[key]?.trim()
  );

  // Dynamic preview background
  let previewBgColor: string;
  let previewBgImage: string;

  const effectiveBg = bgValue || "#090d16";

  if (bgType === "color") {
    // 1. SOLID COLOR:
    if (previewDark) {
      previewBgColor = effectiveBg;
    } else {
      previewBgColor = isColorDark(effectiveBg) ? "#f4f7fd" : effectiveBg;
    }
    previewBgImage = "none";
  } else if (bgType === "gradient") {
    // 2. DEEP GRADIENT:
    if (previewDark) {
      const topColor = adjustBrightness(effectiveBg, 22);
      const bottomColor = adjustBrightness(effectiveBg, -15);
      previewBgColor = topColor;
      previewBgImage = `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;
    } else {
      previewBgColor = "#f4f7fd";
      previewBgImage = "linear-gradient(180deg, #ffffff 0%, #e2e8f8 100%)";
    }
  } else {
    // 3. MESH (Glowing cybernetic neon lights):
    if (previewDark) {
      previewBgColor = effectiveBg;
      previewBgImage =
        "radial-gradient(circle at 50% 10%, rgba(13, 110, 253, 0.35) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(0, 242, 254, 0.20) 0%, transparent 50%)";
    } else {
      previewBgColor = "#f4f7fd";
      previewBgImage =
        "radial-gradient(circle at 50% 10%, rgba(13, 110, 253, 0.10) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(2, 132, 199, 0.08) 0%, transparent 50%)";
    }
  }

  return (
    <div className="flex flex-col items-center select-none sticky top-6">
      {/* Dual-Theme Mode Switcher for Preview */}
      <div className="flex items-center justify-between w-[300px] mb-2 px-1">
        <span className="text-[11px] font-mono text-text-muted">وضع المعاينة:</span>
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-container border border-line">
          <button
            type="button"
            onClick={() => setPreviewDark(true)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 ${
              previewDark
                ? "bg-primary-container text-white font-bold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Moon className="w-3 h-3 text-sky-400" />
            <span>مظلم</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewDark(false)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 ${
              !previewDark
                ? "bg-primary-container text-white font-bold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Sun className="w-3 h-3 text-amber-400" />
            <span>مشرق</span>
          </button>
        </div>
      </div>

      {/* Phone Mockup Frame */}
      <div
        className={`w-[300px] h-[610px] rounded-[44px] border-[7px] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between transition-colors ${
          previewDark
            ? "bg-slate-900 border-slate-700"
            : "bg-slate-200 border-slate-300"
        }`}
      >
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        </div>

        {/* Screen Viewport */}
        <div
          dir="rtl"
          className="flex-1 w-full overflow-y-auto px-4 pt-8 pb-6 flex flex-col justify-between text-center relative transition-colors"
          style={{
            backgroundColor: previewBgColor,
            backgroundImage: previewBgImage,
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-2xl overflow-hidden border shadow-lg ${
                  previewDark
                    ? "border-white/20 bg-slate-800"
                    : "border-slate-300 bg-white"
                }`}
              >
                <img
                  src={avatar}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/brand/logo-squircle.webp";
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -start-1 w-3 h-3 rounded-full bg-status-ok border-2 border-slate-900" />
            </div>

            <div className="space-y-0.5">
              <h3
                className={`text-xs font-bold flex items-center justify-center gap-1 ${
                  previewDark ? "text-white" : "text-slate-900"
                }`}
              >
                <span>{title}</span>
                <span className="text-secondary text-[10px]">✓</span>
              </h3>
              <p
                className={`text-[10px] line-clamp-2 px-2 leading-tight ${
                  previewDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {bio}
              </p>
            </div>

            {/* Social Icons Mini Ribbon */}
            {activeSocialKeys.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {activeSocialKeys.map((key) => {
                  const item = SOCIAL_SVGS[key];
                  return (
                    <div
                      key={key}
                      className={`p-1.5 rounded-lg backdrop-blur-sm border ${
                        previewDark
                          ? "bg-white/10 border-white/10"
                          : "bg-white/80 border-slate-200 shadow-xs"
                      }`}
                      style={{ color: item.color }}
                    >
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d={item.path} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Links List */}
          <div className="space-y-2 w-full py-4 flex-1">
            {activeLinks.length === 0 ? (
              <div
                className={`p-3 rounded-xl border text-[10px] ${
                  previewDark
                    ? "bg-white/5 border-white/10 text-slate-400"
                    : "bg-white/80 border-slate-200 text-slate-600"
                }`}
              >
                لا توجد روابط مفعلة حالياً
              </div>
            ) : (
              activeLinks.map((link) => {
                const isGradient = link.style_variant === "gradient";
                const isOutline = link.style_variant === "outline";
                const isGlow = link.style_variant === "glow" || link.is_featured;

                // Adaptive colors calculation
                let cardTextColor: string | undefined = link.text_color;
                let cardBgColor: string | undefined = link.bg_color;
                let cardBorderColor: string | undefined = link.border_color;
                let cardBgImage: string | undefined = undefined;

                if (previewDark) {
                  cardTextColor = cardTextColor || "#ffffff";
                  cardBgColor = isOutline
                    ? "transparent"
                    : isGradient
                    ? undefined
                    : cardBgColor || "#1e293b";
                  cardBorderColor =
                    cardBorderColor ||
                    (isOutline ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.12)");
                  if (isGradient) {
                    cardBgImage = `linear-gradient(135deg, ${
                      link.gradient_from || "#0d6efd"
                    } 0%, ${link.gradient_to || "#00c3ff"} 100%)`;
                  }
                } else {
                  // Light preview
                  if (isOutline) {
                    cardBgColor = "transparent";
                    if (
                      !cardTextColor ||
                      cardTextColor.toLowerCase() === "#ffffff" ||
                      cardTextColor.toLowerCase() === "#fff"
                    ) {
                      cardTextColor = "#0b132b";
                    }
                    if (
                      !cardBorderColor ||
                      cardBorderColor === "#334155" ||
                      cardBorderColor.includes("255, 255, 255")
                    ) {
                      cardBorderColor = "rgba(15, 23, 42, 0.16)";
                    }
                  } else if (isGradient) {
                    cardBgImage = `linear-gradient(135deg, ${
                      link.gradient_from || "#0d6efd"
                    } 0%, ${link.gradient_to || "#0099ff"} 100%)`;
                    cardTextColor = "#ffffff";
                    cardBorderColor = "rgba(13, 110, 253, 0.25)";
                  } else {
                    const isDefaultDarkContainer =
                      !cardBgColor ||
                      cardBgColor === "#1e293b" ||
                      cardBgColor === "#0f172a" ||
                      cardBgColor === "#090d16";

                    if (isDefaultDarkContainer) {
                      cardBgColor = "#ffffff";
                      cardTextColor = "#0b132b";
                      cardBorderColor = "rgba(15, 23, 42, 0.10)";
                    } else {
                      cardTextColor = cardTextColor || "#ffffff";
                      cardBorderColor = cardBorderColor || "transparent";
                    }
                  }
                }

                return (
                  <div
                    key={link.id}
                    className="p-2.5 rounded-xl border text-start flex items-center justify-between gap-2 shadow-sm transition-transform"
                    style={{
                      color: cardTextColor,
                      backgroundColor: cardBgColor,
                      backgroundImage: cardBgImage,
                      borderColor: cardBorderColor,
                      boxShadow: isGlow
                        ? `0 0 12px ${(link.gradient_from || link.bg_color || "#0d6efd")}40`
                        : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {link.icon_or_image && (
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                            isGradient || previewDark ? "bg-black/20" : "bg-black/5"
                          }`}
                        >
                          {ICON_MAP[link.icon_or_image] || <Sparkles className="w-3 h-3" />}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold truncate leading-tight">
                          {link.title}
                        </div>
                        {link.subtitle && (
                          <div className="text-[9px] opacity-75 truncate leading-tight">
                            {link.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 opacity-70">
                      {link.url.startsWith("http") ? (
                        <ExternalLink className="w-3 h-3" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Mini Footer */}
          <div
            className={`text-[9px] font-mono pt-1 ${
              previewDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            AN DEV • Code · Create · Solve
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-600 rounded-full" />
      </div>

      <div className="mt-3 text-center">
        <span className="text-[11px] font-mono font-semibold text-secondary flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
          معاينة حية متوافقة مع الوضعين الداكن والفاتح
        </span>
      </div>
    </div>
  );
};
