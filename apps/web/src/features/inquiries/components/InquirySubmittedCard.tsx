import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Copy, Check, ExternalLink } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { Button } from "../../../components/ui/Button";

interface InquirySubmittedCardProps {
  trackingCode?: string | null;
  onReset: () => void;
}

export const InquirySubmittedCard: React.FC<InquirySubmittedCardProps> = ({
  trackingCode,
  onReset,
}) => {
  const { t, locale } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (!trackingCode) return;
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-ok/40 bg-surface p-6 sm:p-10 text-center space-y-6 shadow-sm animate-fade-in text-start">
      <div className="w-16 h-16 rounded-full bg-ok/10 text-ok mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-ink">
          {t("contact.success_title")}
        </h3>
        <p className="text-mute text-sm max-w-md mx-auto leading-relaxed">
          {t("contact.success_desc")}
        </p>
      </div>

      {trackingCode && (
        <div className="p-5 rounded-xl border border-secondary/30 bg-surface-container max-w-md mx-auto space-y-3">
          <span className="text-xs font-mono text-secondary font-semibold block text-center">
            {t("contact.tracking_title")}
          </span>
          <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-bg border border-line font-mono text-base font-bold text-ink">
            <span className="tracking-wider">{trackingCode}</span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="p-1.5 rounded hover:bg-surface text-mute hover:text-ink transition-colors flex items-center gap-1 text-xs"
              title={locale === "ar" ? "نسخ الكود" : "Copy Code"}
            >
              {copied ? (
                <Check className="w-4 h-4 text-ok" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="text-[11px]">
                {copied
                  ? locale === "ar"
                    ? "تم النسخ"
                    : "Copied"
                  : locale === "ar"
                  ? "نسخ"
                  : "Copy"}
              </span>
            </button>
          </div>
          <div className="pt-2">
            <Link
              to={`/track/${trackingCode}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-secondary/90 transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t("contact.track_btn")}</span>
            </Link>
          </div>
        </div>
      )}

      <div className="pt-2 text-center">
        <Button variant="secondary" onClick={onReset}>
          {locale === "ar" ? "إرسال طلب آخر" : "Submit Another Request"}
        </Button>
      </div>
    </div>
  );
};
