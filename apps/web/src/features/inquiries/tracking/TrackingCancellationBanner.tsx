import React from "react";
import { XCircle } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { TrackInquiryResponse } from "../services/inquiries.service";

interface TrackingCancellationBannerProps {
  data: TrackInquiryResponse;
}

export const TrackingCancellationBanner: React.FC<TrackingCancellationBannerProps> = ({
  data,
}) => {
  const { locale } = useI18n();

  if (data.status !== "cancelled" && data.status !== "rejected") return null;

  return (
    <div className="p-4 rounded-xl bg-err/10 border border-err/30 text-xs space-y-1 text-err text-start">
      <div className="font-bold flex items-center gap-1.5">
        <XCircle className="w-4 h-4" />
        <span>
          {data.status === "cancelled"
            ? locale === "ar"
              ? "تم إلغاء هذا الطلب بناءً على رغبتك"
              : "This request was cancelled by you"
            : locale === "ar"
            ? "تم الاعتذار عن قبول الطلب"
            : "This request was declined"}
        </span>
      </div>
      {data.cancellation_reason && (
        <p className="text-text-primary text-xs leading-relaxed pt-1">
          <span className="font-semibold text-err">
            {locale === "ar" ? "السبب المذكور:" : "Reason:"}
          </span>{" "}
          {data.cancellation_reason}
        </p>
      )}
    </div>
  );
};
