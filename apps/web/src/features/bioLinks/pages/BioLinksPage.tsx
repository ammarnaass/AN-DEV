import React from "react";
import { usePublicBioLinks } from "../hooks/useBioLinks";
import { useTheme } from "../../../hooks/useTheme";
import { MetaTags } from "../../../components/seo/MetaTags";
import { BioPageNavbar } from "../components/BioPageNavbar";
import { BioProfileHeader } from "../components/BioProfileHeader";
import { BioSocialsRibbon } from "../components/BioSocialsRibbon";
import { BioLinkCard } from "../components/BioLinkCard";
import { BioPageFooter } from "../components/BioPageFooter";
import { isColorDark, adjustBrightness } from "../utils/bioColor.utils";

export const BioLinksPage: React.FC = () => {
  const { links, settings, isLoading, trackClick } = usePublicBioLinks();
  const { isDark, toggleTheme } = useTheme();

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

  // Background styling computation
  let containerBgColor: string;
  let containerBgImage: string;
  const effectiveBg = bgValue || "#090d16";

  if (bgType === "color") {
    containerBgColor = isDark
      ? effectiveBg
      : isColorDark(effectiveBg)
      ? "#f4f7fd"
      : effectiveBg;
    containerBgImage = "none";
  } else if (bgType === "gradient") {
    if (isDark) {
      const topColor = adjustBrightness(effectiveBg, 22);
      const bottomColor = adjustBrightness(effectiveBg, -15);
      containerBgColor = topColor;
      containerBgImage = `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;
    } else {
      containerBgColor = "#f4f7fd";
      containerBgImage = "linear-gradient(180deg, #ffffff 0%, #e2e8f8 100%)";
    }
  } else {
    // Mesh
    containerBgColor = isDark ? effectiveBg : "#f4f7fd";
    containerBgImage = isDark
      ? "radial-gradient(circle at 50% 0%, rgba(13, 110, 253, 0.35) 0%, transparent 60%), radial-gradient(circle at 10% 40%, rgba(0, 195, 255, 0.20) 0%, transparent 50%), radial-gradient(circle at 90% 70%, rgba(13, 110, 253, 0.18) 0%, transparent 50%)"
      : "radial-gradient(circle at 50% 0%, rgba(13, 110, 253, 0.10) 0%, transparent 60%), radial-gradient(circle at 10% 40%, rgba(2, 132, 199, 0.08) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(13, 110, 253, 0.06) 0%, transparent 50%)";
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 selection:text-secondary flex flex-col justify-between py-10 px-4 sm:px-6 transition-colors duration-300"
      style={{
        backgroundColor: containerBgColor,
        backgroundImage: containerBgImage,
      }}
    >
      <MetaTags
        title={title}
        description={bio}
        image={avatar}
        url="/links"
        type="profile"
      />

      {/* Top Navbar */}
      <BioPageNavbar
        title={title}
        bio={bio}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="max-w-md mx-auto w-full space-y-7 flex-1 flex flex-col items-center text-center">
        {/* Profile Card & Avatar */}
        <BioProfileHeader
          title={title}
          bio={bio}
          avatar={avatar}
          isDark={isDark}
        />

        {/* Social Ribbon */}
        <BioSocialsRibbon settings={settings} />

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
            links.map((link) => (
              <BioLinkCard
                key={link.id}
                link={link}
                onLinkClick={handleLinkClick}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <BioPageFooter />
    </div>
  );
};
