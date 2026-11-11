import React from "react";
import { DollarSign, Calendar, Video } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { TrackInquiryResponse } from "../services/inquiries.service";

interface TrackingDecisionBannerProps {
  data: TrackInquiryResponse;
}

export const TrackingDecisionBanner: React.FC<TrackingDecisionBannerProps> = ({
  data,
}) => {
  const { locale } = useI18n();

  if (data.status !== "approved") return null;

  // Project Approval Details
  if (data.request_type === "project" && data.quote_amount) {
    return (
      <div className="p-5 rounded-xl border border-ok/30 bg-ok/5 space-y-3 text-start">
        <div className="flex items-center gap-2 text-ok font-bold text-sm">
          <DollarSign className="w-4 h-4" />
          <span>
            {locale === "ar"
              ? "عرض السعر والجدول الزمني المعتمد"
              : "Approved Quotation & Timeline"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-surface border border-line">
            <span className="text-mute">
              {locale === "ar" ? "الميزانية المعتمدة:" : "Quoted Amount:"}
            </span>
            <p className="text-ink font-bold text-base pt-0.5">{data.quote_amount}</p>
          </div>
          <div className="p-3 rounded-lg bg-surface border border-line">
            <span className="text-mute">
              {locale === "ar" ? "المدة التقديرية للتسليم:" : "Estimated Timeline:"}
            </span>
            <p className="text-ink font-bold text-base pt-0.5">
              {data.estimated_timeline || "حسب الاتفاق"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Consultation Session Details
  if (data.request_type === "consultation") {
    return (
      <div className="p-5 rounded-xl border border-secondary/30 bg-secondary/5 space-y-3 text-start">
        <div className="flex items-center gap-2 text-secondary font-bold text-sm">
          <Calendar className="w-4 h-4" />
          <span>
            {locale === "ar"
              ? "تفاصيل جلسة الاستشارة المؤكدة"
              : "Confirmed Consultation Session"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-surface border border-line">
            <span className="text-mute">
              {locale === "ar" ? "الموعد والتوقيت:" : "Date & Time:"}
            </span>
            <p className="text-ink font-bold pt-0.5">
              {data.confirmed_datetime
                ? new Date(data.confirmed_datetime).toLocaleString("ar-DZ")
                : data.preferred_date || "قريباً"}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-surface border border-line">
            <span className="text-mute">
              {locale === "ar" ? "وسيلة اللقاء:" : "Meeting Mode:"}
            </span>
            <p className="text-ink font-bold pt-0.5">
              {data.meeting_mode || "Google Meet"}
            </p>
          </div>
        </div>

        {data.meeting_link && (
          <div className="pt-2">
            <a
              href={data.meeting_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-secondary/90 transition-all shadow-sm"
            >
              <Video className="w-4 h-4" />
              <span>
                {locale === "ar"
                  ? "الانضمام لاجتماع Google Meet"
                  : "Join Google Meet"}
              </span>
            </a>
          </div>
        )}
      </div>
    );
  }

  return null;
};
