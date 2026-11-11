import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { Button } from "../../../components/ui/Button";

interface TrackingCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  isCancelling: boolean;
}

export const TrackingCancelModal: React.FC<TrackingCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isCancelling,
}) => {
  const { locale } = useI18n();
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    await onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in text-start">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 space-y-4 shadow-modal">
        <div className="flex items-center gap-2 text-err font-bold text-base">
          <AlertTriangle className="w-5 h-5" />
          <span>{locale === "ar" ? "تأكيد إلغاء الطلب" : "Confirm Cancellation"}</span>
        </div>
        <p className="text-mute text-xs leading-relaxed">
          {locale === "ar"
            ? "هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ يرجى كتابة سبب الإلغاء لمساعدتنا في تحسين خدماتنا."
            : "Are you sure you want to cancel this request? Please provide a brief reason."}
        </p>
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={locale === "ar" ? "سبب الإلغاء..." : "Reason for cancellation..."}
          className="w-full p-3 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:border-err"
        />
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-mute hover:text-ink"
          >
            {locale === "ar" ? "تراجع" : "Keep Request"}
          </button>
          <Button
            variant="danger"
            isLoading={isCancelling}
            disabled={!reason.trim()}
            onClick={handleConfirm}
          >
            {locale === "ar" ? "تأكيد الإلغاء" : "Confirm Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
};
