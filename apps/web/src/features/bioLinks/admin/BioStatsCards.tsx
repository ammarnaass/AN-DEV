import React from "react";
import { Link2, MousePointerClick, CheckCircle2, Sparkles } from "lucide-react";

interface BioStatsCardsProps {
  totalLinks: number;
  totalClicks: number;
  activeLinks: number;
  topPerformerTitle?: string;
}

export const BioStatsCards: React.FC<BioStatsCardsProps> = ({
  totalLinks,
  totalClicks,
  activeLinks,
  topPerformerTitle,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5 text-secondary" />
          <span>إجمالي الروابط</span>
        </span>
        <div className="text-2xl font-black text-text-primary">{totalLinks}</div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <MousePointerClick className="w-3.5 h-3.5 text-secondary" />
          <span>إجمالي النقرات المجمعة</span>
        </span>
        <div className="text-2xl font-black text-secondary font-mono">
          {totalClicks.toLocaleString()}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-status-ok" />
          <span>الروابط النشطة</span>
        </span>
        <div className="text-2xl font-black text-status-ok">{activeLinks}</div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>الأكثر تفاعلاً</span>
        </span>
        <div className="text-xs sm:text-sm font-bold text-text-primary truncate">
          {topPerformerTitle || "لا توجد نقرات"}
        </div>
      </div>
    </div>
  );
};
