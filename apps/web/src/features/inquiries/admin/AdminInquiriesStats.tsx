import React from "react";
import { Briefcase, Brain, Clock, CheckCircle2 } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface AdminInquiriesStatsProps {
  inquiries: Inquiry[];
}

export const AdminInquiriesStats: React.FC<AdminInquiriesStatsProps> = ({
  inquiries,
}) => {
  const countPending = inquiries.filter(
    (i) => i.status === "pending" || i.status === "new"
  ).length;
  const countApproved = inquiries.filter((i) => i.status === "approved").length;
  const countInProgress = inquiries.filter((i) => i.status === "in_progress").length;
  const countProjects = inquiries.filter(
    (i) => i.request_type === "project" || !i.request_type
  ).length;
  const countConsultations = inquiries.filter(
    (i) => i.request_type === "consultation"
  ).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-start">
      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-primary-light" />
          <span>طلبات المشاريع</span>
        </span>
        <div className="text-2xl font-black text-text-primary">{countProjects}</div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-secondary" />
          <span>الاستشارات التقنية</span>
        </span>
        <div className="text-2xl font-black text-secondary">{countConsultations}</div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>جديدة / قيد المراجعة</span>
        </span>
        <div className="text-2xl font-black text-amber-400">{countPending}</div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-status-ok" />
          <span>المعتمدة والمجدولة</span>
        </span>
        <div className="text-2xl font-black text-status-ok">{countApproved}</div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1 col-span-2 sm:col-span-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-secondary" />
          <span>قيد التنفيذ والمتابعة</span>
        </span>
        <div className="text-2xl font-black text-secondary">{countInProgress}</div>
      </div>
    </div>
  );
};
