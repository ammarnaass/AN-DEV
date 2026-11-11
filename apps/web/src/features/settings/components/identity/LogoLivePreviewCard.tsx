import React from "react";
import { LayoutGrid } from "lucide-react";
import { Logo } from "../../../../components/layout/Logo";

export interface LogoLivePreviewCardProps {
  customImage: string;
  namePrefix: string;
  nameSuffix: string;
  tagline: string;
  displayMode: "full" | "icon_text" | "image_only" | "icon_only";
}

export const LogoLivePreviewCard: React.FC<LogoLivePreviewCardProps> = ({
  customImage,
  namePrefix,
  nameSuffix,
  tagline,
  displayMode,
}) => {
  return (
    <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-xl bg-surface-container/60 border border-line p-5 text-start">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5" />
            معاينة حية فورية (Live Preview)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-line text-text-muted">
            {displayMode}
          </span>
        </div>

        {/* Dark Mode Header Preview */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-mono text-text-muted block">
            1. المظهر في الشريط العلوي (الوضع الداكن):
          </span>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <Logo
              size={36}
              customImage={customImage}
              namePrefix={namePrefix}
              nameSuffix={nameSuffix}
              tagline={tagline}
              displayMode={displayMode}
            />
            <span className="text-[10px] font-mono text-slate-500">36px</span>
          </div>
        </div>

        {/* Light Mode Header Preview */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-mono text-text-muted block">
            2. المظهر في الخلفيات الفاتحة:
          </span>
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
            <Logo
              size={36}
              customImage={customImage}
              namePrefix={namePrefix}
              nameSuffix={nameSuffix}
              tagline={tagline}
              displayMode={displayMode}
            />
            <span className="text-[10px] font-mono text-slate-400">36px</span>
          </div>
        </div>

        {/* Large Footer Size Preview */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-text-muted block">
            3. المظهر في تذييل الموقع (حجم كبير):
          </span>
          <div className="p-4 rounded-xl bg-surface border border-line flex items-center justify-between">
            <Logo
              size={42}
              customImage={customImage}
              namePrefix={namePrefix}
              nameSuffix={nameSuffix}
              tagline={tagline}
              displayMode={displayMode}
            />
            <span className="text-[10px] font-mono text-text-muted">42px</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-line text-[11px] text-text-muted flex items-center justify-between">
        <span>الحالة: {customImage ? "شعار مخصص نشط" : "الشعار الرسمي الافتراضي"}</span>
        <span className="text-secondary font-mono text-[10px]">AUTO_RENDER</span>
      </div>
    </div>
  );
};

