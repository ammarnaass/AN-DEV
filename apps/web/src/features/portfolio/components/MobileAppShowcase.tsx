import React from "react";
import { MobileSpecs } from "@andev/shared";
import { useI18n } from "../../../lib/i18n";
import { Smartphone, Download, QrCode, WifiOff, HardDrive, CheckCircle2 } from "lucide-react";

interface MobileAppShowcaseProps {
  specs?: Partial<MobileSpecs>;
  downloadUrl?: string;
  title: string;
  className?: string;
}

export const MobileAppShowcase: React.FC<MobileAppShowcaseProps> = ({
  specs = {},
  downloadUrl = "",
  title,
  className = ""
}) => {
  const { locale } = useI18n();
  const apkUrl = downloadUrl || specs.apk_url || "";
  const minOs = specs.min_os || "Android 8.0+ / iOS 15+";
  const size = specs.package_size || "";
  const hardwareFeatures = specs.hardware_features || ["Camera", "Barcode"];

  return (
    <div className={`p-6 rounded-2xl border border-line bg-surface-container/40 space-y-6 text-start shadow-card ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-line">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/15 text-secondary text-[11px] font-mono font-bold">
            <Smartphone className="w-3.5 h-3.5" />
            <span>MOBILE_ENGINE // NATIVE_SHOWCASE</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary">
            {locale === "ar" ? "تطبيق هواتف ذكية فائق السرعة وتجربة أصلية" : "High-Performance Native Mobile Architecture"}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {specs.offline_first && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <WifiOff className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "يعمل بدون إنترنت" : "Offline-First Engine"}</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left Column: Direct Download & CTA */}
        <div className="md:col-span-2 space-y-4">
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-mono">
            {locale === "ar"
              ? `تمت هندسة تطبيق ${title} ليعمل بأعلى درجات السلاسة والسرعة على كافة أجهزة أندرويد وآيفون، مع مزامنة خلفية فورية واستجابة فائقة لقارئات الباركود والكاميرا.`
              : `Architected for maximum responsiveness and seamless interaction across Android & iOS devices, featuring real-time synchronization and low-latency hardware access.`}
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary">
              <Smartphone className="w-3.5 h-3.5 text-secondary" />
              <span>{minOs}</span>
            </div>

            {size && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary">
                <HardDrive className="w-3.5 h-3.5 text-secondary" />
                <span>{size}</span>
              </div>
            )}

            {hardwareFeatures.map(hw => (
              <div key={hw} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-secondary">
                <CheckCircle2 className="w-3 h-3 text-secondary" />
                <span>{hw}</span>
              </div>
            ))}
          </div>

          {/* Download Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {apkUrl && (
              <a href={apkUrl} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-95 cursor-pointer">
                  <Download className="w-4 h-4" />
                  <span>{locale === "ar" ? "تحميل نسخة APK مباشرة" : "Download APK Directly"}</span>
                </button>
              </a>
            )}

            {specs.play_store_url && (
              <a href={specs.play_store_url} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-line text-text-primary text-xs font-semibold hover:border-secondary/40 hover:text-secondary transition-all cursor-pointer">
                  <span>Google Play</span>
                </button>
              </a>
            )}

            {specs.app_store_url && (
              <a href={specs.app_store_url} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-line text-text-primary text-xs font-semibold hover:border-secondary/40 hover:text-secondary transition-all cursor-pointer">
                  <span>Apple App Store</span>
                </button>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: QR Code Direct Phone Install Mockup */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-line bg-surface text-center space-y-2.5">
          <div className="p-3 bg-white rounded-xl shadow-sm inline-block">
            {/* High fidelity SVG Mock QR Code */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-black fill-current">
              <rect x="0" y="0" width="30" height="30" rx="4" />
              <rect x="70" y="0" width="30" height="30" rx="4" />
              <rect x="0" y="70" width="30" height="30" rx="4" />
              <rect x="36" y="8" width="10" height="10" />
              <rect x="52" y="16" width="10" height="10" />
              <rect x="40" y="40" width="20" height="20" />
              <rect x="72" y="44" width="12" height="12" />
              <rect x="40" y="72" width="12" height="12" />
              <rect x="76" y="76" width="14" height="14" />
              <rect x="8" y="8" width="14" height="14" fill="white" />
              <rect x="78" y="8" width="14" height="14" fill="white" />
              <rect x="8" y="78" width="14" height="14" fill="white" />
              <rect x="12" y="12" width="6" height="6" />
              <rect x="82" y="12" width="6" height="6" />
              <rect x="12" y="82" width="6" height="6" />
            </svg>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-text-primary flex items-center justify-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-secondary" />
              <span>{locale === "ar" ? "مسح للتثبيت الفوري" : "Scan to Install"}</span>
            </span>
            <span className="text-[10px] text-text-muted font-mono block">
              {locale === "ar" ? "وجّه كاميرا هاتفك لتحميل التطبيق" : "Scan with phone camera"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

