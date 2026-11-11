import React from "react";
import { useI18n } from "../../../lib/i18n";
import { TrackInquiryResponse } from "../services/inquiries.service";

interface TrackingClientDetailsProps {
  data: TrackInquiryResponse;
  onOpenCancelModal: () => void;
}

export const TrackingClientDetails: React.FC<TrackingClientDetailsProps> = ({
  data,
  onOpenCancelModal,
}) => {
  const { locale } = useI18n();

  return (
    <div className="space-y-4 text-start">
      {/* Client & Request Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container border border-line text-xs font-mono">
        <div>
          <span className="text-mute">{locale === "ar" ? "الاسم:" : "Name:"}</span>
          <p className="text-ink font-bold pt-0.5">{data.name}</p>
        </div>
        <div>
          <span className="text-mute">{locale === "ar" ? "البريد (مشفر):" : "Email (Masked):"}</span>
          <p className="text-ink font-bold pt-0.5">{data.masked_email}</p>
        </div>
        <div>
          <span className="text-mute">{locale === "ar" ? "الهاتف:" : "Phone:"}</span>
          <p className="text-ink font-bold pt-0.5">{data.phone || (locale === "ar" ? "غير محدد" : "N/A")}</p>
        </div>
        <div>
          <span className="text-mute">{locale === "ar" ? "المؤسسة:" : "Company:"}</span>
          <p className="text-ink font-bold pt-0.5">{data.company || (locale === "ar" ? "عميل فردي" : "Individual")}</p>
        </div>
      </div>

      {/* Message Body */}
      <div className="space-y-1.5 text-xs">
        <span className="font-mono text-mute font-semibold">
          {locale === "ar" ? "نص الرسالة والمتطلبات المرسلة:" : "Submitted Scope & Requirements:"}
        </span>
        <div className="p-4 rounded-xl bg-bg border border-line text-ink leading-relaxed whitespace-pre-wrap text-sm">
          {data.message}
        </div>
      </div>

      {/* Interactive Cancel Button */}
      {data.status !== "cancelled" && data.status !== "completed" && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
          <button
            type="button"
            onClick={onOpenCancelModal}
            className="px-4 py-2 rounded-lg bg-err/10 border border-err/30 text-err hover:bg-err/20 text-xs font-semibold transition-colors"
          >
            {locale === "ar" ? "إلغاء هذا الطلب" : "Cancel Request"}
          </button>

          <div className="text-xs text-mute font-mono">
            {locale === "ar"
              ? "هل لديك استفسار أو إضافة؟ يمكنك مراسلة الفريق أدناه."
              : "Need to add details? You can post a message below."}
          </div>
        </div>
      )}
    </div>
  );
};
