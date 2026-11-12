import React from "react";
import { SOCIAL_DEFS } from "../constants/bioSocials.constants";

interface BioSocialsRibbonProps {
  settings: Record<string, string>;
}

export function resolveSocialUrl(key: string, rawUrl: string): string {
  if (!rawUrl) return "";
  if (rawUrl.startsWith("http")) return rawUrl;

  switch (key) {
    case "whatsapp":
      return `https://wa.me/${rawUrl.replace(/[^0-9]/g, "")}`;
    case "telegram":
      return `https://t.me/${rawUrl.replace(/^@/, "")}`;
    case "facebook":
      return rawUrl.includes("facebook.com") ? `https://${rawUrl}` : `https://facebook.com/${rawUrl}`;
    case "instagram":
      return rawUrl.includes("instagram.com") ? `https://${rawUrl}` : `https://instagram.com/${rawUrl.replace(/^@/, "")}`;
    case "twitter":
      return rawUrl.includes("x.com") || rawUrl.includes("twitter.com") ? `https://${rawUrl}` : `https://x.com/${rawUrl.replace(/^@/, "")}`;
    case "youtube":
      return rawUrl.includes("youtube.com") ? `https://${rawUrl}` : `https://youtube.com/${rawUrl.startsWith("@") ? rawUrl : "@" + rawUrl}`;
    case "tiktok":
      return rawUrl.includes("tiktok.com")
        ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
        : `https://www.tiktok.com/${rawUrl.startsWith("@") ? rawUrl : "@" + rawUrl}`;
    default:
      return `https://${rawUrl}`;
  }
}

export const BioSocialsRibbon: React.FC<BioSocialsRibbonProps> = ({ settings }) => {
  let parsedSocials: Record<string, string> = {};
  if (settings.bio_page_socials) {
    try {
      parsedSocials = JSON.parse(settings.bio_page_socials);
    } catch {
      // ignore
    }
  }
  const resolved = { ...parsedSocials, ...settings };
  const activeSocials = SOCIAL_DEFS.filter((item) => !!resolved[item.key]?.trim());

  if (activeSocials.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
      {activeSocials.map((social) => {
        const raw = resolved[social.key] || "";
        const targetUrl = resolveSocialUrl(social.key, raw);

        return (
          <a
            key={social.key}
            href={targetUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-2xl bg-surface/85 backdrop-blur-md border border-line text-text-muted hover:text-text-primary transition-all duration-200 hover:scale-110 shadow-sm hover:border-secondary/40"
            title={social.name}
            aria-label={social.name}
          >
            <span style={{ color: social.color }}>{social.icon}</span>
          </a>
        );
      })}
    </div>
  );
};
