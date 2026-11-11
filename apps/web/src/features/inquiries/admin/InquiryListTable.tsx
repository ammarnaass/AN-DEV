import React from "react";
import { Inquiry } from "@andev/shared";
import { InquiryRowClientCell } from "./InquiryRowClientCell";
import { InquiryRowSpecsCell } from "./InquiryRowSpecsCell";
import { InquiryRowStatusCell } from "./InquiryRowStatusCell";
import { InquiryRowActionsCell } from "./InquiryRowActionsCell";

export interface InquiryListTableProps {
  inquiries: Inquiry[];
  isLoading: boolean;
  onSelectInquiry: (inquiry: Inquiry) => void;
  onApproveInquiry?: (inquiry: Inquiry) => void;
  onScheduleConsultation?: (inquiry: Inquiry) => void;
  onRejectInquiry?: (inquiry: Inquiry) => void;
  onDeleteInquiry?: (inquiry: Inquiry) => void;
}

export const InquiryListTable: React.FC<InquiryListTableProps> = ({
  inquiries,
  isLoading,
  onSelectInquiry,
  onApproveInquiry,
  onScheduleConsultation,
  onRejectInquiry,
  onDeleteInquiry,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-surface border border-line" />
        ))}
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="py-16 text-center text-text-muted text-sm border border-line rounded-xl bg-surface/30">
        لا توجد طلبات مشاريع أو استشارات تطابق الفلتر المحدد.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-surface-container border-b border-line text-xs font-mono text-text-muted">
            <tr>
              <th className="p-4 text-start">العميل وكود التتبع</th>
              <th className="p-4 text-start">نوع الطلب والمواصفات</th>
              <th className="p-4 text-center">الحالة</th>
              <th className="p-4 text-start">تاريخ الورود</th>
              <th className="p-4 text-center">إجراءات سريعة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {inquiries.map((inq) => (
              <tr
                key={inq.id}
                onClick={() => onSelectInquiry(inq)}
                className="hover:bg-surface-elevated/50 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <InquiryRowClientCell inquiry={inq} />
                </td>
                <td className="p-4">
                  <InquiryRowSpecsCell inquiry={inq} />
                </td>
                <td className="p-4">
                  <InquiryRowStatusCell status={inq.status} />
                </td>
                <td className="p-4 text-xs font-mono text-text-muted text-start whitespace-nowrap">
                  {new Date(inq.created_at).toLocaleDateString("ar-DZ")}
                </td>
                <td className="p-4">
                  <InquiryRowActionsCell
                    inquiry={inq}
                    onApproveInquiry={onApproveInquiry}
                    onScheduleConsultation={onScheduleConsultation}
                    onRejectInquiry={onRejectInquiry}
                    onDeleteInquiry={onDeleteInquiry}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
