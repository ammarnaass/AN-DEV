import React, { useState } from "react";
import { Inquiry } from "@andev/shared";
import { DollarSign, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface ApproveInquiryModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onApprove: (id: number, quote_amount: string, estimated_timeline: string, admin_note?: string) => Promise<any>;
  isApproving: boolean;
}

export const ApproveInquiryModal: React.FC<ApproveInquiryModalProps> = ({
  inquiry,
  onClose,
  onApprove,
  isApproving,
}) => {
  const [quoteAmount, setQuoteAmount] = useState(inquiry?.budget_range || "");
  const [timeline, setTimeline] = useState("4 إلى 6 أسابيع");
  const [adminNote, setAdminNote] = useState("");

  if (!inquiry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteAmount.trim() || !timeline.trim()) return;
    onApprove(inquiry.id, quoteAmount, timeline, adminNote);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in text-start">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-modal relative">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="flex items-center gap-2 text-ok">
            <DollarSign className="w-5 h-5" />
            <h3 className="text-lg font-bold text-text-primary">
              الموافقة على المشروع وإرسال العرض #{inquiry.id}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-surface-container border border-line text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-text-muted">العميل: <strong className="text-text-primary">{inquiry.name}</strong></span>
            <span className="text-secondary font-bold">{inquiry.tracking_code}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="space-y-1.5 text-start">
            <label className="block text-text-muted font-semibold">
              عرض السعر المعتمد (Quotation Amount) <span className="text-err">*</span>
            </label>
            <input
              type="text"
              required
              value={quoteAmount}
              onChange={e => setQuoteAmount(e.target.value)}
              placeholder="مثال: 350,000 دج أو 2,500 USD"
              className="w-full h-10 px-3 rounded-lg border border-line bg-bg text-text-primary text-sm focus:outline-none focus:border-ok"
            />
          </div>

          <div className="space-y-1.5 text-start">
            <label className="block text-text-muted font-semibold">
              المدة التقديرية للتسليم (Estimated Timeline) <span className="text-err">*</span>
            </label>
            <input
              type="text"
              required
              value={timeline}
              onChange={e => setTimeline(e.target.value)}
              placeholder="مثال: 4 إلى 6 أسابيع"
              className="w-full h-10 px-3 rounded-lg border border-line bg-bg text-text-primary text-sm focus:outline-none focus:border-ok"
            />
          </div>

          <div className="space-y-1.5 text-start">
            <label className="block text-text-muted font-semibold">
              ملاحظات وشروط العرض الموجهة للعميل:
            </label>
            <textarea
              rows={3}
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              placeholder="شروط الدفع، نطاق العمل المتفق عليه، والمراحل الأساسية..."
              className="w-full p-3 rounded-lg border border-line bg-bg text-text-primary text-sm focus:outline-none focus:border-ok font-sans"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              إلغاء
            </button>
            <Button type="submit" variant="primary" isLoading={isApproving}>
              اعتماد وإرسال العرض للعميل
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

