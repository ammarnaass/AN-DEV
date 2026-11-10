import React from "react";
import { Share2, ExternalLink, CheckCircle2, Globe } from "lucide-react";

interface SettingsSocialSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

interface SocialPlatform {
  key: string;
  nameAr: string;
  nameEn: string;
  placeholder: string;
  color: string;
  badgeBg: string;
  icon: React.ReactNode;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    key: "facebook",
    nameAr: "صفحة فيسبوك الرسمية",
    nameEn: "Facebook Page",
    placeholder: "https://facebook.com/andev.dz",
    color: "#1877F2",
    badgeBg: "rgba(24, 119, 242, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    nameAr: "حساب إنستغرام",
    nameEn: "Instagram Profile",
    placeholder: "https://instagram.com/andev.dz",
    color: "#E4405F",
    badgeBg: "rgba(228, 64, 95, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    nameAr: "إكس (تويتر سابقاً)",
    nameEn: "X / Twitter",
    placeholder: "https://x.com/andev_dz",
    color: "#E7E9EA",
    badgeBg: "rgba(255, 255, 255, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    nameAr: "صفحة لينكد إن الرسمية",
    nameEn: "LinkedIn Page",
    placeholder: "https://linkedin.com/company/an-dev-algeria",
    color: "#0A66C2",
    badgeBg: "rgba(10, 102, 194, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    key: "github",
    nameAr: "منظمة GitHub التقنية",
    nameEn: "GitHub Organization",
    placeholder: "https://github.com/an-dev",
    color: "#8B949E",
    badgeBg: "rgba(139, 148, 158, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    nameAr: "قناة يوتيوب الرسمية",
    nameEn: "YouTube Channel",
    placeholder: "https://youtube.com/@andev_dz",
    color: "#FF0000",
    badgeBg: "rgba(255, 0, 0, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "tiktok",
    nameAr: "حساب تيك توك",
    nameEn: "TikTok Profile",
    placeholder: "https://tiktok.com/@andev_dz",
    color: "#FE2C55",
    badgeBg: "rgba(254, 44, 85, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.35-.04 2.54-.86 2.98-2.14.24-.62.31-1.28.3-1.94-.02-3.85-.01-7.7-.01-11.55.02-1.84.01-3.69.01-5.54z" />
      </svg>
    ),
  },
  {
    key: "telegram",
    nameAr: "قناة أو مجموعة تيليجرام",
    nameEn: "Telegram Channel",
    placeholder: "https://t.me/andev_dz",
    color: "#229ED9",
    badgeBg: "rgba(34, 158, 217, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    nameAr: "رابط محادثة واتساب للأعمال",
    nameEn: "WhatsApp Direct Link",
    placeholder: "https://wa.me/213550123456",
    color: "#25D366",
    badgeBg: "rgba(37, 211, 102, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.108.549 4.167 1.594 5.975L.062 24l6.236-1.636c1.73.944 3.679 1.442 5.733 1.442 6.633 0 12.002-5.367 12.002-11.987S18.664 0 12.031 0zm.004 21.84c-1.785 0-3.535-.48-5.06-1.388l-.363-.215-3.762.986 1.004-3.667-.236-.375c-.996-1.586-1.522-3.418-1.522-5.194 0-5.466 4.455-9.914 9.939-9.914 5.485 0 9.939 4.448 9.939 9.914 0 5.466-4.454 9.914-9.939 9.914zm5.448-7.443c-.299-.149-1.767-.872-2.04-.972-.274-.099-.473-.149-.672.15-.199.299-.77 972-.944 1.171-.174.199-.348.224-.647.075-.299-.149-1.264-.466-2.408-1.485-.89-.794-1.49-1.774-1.664-2.073-.174-.299-.019-.461.13-.61.134-.134.299-.348.448-.522.149-.174.199-.299.299-.498.099-.199.05-.373-.025-.522-.075-.149-.672-1.62-.921-2.217-.243-.582-.49-.503-.672-.512l-.573-.01c-.199 0-.523.075-.797.373s-1.046 1.022-1.046 2.493 1.071 2.891 1.22 3.09c.149.199 2.108 3.218 5.107 4.513.714.308 1.272.493 1.706.63.718.228 1.371.196 1.888.118.577-.087 1.767-.723 2.016-1.42.249-.697.249-1.294.174-1.42-.075-.125-.274-.199-.573-.348z" />
      </svg>
    ),
  },
  {
    key: "discord",
    nameAr: "خادم مجتمع ديسكورد",
    nameEn: "Discord Server",
    placeholder: "https://discord.gg/andev",
    color: "#5865F2",
    badgeBg: "rgba(88, 101, 242, 0.12)",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

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
        {SOCIAL_PLATFORMS.map((platform) => {
          const val = settings[platform.key] || "";
          const isPopulated = !!val.trim();

          return (
            <div
              key={platform.key}
              className={`p-4 rounded-xl border transition-all ${
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
                      href={val.startsWith("http") ? val : `https://${val}`}
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
                  value={val}
                  onChange={(e) => onChange(platform.key, e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono focus:outline-none focus:border-secondary transition-all"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Social Ribbon Preview */}
      <div className="p-4 rounded-xl bg-surface-container/70 border border-line space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-secondary" />
            معاينة شريط التواصل كما يظهر للزوار في أسفل الموقع:
          </span>
          <span className="text-[11px] font-mono text-text-muted">
            {activeCount === 0 ? "لا توجد روابط مضافة" : `${activeCount} أيقونات نشطة`}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line flex flex-wrap items-center gap-3">
          {activeCount === 0 ? (
            <p className="text-xs text-text-muted italic">
              أدخل روابط حساباتك في الأعلى لتبدأ الأيقونات التفاعلية بالظهور هنا وفي تذييل الموقع.
            </p>
          ) : (
            SOCIAL_PLATFORMS.filter((p) => !!settings[p.key]?.trim()).map((p) => {
              const url = settings[p.key] || "";
              return (
                <a
                  key={p.key}
                  href={url.startsWith("http") ? url : `https://${url}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: p.color }}
                  className="p-2.5 rounded-xl bg-surface-container border border-line hover:border-secondary transition-transform hover:-translate-y-0.5 flex items-center gap-2 shadow-sm"
                  title={p.nameAr}
                >
                  {p.icon}
                  <span className="text-xs font-mono font-semibold text-text-primary">
                    {p.nameEn.split(" ")[0]}
                  </span>
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
