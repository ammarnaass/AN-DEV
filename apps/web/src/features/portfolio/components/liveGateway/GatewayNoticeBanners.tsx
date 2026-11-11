import React from "react";
import { useI18n } from "../../../../lib/i18n";
import { ShieldCheck, AlertCircle } from "lucide-react";

export interface GatewayNoticeBannersProps {
  hasFramingNotice: boolean;
  liveUrl: string;
}

export const GatewayNoticeBanners: React.FC<GatewayNoticeBannersProps> = ({
  hasFramingNotice,
  liveUrl,
}) => {
  const { locale } = useI18n();

  return (
    <>
      {/* Framing Notice Alert */}
      {hasFramingNotice && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center gap-2 text-amber-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            {locale === "ar"
              ? "تعذر تحميل المعاينة التفاعلية داخل الإطار بسبب سياسة أمان المصدر. يرجى الفتح في نافذة جديدة."
              : "Unable to load interactive preview inside frame due to security policies. Please open in a new tab."}
          </span>
        </div>
      )}

      {/* Helpful CSP / Framing Notice Banner */}
      <div className="p-3 rounded-xl bg-surface-container/60 border border-line text-xs flex items-center justify-between gap-3 text-text-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
          <span>
            {locale === "ar"
              ? "بيئة المعاينة تعمل بنمط محمي. إذا منعت سياسة أمان الموقع (CSP) التضمين، يمكنك دائماً تشغيله بضغطة زر في نافذة مستقلة."
              : "Sandboxed interactive environment. If third-party CSP policies prevent framing, you can launch directly in an isolated tab."}
          </span>
        </div>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline font-semibold whitespace-nowrap"
        >
          {locale === "ar" ? "تشغيل مباشر" : "Launch Directly"}
        </a>
      </div>
    </>
  );
};

