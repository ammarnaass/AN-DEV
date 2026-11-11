import React from "react";
import { MessageSquare } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface InquiryClientInfoGridProps {
  inquiry: Inquiry;
}

export const InquiryClientInfoGrid: React.FC<InquiryClientInfoGridProps> = ({
  inquiry,
}) => {
  const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9]/g, "") : "";
  const formattedPhone = cleanPhone.startsWith("0") ? `213${cleanPhone.slice(1)}` : cleanPhone;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
        `مرحباً ${inquiry.name}، بخصوص طلبك رقم ${inquiry.tracking_code || inquiry.id} في AN DEV:`
      )}`
    : null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container border border-line text-xs font-mono text-start">
      <div>
        <span className="text-text-muted">الاسم:</span>
        <p className="text-text-primary font-bold pt-0.5">{inquiry.name}</p>
      </div>
      <div>
        <span className="text-text-muted">البريد:</span>
        <p className="text-text-primary font-bold pt-0.5 truncate" title={inquiry.email}>
          {inquiry.email}
        </p>
      </div>
      <div>
        <span className="text-text-muted">الهاتف:</span>
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="text-text-primary font-bold">{inquiry.phone || "غير محدد"}</span>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20"
              title="محادثة واتساب مباشرة"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
      <div>
        <span className="text-text-muted">المؤسسة / الشركة:</span>
        <p className="text-text-primary font-bold pt-0.5 truncate">
          {inquiry.company || "عميل فردي"}
        </p>
      </div>
    </div>
  );
};
