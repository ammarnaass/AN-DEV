import React, { useState } from "react";
import { Share2 } from "lucide-react";

export interface SocialCardsPreviewProps {
  ogImage: string;
  canonicalUrl: string;
  titleAr: string;
  descAr: string;
  onChange: (key: string, val: string) => void;
}

export const SocialCardsPreview: React.FC<SocialCardsPreviewProps> = ({
  ogImage,
  canonicalUrl,
  titleAr,
  descAr,
  onChange,
}) => {
  const [socialPlatform, setSocialPlatform] = useState<
    "whatsapp" | "facebook" | "linkedin" | "x"
  >("whatsapp");

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-line gap-3">
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Share2 className="w-4 h-4 text-secondary" />
            <span>محاكي بطاقات المشاركة على شبكات التواصل (Open Graph Simulator)</span>
          </h3>
          <p className="text-xs text-text-muted">
            كيف تظهر روابطك وصورتك البصرية عند إرسالها على واتساب، فيسبوك، أو تويتر.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-line">
          {(["whatsapp", "facebook", "linkedin", "x"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setSocialPlatform(p)}
              className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-colors ${
                socialPlatform === p
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {p === "x" ? "X / Twitter" : p}
            </button>
          ))}
        </div>
      </div>

      {/* Social Image Setting */}
      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-text-muted font-semibold">
          مسار أو رابط صورة المعاينة الاجتماعية (Open Graph Image URL) *
        </label>
        <input
          type="text"
          value={ogImage}
          onChange={(e) => onChange("seo_og_image", e.target.value)}
          placeholder="/brand/brand-board.webp أو رابط صورة خارجية https://..."
          className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
        />
        <p className="text-[11px] text-text-muted">
          المقاس الموصى به لمحركات البحث وشبكات التواصل: 1200x630 بكسل بدقة عالية.
        </p>
      </div>

      {/* Visual Social Card Mockup */}
      <div className="max-w-md mx-auto sm:mx-0 rounded-2xl overflow-hidden border border-line bg-surface-container shadow-lg">
        <div className="w-full h-48 bg-slate-900 overflow-hidden relative">
          <img
            src={ogImage}
            alt="Social Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/brand/brand-board.webp";
            }}
          />
          <div className="absolute top-2 end-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
            {socialPlatform.toUpperCase()} PREVIEW
          </div>
        </div>

        <div className="p-4 space-y-1.5 text-start bg-surface border-t border-line">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-wider">
            {canonicalUrl.replace(/^https?:\/\//, "")}
          </div>
          <h4 className="text-sm font-bold text-text-primary line-clamp-1">
            {titleAr}
          </h4>
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {descAr}
          </p>
        </div>
      </div>
    </div>
  );
};

