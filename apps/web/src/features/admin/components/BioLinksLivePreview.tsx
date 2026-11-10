import React from "react";
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
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5z",
  },
  github: {
    color: "#8B949E",
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  facebook: {
    color: "#1877F2",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  instagram: {
    color: "#E4405F",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z",
  },
};

export const BioLinksLivePreview: React.FC<BioLinksLivePreviewProps> = ({
  settings,
  links,
}) => {
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

  return (
    <div className="flex flex-col items-center select-none sticky top-6">
      {/* Phone Mockup Frame */}
      <div className="w-[300px] h-[610px] rounded-[44px] bg-slate-900 border-[7px] border-slate-700 shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        </div>

        {/* Screen Viewport */}
        <div
          dir="rtl"
          className="flex-1 w-full overflow-y-auto px-4 pt-8 pb-6 flex flex-col justify-between text-center relative text-white"
          style={{
            backgroundColor: bgType === "color" ? bgValue : "#090d16",
            backgroundImage:
              bgType === "gradient"
                ? `linear-gradient(180deg, ${bgValue} 0%, #050811 100%)`
                : bgType === "mesh"
                ? "radial-gradient(circle at 50% 10%, rgba(13, 110, 253, 0.25) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(0, 242, 254, 0.12) 0%, transparent 50%)"
                : undefined,
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-surface">
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
              <h3 className="text-xs font-bold text-white flex items-center justify-center gap-1">
                <span>{title}</span>
                <span className="text-secondary text-[10px]">✓</span>
              </h3>
              <p className="text-[10px] text-slate-400 line-clamp-2 px-2 leading-tight">
                {bio}
              </p>
            </div>

            {/* Social Icons Mini Ribbon */}
            {activeSocialKeys.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {activeSocialKeys.slice(0, 6).map((key) => {
                  const item = SOCIAL_SVGS[key];
                  return (
                    <div
                      key={key}
                      className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10"
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
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-slate-400">
                لا توجد روابط مفعلة حالياً
              </div>
            ) : (
              activeLinks.map((link) => {
                const isGradient = link.style_variant === "gradient";
                const isOutline = link.style_variant === "outline";
                const isGlow = link.style_variant === "glow" || link.is_featured;

                return (
                  <div
                    key={link.id}
                    className="p-2.5 rounded-xl border text-start flex items-center justify-between gap-2 shadow-sm transition-transform"
                    style={{
                      color: link.text_color || "#ffffff",
                      backgroundColor: isOutline
                        ? "transparent"
                        : isGradient
                        ? undefined
                        : link.bg_color || "#1e293b",
                      backgroundImage: isGradient
                        ? `linear-gradient(135deg, ${link.gradient_from || "#0d6efd"} 0%, ${
                            link.gradient_to || "#00f2fe"
                          } 100%)`
                        : undefined,
                      borderColor: link.border_color || "rgba(255, 255, 255, 0.15)",
                      boxShadow: isGlow
                        ? `0 0 12px ${(link.gradient_from || link.bg_color || "#0d6efd")}40`
                        : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {link.icon_or_image && (
                        <div className="w-6 h-6 rounded-md bg-black/20 flex items-center justify-center shrink-0">
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
          <div className="text-[9px] font-mono text-slate-500 pt-1">
            AN DEV • Code · Create · Solve
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-600 rounded-full" />
      </div>

      <div className="mt-3 text-center">
        <span className="text-[11px] font-mono font-semibold text-secondary flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
          معاينة حية فورية لشاشة الهاتف
        </span>
      </div>
    </div>
  );
};
