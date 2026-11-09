import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { Home, Copy, Check, Layers, BookOpen, MessageSquareCode } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  const { locale } = useI18n();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const handleCopyDiagnostics = () => {
    const diagnosticData = `[AN_DEV_DIAGNOSTICS]
Status: HTTP 404 Route Unresolved
Timestamp: ${new Date().toISOString()}
Path: ${location.pathname}
Kernel: AN_CORE_V2.5 (React 19 / Fastify / SQLite WAL)
Host: Algiers Cluster`;

    navigator.clipboard.writeText(diagnosticData).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="w-full pt-24 sm:pt-28 pb-20 bg-background overflow-hidden">
      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-elevated border border-secondary text-secondary shadow-xl animate-fadeIn">
          <Check className="w-4 h-4 text-status-ok" />
          <span className="font-mono text-xs">
            {locale === "ar" ? "تم نسخ التقرير التشخيصي بنجاح إلى الحافظة!" : "Diagnostic report copied to clipboard!"}
          </span>
        </div>
      )}

      {/* Ambient Cybernetic Glow Gradients */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

        {/* Diagnostic System Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-line shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-status-err animate-ping" />
          <span className="font-mono text-xs text-status-err font-bold tracking-wider">
            HTTP 404 // ROUTE_UNRESOLVED
          </span>
          <span className="text-line">•</span>
          <span className="font-mono text-xs text-secondary" dir="ltr">
            AN_CORE_V2.5
          </span>
        </div>

        {/* Giant Monospace 404 */}
        <div className="relative mt-4 select-none">
          <h1 className="font-mono font-black tracking-tighter text-[96px] md:text-[148px] lg:text-[180px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-text-primary via-secondary to-surface/40">
            404
          </h1>
        </div>

        {/* Headline & Description */}
        <div className="space-y-3 max-w-xl -mt-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            {locale === "ar"
              ? "عفواً، المسار البرمجي المطلوب غير متاح أو تم نقله!"
              : "Requested Route Unresolved in AN DEV Kernel"}
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            {locale === "ar"
              ? "الصفحة أو المسار المطلوب غير موجود في بنية النظام، قد يكون الرابط خاطئاً أو تم تعديل معمارية المسارات."
              : "The resource or route does not exist. It may have been relocated, deprecated, or mistyped."}
          </p>
        </div>

        {/* Terminal Diagnostic Block */}
        <div
          dir="ltr"
          className="w-full max-w-xl mt-6 rounded-xl bg-surface-container-lowest border border-line p-4 text-start font-mono text-xs shadow-modal overflow-hidden"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-line text-text-muted text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-err" />
              <span className="w-2.5 h-2.5 rounded-full bg-status-warn" />
              <span className="w-2.5 h-2.5 rounded-full bg-status-ok" />
              <span className="ml-2 text-text-muted">kernel_diagnostics.log</span>
            </div>
            <span className="text-status-err">FATAL_404</span>
          </div>
          <div className="space-y-1 text-text-muted">
            <p className="text-status-err font-bold">&gt; GET {location.pathname} -&gt; 404 Not Found</p>
            <p>&gt; StackTrace: RouteNotFoundException: Unresolved target in AN_DEV Router.</p>
            <p className="text-secondary">&gt; Recommendation: Redirecting to safe zone /</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-container text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(13,110,253,0.35)] active:scale-[0.98]">
              <Home className="w-4 h-4" />
              <span>{locale === "ar" ? "العودة إلى الصفحة الرئيسية" : "Return to Home"}</span>
            </button>
          </Link>

          <button
            onClick={handleCopyDiagnostics}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface-container border border-line text-text-primary text-sm font-semibold hover:border-secondary/40 hover:text-secondary transition-all active:scale-[0.98]"
          >
            {copied ? <Check className="w-4 h-4 text-status-ok" /> : <Copy className="w-4 h-4" />}
            <span>{locale === "ar" ? "نسخ تقرير الخطأ التشخيصي" : "Copy Diagnostic Log"}</span>
          </button>
        </div>

        {/* Recommended Destinations */}
        <div className="mt-14 w-full max-w-3xl pt-8 border-t border-line text-start">
          <h2 className="text-xs font-mono uppercase tracking-widest text-secondary font-bold mb-4 text-center">
            {locale === "ar" ? "وجهات مقترحة قد تهمك" : "Recommended Destinations"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/projects"
              className="p-4 rounded-xl bg-surface border border-line hover:border-secondary/40 transition-all group flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-secondary">
                <Layers className="w-4 h-4" />
                <span className="font-bold text-sm text-text-primary group-hover:text-secondary transition-colors">
                  {locale === "ar" ? "معرض المشاريع" : "Projects Portfolio"}
                </span>
              </div>
              <p className="text-xs text-text-muted">
                {locale === "ar" ? "استكشف 6 أنظمة رقمية منجزة" : "6 production-ready systems"}
              </p>
            </Link>

            <Link
              to="/blog"
              className="p-4 rounded-xl bg-surface border border-line hover:border-secondary/40 transition-all group flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-secondary">
                <BookOpen className="w-4 h-4" />
                <span className="font-bold text-sm text-text-primary group-hover:text-secondary transition-colors">
                  {locale === "ar" ? "المدونة الهندسية" : "Engineering Journal"}
                </span>
              </div>
              <p className="text-xs text-text-muted">
                {locale === "ar" ? "مقالات SQLite و Fastify والأداء" : "Architecture & database notes"}
              </p>
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-xl bg-surface border border-line hover:border-secondary/40 transition-all group flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-secondary">
                <MessageSquareCode className="w-4 h-4" />
                <span className="font-bold text-sm text-text-primary group-hover:text-secondary transition-colors">
                  {locale === "ar" ? "طلب مشروع أو استشارة" : "Start Project"}
                </span>
              </div>
              <p className="text-xs text-text-muted">
                {locale === "ar" ? "تواصل مباشر مع مهندسينا" : "Direct technical inquiry"}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
