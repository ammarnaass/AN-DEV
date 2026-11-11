import React from "react";
import { MessageSquare } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface InquiryRowClientCellProps {
  inquiry: Inquiry;
}

export const InquiryRowClientCell: React.FC<InquiryRowClientCellProps> = ({
  inquiry,
}) => {
  const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9]/g, "") : "";
  const formattedPhone = cleanPhone.startsWith("0") ? `213${cleanPhone.slice(1)}` : cleanPhone;
  const whatsappUrl = cleanPhone ? `https://wa.me/${formattedPhone}` : null;

  return (
    <div className="space-y-1 text-start">
      <div className="font-bold text-text-primary text-sm flex items-center gap-2">
        <span>{inquiry.name}</span>
        {(inquiry.status === "pending" || inquiry.status === "new") && (
          <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
        )}
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <span>{inquiry.email}</span>
        {inquiry.phone && (
          <div className="flex items-center gap-1 text-[11px] text-text-primary">
            <span>· {inquiry.phone}</span>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#25D366] hover:opacity-80"
                title="مراسلة عبر واتساب"
              >
                <MessageSquare className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
      {inquiry.tracking_code && (
        <div className="inline-block px-2 py-0.5 rounded bg-surface-container border border-line text-[11px] font-mono text-secondary font-bold">
          {inquiry.tracking_code}
        </div>
      )}
    </div>
  );
};
