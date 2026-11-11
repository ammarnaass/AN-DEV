import React from "react";
import { Clock } from "lucide-react";
import { InquiryActivityEvent } from "@andev/shared";

interface InquiryActivityLogSectionProps {
  activityLog?: InquiryActivityEvent[];
}

export const InquiryActivityLogSection: React.FC<InquiryActivityLogSectionProps> = ({
  activityLog,
}) => {
  if (!activityLog || activityLog.length === 0) return null;

  return (
    <div className="space-y-3 pt-2 border-t border-line text-start">
      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-text-primary">
        <Clock className="w-4 h-4 text-secondary" />
        <span>سجل التفاعلات والأحداث (Activity Log):</span>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto p-3 rounded-xl bg-surface-container border border-line text-xs font-mono">
        {activityLog.map((event, idx) => (
          <div
            key={event.id || idx}
            className="pb-2 border-b border-line/50 last:border-0 last:pb-0"
          >
            <div className="flex justify-between items-center text-text-muted text-[11px]">
              <span className="font-bold text-secondary">
                [{event.author}] {event.title}
              </span>
              <span>{new Date(event.created_at).toLocaleString("ar-DZ")}</span>
            </div>
            {event.body && (
              <p className="text-text-primary text-xs pt-1 font-sans leading-relaxed">
                {event.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
