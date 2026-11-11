import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface SeoHealthRadarProps {
  titleLength: number;
  descLength: number;
  isTitleOptimal: boolean;
  isDescOptimal: boolean;
}

export const SeoHealthRadar: React.FC<SeoHealthRadarProps> = ({
  titleLength,
  descLength,
  isTitleOptimal,
  isDescOptimal,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-surface-container/60 border border-line text-start">
      <div className="space-y-1">
        <div className="text-[11px] font-mono text-text-muted">عنوان جوجل (Title)</div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold font-mono ${
              isTitleOptimal ? "text-status-ok" : "text-amber-400"
            }`}
          >
            {titleLength} / 60 حرف
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              isTitleOptimal ? "bg-status-ok" : "bg-amber-400 animate-pulse"
            }`}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-[11px] font-mono text-text-muted">الوصف التعريفي (Snippet)</div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold font-mono ${
              isDescOptimal ? "text-status-ok" : "text-amber-400"
            }`}
          >
            {descLength} / 160 حرف
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              isDescOptimal ? "bg-status-ok" : "bg-amber-400 animate-pulse"
            }`}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-[11px] font-mono text-text-muted">الاستهداف الجغرافي</div>
        <div className="text-xs font-bold text-text-primary font-mono flex items-center gap-1">
          <span>الجزائر (DZ-16)</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-[11px] font-mono text-text-muted">بيانات Schema.org</div>
        <div className="text-xs font-bold text-secondary font-mono flex items-center gap-1">
          <span>Organization + Local</span>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

