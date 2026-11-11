import React from "react";
import { Clock } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { InquiryActivityEvent } from "@andev/shared";

interface TrackingTimelineProps {
  activityLog?: InquiryActivityEvent[];
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  activityLog,
}) => {
  const { locale } = useI18n();

  if (!activityLog || activityLog.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-4 shadow-sm text-start">
      <div className="flex items-center gap-2 text-ink font-bold text-sm border-b border-line pb-3">
        <Clock className="w-4 h-4 text-secondary" />
        <span>
          {locale === "ar"
            ? "سجل الأحداث ومراحل معالجة الطلب"
            : "Request Processing Timeline"}
        </span>
      </div>
      <div className="space-y-4 pt-2">
        {activityLog.map((event, idx) => (
          <div key={event.id || idx} className="flex items-start gap-3 text-xs font-mono">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-ink">{event.title}</span>
                <span className="text-mute text-[11px]">
                  {new Date(event.created_at).toLocaleString("ar-DZ")}
                </span>
              </div>
              {event.body && (
                <p className="text-mute font-sans text-xs whitespace-pre-wrap leading-relaxed">
                  {event.body}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
