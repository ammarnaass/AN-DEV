import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePublicBioLinks } from "../features/bioLinks/hooks/useBioLinks";
import {
  Share2,
  Check,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
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

// Icon resolver helper for dynamic icon strings
const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 shrink-0" />,
  FolderKanban: <FolderKanban className="w-5 h-5 shrink-0" />,
  MessageCircle: <MessageCircle className="w-5 h-5 shrink-0" />,
  BookOpen: <BookOpen className="w-5 h-5 shrink-0" />,
  Globe: <Globe className="w-5 h-5 shrink-0" />,
  Code2: <Code2 className="w-5 h-5 shrink-0" />,
  Cpu: <Cpu className="w-5 h-5 shrink-0" />,
  Layers: <Layers className="w-5 h-5 shrink-0" />,
  Terminal: <Terminal className="w-5 h-5 shrink-0" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 shrink-0" />,
  Send: <Send className="w-5 h-5 shrink-0" />,
  Zap: <Zap className="w-5 h-5 shrink-0" />,
};

interface SocialIconDef {
  key: string;
  name: string;
  color: string;
  icon: React.ReactNode;
}

const SOCIAL_DEFS: SocialIconDef[] = [
  {
    key: "whatsapp",
    name: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.108.549 4.167 1.594 5.975L.062 24l6.236-1.636c1.73.944 3.679 1.442 5.733 1.442 6.633 0 12.002-5.367 12.002-11.987S18.664 0 12.031 0zm.004 21.84c-1.785 0-3.535-.48-5.06-1.388l-.363-.215-3.762.986 1.004-3.667-.236-.375c-.996-1.586-1.522-3.418-1.522-5.194 0-5.466 4.455-9.914 9.939-9.914 5.485 0 9.939 4.448 9.939 9.914 0 5.466-4.454 9.914-9.939 9.914zm5.448-7.443c-.299-.149-1.767-.872-2.04-.972-.274-.099-.473-.149-.672.15-.199.299-.77.972-.944 1.171-.174.199-.348.224-.647.075-.299-.149-1.264-.466-2.408-1.485-.89-.794-1.49-1.774-1.664-2.073-.174-.299-.019-.461.13-.61.134-.134.299-.348.448-.522.149-.174.199-.299.299-.498.099-.199.05-.373-.025-.522-.075-.149-.672-1.62-.921-2.217-.243-.582-.49-.503-.672-.512l-.573-.01c-.199 0-.523.075-.797.373s-1.046 1.022-1.046 2.493 1.071 2.891 1.22 3.09c.149.199 2.108 3.218 5.107 4.513.714.308 1.272.493 1.706.63.718.228 1.371.196 1.888.118.577-.087 1.767-.723 2.016-1.42.249-.697.249-1.294.174-1.42-.075-.125-.274-.199-.573-.348z" />
      </svg>
    ),
  },
  {
    key: "telegram",
    name: "Telegram",
    color: "#229ED9",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    key: "github",
    name: "GitHub",
    color: "#8B949E",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    name: "Facebook",
    color: "#1877F2",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    name: "Instagram",
    color: "#E4405F",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    name: "X",
    color: "#E7E9EA",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    name: "YouTube",
    color: "#FF0000",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export const BioLinksPage: React.FC = () => {
  const { links, settings, isLoading, trackClick } = usePublicBioLinks();
  const [copied, setCopied] = useState(false);

  const title = settings.bio_page_title || "AN DEV | وكالة البرمجيات";
  const bio =
    settings.bio_page_bio ||
    "نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية. تواصل معنا أو تصفح أعمالنا وأحدث حلولنا التقنية.";
  const avatar = settings.bio_page_avatar || "/brand/logo-squircle.webp";
  const bgType = settings.bio_page_bg_type || "mesh";
  const bgValue = settings.bio_page_bg_value || "#090d16";

  const handleLinkClick = (id: number, url: string) => {
    trackClick(id);
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: bio,
          url: currentUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  let parsedSocials: Record<string, string> = {};
  if (settings.bio_page_socials) {
    try {
      parsedSocials = JSON.parse(settings.bio_page_socials);
    } catch {
      // ignore
    }
  }
  const resolvedSettings = { ...parsedSocials, ...settings };

  // Active social platforms
  const activeSocials = SOCIAL_DEFS.filter(
    (item) => !!resolvedSettings[item.key]?.trim()
  );

  const getFontFamilyStyle = (font: string) => {
    switch (font?.toLowerCase()) {
      case "ibm":
      case "ibm plex arabic":
        return "'IBM Plex Sans Arabic', sans-serif";
      case "tajawal":
        return "'Tajawal', sans-serif";
      case "inter":
        return "'Inter', sans-serif";
      case "mono":
      case "jetbrains mono":
        return "'JetBrains Mono', monospace";
      case "cairo":
      default:
        return "'Cairo', sans-serif";
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 selection:text-secondary flex flex-col justify-between py-10 px-4 sm:px-6 transition-colors duration-300"
      style={{
        backgroundColor: bgType === "color" ? bgValue : "#090d16",
        backgroundImage:
          bgType === "gradient"
            ? `linear-gradient(180deg, ${bgValue} 0%, #050811 100%)`
            : bgType === "mesh"
            ? "radial-gradient(circle at 50% 10%, rgba(13, 110, 253, 0.18) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(0, 242, 254, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 90%, rgba(13, 110, 253, 0.08) 0%, transparent 50%)"
            : undefined,
      }}
    >
      {/* Subtle Top Floating Share Button */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/60 backdrop-blur-md border border-line text-xs font-mono text-text-muted hover:text-text-primary hover:border-secondary/40 transition-colors"
          title="العودة للموقع الرسمي"
        >
          <ArrowUpRight className="w-3.5 h-3.5 rotate-180 text-secondary" />
          <span>الموقع الرسمي</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/60 backdrop-blur-md border border-line text-xs font-mono text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors cursor-pointer"
          title="مشاركة الصفحة"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-status-ok" />
              <span className="text-status-ok font-semibold">تم النسخ!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Container (Mobile-Optimized Width) */}
      <main className="max-w-md mx-auto w-full space-y-7 flex-1 flex flex-col items-center text-center">
        {/* Profile Header & Large Hero Image */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            {/* Outer Glow Halo */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-[32px] blur-lg opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse" />

            {/* Profile Avatar Container */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-line bg-surface flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <img
                src={avatar}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/brand/logo-squircle.webp";
                }}
              />
            </div>

            {/* Online Pulse Indicator */}
            <div
              className="absolute -bottom-1 -start-1 px-2 py-0.5 rounded-full bg-surface-container border border-line flex items-center gap-1.5 shadow-md"
              title="أنظمة الوكالة نشطة"
            >
              <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-text-primary">
                نشط
              </span>
            </div>
          </div>

          {/* Title & Verification Lockup */}
          <div className="space-y-1.5 px-2">
            <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight flex items-center justify-center gap-1.5">
              <span>{title}</span>
              <span
                className="w-4 h-4 rounded-full bg-secondary text-surface flex items-center justify-center text-[10px] font-bold shrink-0"
                title="حساب رسمي موثق"
              >
                ✓
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm">
              {bio}
            </p>
          </div>

          {/* Social Media Ribbon */}
          {activeSocials.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {activeSocials.map((social) => {
                const url = resolvedSettings[social.key] || "";
                const targetUrl = url.startsWith("http")
                  ? url
                  : social.key === "whatsapp"
                  ? `https://wa.me/${url.replace(/[^0-9]/g, "")}`
                  : `https://${url}`;

                return (
                  <a
                    key={social.key}
                    href={targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-2xl bg-surface/75 backdrop-blur-md border border-line text-text-muted hover:text-text-primary transition-all duration-200 hover:scale-110 shadow-sm"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                    title={social.name}
                    aria-label={social.name}
                  >
                    <span style={{ color: social.color }}>{social.icon}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Links Stack */}
        <div className="w-full space-y-3 pt-2">
          {isLoading ? (
            <div className="space-y-3 py-6">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-full h-16 rounded-2xl bg-surface/40 border border-line/60 animate-pulse"
                />
              ))}
            </div>
          ) : links.length === 0 ? (
            <div className="p-6 rounded-2xl bg-surface/50 border border-line text-text-muted text-xs font-mono">
              لا توجد روابط منشورة حالياً.
            </div>
          ) : (
            links.map((link) => {
              const iconComponent = link.icon_or_image
                ? ICON_MAP[link.icon_or_image] || (
                    link.icon_or_image.startsWith("http") ||
                    link.icon_or_image.startsWith("data:") ? (
                      <img
                        src={link.icon_or_image}
                        alt=""
                        className="w-5 h-5 rounded-md object-cover"
                      />
                    ) : (
                      <Sparkles className="w-5 h-5 shrink-0" />
                    )
                  )
                : null;

              const isGradient = link.style_variant === "gradient";
              const isOutline = link.style_variant === "outline";
              const isGlow = link.style_variant === "glow" || link.is_featured;

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.url)}
                  className={`group relative w-full p-4 rounded-2xl text-start transition-all duration-200 active:scale-[0.98] flex items-center justify-between gap-3 shadow-md hover:shadow-xl cursor-pointer ${
                    isGlow ? "animate-none hover:scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                  style={{
                    fontFamily: getFontFamilyStyle(link.font_family),
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
                    borderColor: link.border_color || "rgba(255, 255, 255, 0.12)",
                    borderWidth: "1px",
                    boxShadow: isGlow
                      ? `0 0 24px ${(link.gradient_from || link.bg_color || "#0d6efd")}40`
                      : undefined,
                  }}
                >
                  {/* Left: Icon & Titles */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {iconComponent && (
                      <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                        {iconComponent}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base leading-snug truncate">
                          {link.title}
                        </span>
                        {link.is_featured && (
                          <span className="px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-mono font-bold shrink-0">
                            مميز
                          </span>
                        )}
                      </div>
                      {link.subtitle && (
                        <span className="text-xs opacity-80 leading-normal truncate pt-0.5">
                          {link.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Arrow indicator */}
                  <div className="w-7 h-7 rounded-lg bg-black/15 flex items-center justify-center shrink-0 group-hover:translate-x-[-2px] transition-transform">
                    {link.url.startsWith("http") ? (
                      <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:opacity-100" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </main>

      {/* Standalone Minimal Footer */}
      <footer className="max-w-md mx-auto w-full pt-10 pb-4 text-center space-y-2 text-xs font-mono text-text-muted">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 hover:text-text-primary transition-colors"
        >
          <span className="w-2 h-2 rounded-sm bg-primary" />
          <span className="font-bold text-text-primary">AN DEV</span>
          <span>• Code · Create · Solve</span>
        </Link>
        <p className="text-[10px] opacity-60">
          الصفحة الرسمية لاختصارات الروابط والخدمات المباشرة
        </p>
      </footer>
    </div>
  );
};
