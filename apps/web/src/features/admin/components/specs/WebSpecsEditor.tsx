import React from "react";
import { WebSpecs } from "@andev/shared";
import { Globe, Server, Cpu, Smartphone, Check } from "lucide-react";

interface WebSpecsEditorProps {
  specs: Partial<WebSpecs>;
  onChange: (specs: Partial<WebSpecs>) => void;
  liveUrl: string;
  onLiveUrlChange: (url: string) => void;
  enableLivePreview: boolean;
  onEnableLivePreviewChange: (val: boolean) => void;
}

export const WebSpecsEditor: React.FC<WebSpecsEditorProps> = ({
  specs,
  onChange,
  liveUrl,
  onLiveUrlChange,
  enableLivePreview,
  onEnableLivePreviewChange
}) => {
  const updateSpec = <K extends keyof WebSpecs>(key: K, val: WebSpecs[K]) => {
    onChange({ ...specs, [key]: val });
  };

  return (
    <div className="space-y-4 p-4 rounded-xl border border-line bg-surface-container/30 animate-fadeIn text-start">
      <div className="flex items-center gap-2 pb-2 border-b border-line text-xs font-mono font-bold text-secondary uppercase">
        <Globe className="w-4 h-4" />
        <span>تخصيص منصة ويب وسحابية (Web App & SaaS Specs)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Live URL */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">رابط المنصة الحية (Live URL) *</label>
          <input
            type="text"
            value={liveUrl}
            onChange={e => onLiveUrlChange(e.target.value)}
            placeholder="https://app.example.dz"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Hosting Environment */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <Server className="w-3.5 h-3.5 text-secondary" />
            <span>بيئة الاستضافة والسحابة</span>
          </label>
          <input
            type="text"
            value={specs.hosting_env || ""}
            onChange={e => updateSpec("hosting_env", e.target.value)}
            placeholder="مثال: Vercel Edge / AWS Cloud / Cloudflare"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Web Architecture */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <Cpu className="w-3.5 h-3.5 text-secondary" />
            <span>معمارية المنصة (Architecture)</span>
          </label>
          <input
            type="text"
            value={specs.architecture || ""}
            onChange={e => updateSpec("architecture", e.target.value)}
            placeholder="مثال: Next.js SSR / React SPA + Fastify Microservices"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* PWA / Offline Ready Toggle */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">دعم تثبيت الويب (PWA)</label>
          <button
            type="button"
            onClick={() => updateSpec("pwa_ready", !specs.pwa_ready)}
            className={`w-full h-10 flex items-center justify-between px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              specs.pwa_ready
                ? "bg-secondary/15 border-secondary text-text-primary"
                : "bg-surface border-line text-text-muted hover:border-secondary/40"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-secondary" />
              <span>جاهز كتطبيق ويب تقدمي (PWA Ready)</span>
            </div>
            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] font-bold ${
              specs.pwa_ready ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
            }`}>
              {specs.pwa_ready && <Check className="w-3 h-3" />}
            </div>
          </button>
        </div>
      </div>

      {/* Live Preview Gateway Toggle */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onEnableLivePreviewChange(!enableLivePreview)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            enableLivePreview
              ? "bg-secondary/15 border-secondary text-text-primary ring-1 ring-secondary/30"
              : "bg-surface border-line text-text-muted hover:border-secondary/40"
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-secondary shrink-0" />
            <div className="flex flex-col text-start">
              <span>تفعيل بوابة المعاينة الحية التفاعلية (Live Iframe Sandbox Gateway)</span>
              <span className="text-[10px] text-text-muted font-normal">
                تمكّن الزوار من تجربة الموقع مباشرة داخل محاكي شاشات (كمبيوتر، لوحي، هاتف)
              </span>
            </div>
          </div>
          <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] font-bold ${
            enableLivePreview ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
          }`}>
            {enableLivePreview && <Check className="w-3 h-3" />}
          </div>
        </button>
      </div>
    </div>
  );
};

