import React, { useState, useEffect } from "react";
import { Inquiry } from "@andev/shared";
import { X, Copy, Check } from "lucide-react";
import { InquiryClientInfoGrid } from "./InquiryClientInfoGrid";
import { InquirySpecsDetailCard } from "./InquirySpecsDetailCard";
import { InquiryActivityLogSection } from "./InquiryActivityLogSection";
import { InquiryQuickActionsBar } from "./InquiryQuickActionsBar";
import { InquiryStatusNotesEditor } from "./InquiryStatusNotesEditor";

export interface InquiryDetailsModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onSave: (id: number, status: string, admin_note: string) => Promise<any>;
  isSaving: boolean;
  onOpenApprove?: (inquiry: Inquiry) => void;
  onOpenSchedule?: (inquiry: Inquiry) => void;
  onOpenReject?: (inquiry: Inquiry) => void;
  onOpenDelete?: (inquiry: Inquiry) => void;
}

export const InquiryDetailsModal: React.FC<InquiryDetailsModalProps> = ({
  inquiry,
  onClose,
  onSave,
  isSaving,
  onOpenApprove,
  onOpenSchedule,
  onOpenReject,
  onOpenDelete,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");
  const [noteText, setNoteText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inquiry) {
      setSelectedStatus(inquiry.status);
      setNoteText(inquiry.admin_note || "");
    }
  }, [inquiry]);

  if (!inquiry) return null;

  const handleCopyCode = () => {
    if (!inquiry.tracking_code) return;
    navigator.clipboard.writeText(inquiry.tracking_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave(inquiry.id, selectedStatus, noteText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in text-start">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-modal relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-secondary/15 text-secondary border border-secondary/30">
                {inquiry.request_type === "consultation"
                  ? "طلب استشارة تقنية"
                  : "طلب مشروع برمجيات"}
              </span>
              <h3 className="text-lg font-bold text-text-primary">
                تفاصيل الطلب #{inquiry.id}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span>
                تاريخ الإرسال: {new Date(inquiry.created_at).toLocaleString("ar-DZ")}
              </span>
              {inquiry.tracking_code && (
                <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded border border-line">
                  <span className="text-secondary font-bold">
                    {inquiry.tracking_code}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-0.5 hover:text-text-primary"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-status-ok" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Coordinates */}
        <InquiryClientInfoGrid inquiry={inquiry} />

        {/* Specs & Scope */}
        <InquirySpecsDetailCard inquiry={inquiry} />

        {/* Activity Log History */}
        <InquiryActivityLogSection activityLog={inquiry.activity_log} />

        {/* Quick Action Buttons */}
        <InquiryQuickActionsBar
          inquiry={inquiry}
          onOpenApprove={onOpenApprove}
          onOpenSchedule={onOpenSchedule}
          onOpenReject={onOpenReject}
          onOpenDelete={onOpenDelete}
        />

        {/* Status Dropdown & Notes */}
        <InquiryStatusNotesEditor
          trackingCode={inquiry.tracking_code}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          noteText={noteText}
          onNoteChange={setNoteText}
          isSaving={isSaving}
          onClose={onClose}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};
