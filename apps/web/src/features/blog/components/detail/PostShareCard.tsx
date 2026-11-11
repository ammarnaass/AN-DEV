import React, { useState } from "react";
import { useI18n } from "../../../../lib/i18n";
import { Share2, Check, Copy } from "lucide-react";

export interface PostShareCardProps {
  shareUrl: string;
  shareText: string;
}

export const PostShareCard: React.FC<PostShareCardProps> = ({
  shareUrl,
  shareText,
}) => {
  const { locale } = useI18n();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-surface border border-line space-y-3 shadow-sm text-start">
      <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold pb-2 border-b border-line">
        <Share2 className="w-4 h-4" />
        <span>{locale === "ar" ? "مشاركة المقال التقني" : "SHARE ARTICLE"}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a
          href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-elevated border border-line text-xs font-medium text-center text-text-primary hover:text-secondary transition-all"
        >
          واتساب (WhatsApp)
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-elevated border border-line text-xs font-medium text-center text-text-primary hover:text-secondary transition-all"
        >
          منصة X (Twitter)
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-elevated border border-line text-xs font-medium text-center text-text-primary hover:text-secondary transition-all col-span-2"
        >
          LinkedIn لينكد إن
        </a>
      </div>

      <button
        type="button"
        onClick={handleCopyLink}
        className="w-full py-2.5 px-3 rounded-lg bg-secondary/15 hover:bg-secondary/25 border border-secondary/30 text-secondary text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
      >
        {copiedLink ? (
          <>
            <Check className="w-3.5 h-3.5 text-status-ok" />
            <span className="text-status-ok">
              {locale === "ar" ? "تم نسخ الرابط للحافظة!" : "Link Copied!"}
            </span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "نسخ رابط المقال" : "Copy Article Link"}</span>
          </>
        )}
      </button>
    </div>
  );
};

