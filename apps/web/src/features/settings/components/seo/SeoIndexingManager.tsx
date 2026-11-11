import React, { useState } from "react";
import { Compass, Check, Copy, ExternalLink } from "lucide-react";

export interface SeoIndexingManagerProps {
  robotsDirective: string;
  googleToken: string;
  bingToken: string;
  canonicalUrl: string;
  onChange: (key: string, val: string) => void;
}

export const SeoIndexingManager: React.FC<SeoIndexingManagerProps> = ({
  robotsDirective,
  googleToken,
  bingToken,
  canonicalUrl,
  onChange,
}) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Indexing Switch */}
      <div className="p-4 rounded-xl bg-surface-container border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Compass className="w-4 h-4 text-secondary" />
            <span>حالة الفهرسة العامة لمحركات البحث (Search Engines Crawling)</span>
          </div>
          <p className="text-xs text-text-muted">
            عند التفعيل، يسمح لـ Google و Bing وأرشفة الويب بفهرسة كافة صفحات الموقع وعرضها للمستخدمين.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const nextVal = robotsDirective.includes("noindex")
              ? "index, follow"
              : "noindex, nofollow";
            onChange("seo_robots_indexing", nextVal);
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            robotsDirective.includes("noindex")
              ? "bg-status-danger/15 text-status-danger border border-status-danger/30"
              : "bg-status-ok/15 text-status-ok border border-status-ok/30"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span>
            {robotsDirective.includes("noindex")
              ? "الفهرسة محجوبة (NoIndex)"
              : "الفهرسة مفعلة (Index, Follow)"}
          </span>
        </button>
      </div>

      {/* Verification Tokens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            رمز التحقق من Google Search Console (Verification Token)
          </label>
          <input
            type="text"
            dir="ltr"
            value={googleToken}
            onChange={(e) => onChange("seo_google_verification", e.target.value)}
            placeholder="google-site-verification=abc123xyz..."
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
          <p className="text-[11px] text-text-muted">
            يُضاف تلقائياً في وسم &lt;meta name="google-site-verification"&gt; لإثبات ملكية النطاق.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            رمز التحقق من Bing Webmaster Tools (msvalidate.01)
          </label>
          <input
            type="text"
            dir="ltr"
            value={bingToken}
            onChange={(e) => onChange("seo_bing_verification", e.target.value)}
            placeholder="msvalidate.01 token..."
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
          <p className="text-[11px] text-text-muted">
            لتفعيل الزحف والفهرسة على محرك Bing ومساعد Copilot.
          </p>
        </div>
      </div>

      {/* Canonical & Sitemap Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            الرابط الكنسي المعتمد للموقع (Canonical Domain URL)
          </label>
          <input
            type="text"
            dir="ltr"
            value={canonicalUrl}
            onChange={(e) => onChange("seo_canonical_url", e.target.value)}
            placeholder="https://andev.dz"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
          <p className="text-[11px] text-text-muted">
            النطاق الرئيسي لتفادي المحتوى المكرر في Google.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            خريطة الموقع المباشرة (Sitemap.xml Feed)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              dir="ltr"
              readOnly
              value={`${canonicalUrl}/sitemap.xml`}
              className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container/60 text-secondary text-sm font-mono focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleCopy(`${canonicalUrl}/sitemap.xml`, "sitemap")}
              className="h-11 px-3.5 rounded-lg border border-line bg-surface-container hover:bg-surface-container-high transition-colors text-xs font-semibold text-text-primary shrink-0 flex items-center gap-1.5"
              title="نسخ الرابط"
            >
              {copiedLink === "sitemap" ? (
                <Check className="w-4 h-4 text-status-ok" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copiedLink === "sitemap" ? "تم!" : "نسخ"}</span>
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="h-11 px-3.5 rounded-lg border border-line bg-surface-container hover:bg-surface-container-high transition-colors text-xs font-semibold text-text-primary shrink-0 flex items-center gap-1.5"
              title="فتح في تبويب جديد"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

