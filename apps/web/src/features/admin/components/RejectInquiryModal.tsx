import React, { useState } from "react";
import { Inquiry } from "@andev/shared";
import { XCircle, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface RejectInquiryModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onReject: (id: number, reason: string) => Promise<any>;
  isRejecting: boolean;
}

export const RejectInquiryModal: React.FC<RejectInquiryModalProps> = ({
  inquiry,
  onClose,
  onReject,
  isRejecting,
}) => {
  const [reason, setReason] = useState("");

  if (!inquiry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onReject(inquiry.id, reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in text-start">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 space-y-4 shadow-modal">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-2 text-err">
            <XCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-text-primary">
              الاعتذار عن قبول الطلب #{inquiry.id}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          سيتم تحويل حالة الطلب إلى (مرفوض / معتذر عنه)، وسيتمكن العميل من رؤية سبب الاعتذار عبر رابط التتبع.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-start">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              سبب الاعتذار أو عدم التوافق <span className="text-err">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="مثال: نعتذر عن قبول المشروع حالياً لعدم توفر جدول زمني ملائم للموعد المطلوب..."
              className="w-full p-3 rounded-lg border border-line bg-bg text-text-primary text-xs focus:outline-none focus:border-err"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              إلغاء
            </button>
            <Button type="submit" variant="danger" isLoading={isRejecting} disabled={!reason.trim()}>
              تسجيل الاعتذار
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

