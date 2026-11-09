import React, { useState } from "react";
import { Inquiry } from "@andev/shared";
import { MessageSquare, RefreshCw, Download } from "lucide-react";
import { useAdminInquiries } from "../hooks/useAdminInquiries";
import { InquiryListTable } from "../components/InquiryListTable";
import { InquiryDetailsModal } from "../components/InquiryDetailsModal";

export const AdminInquiriesPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const { inquiries, isLoading, refetch, updateStatus, isUpdating } = useAdminInquiries(statusFilter);

  const handleExportCsv = () => {
    if (inquiries.length === 0) return;
    const headers = ["ID", "Name", "Email", "Project Type", "Budget", "Status", "Created At", "Message"];
    const rows = inquiries.map(i => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      i.email,
      i.project_type,
      `"${i.budget_range || ""}"`,
      i.status,
      i.created_at,
      `"${i.message.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `andev_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const countNew = inquiries.filter(i => i.status === "new").length;
  const countInProgress = inquiries.filter(i => i.status === "in_progress").length;
  const countClosed = inquiries.filter(i => i.status === "closed").length;

  const filters = [
    { id: "all", label: "جميع الطلبات", count: inquiries.length },
    { id: "new", label: "جديد", count: countNew },
    { id: "in_progress", label: "قيد المتابعة", count: countInProgress },
    { id: "closed", label: "مغلق", count: countClosed }
  ];

  const handleSaveModal = async (id: number, status: string, admin_note: string) => {
    await updateStatus({ id, status, admin_note });
    setSelectedInquiry(null);
  };

  return (
    <div className="space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>INQUIRY_PIPELINE // CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            إدارة طلبات المشاريع والاستشارات
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            متابعة استفسارات العملاء الواردة من الموقع، تحديث الحالات وإضافة ملاحظات التقييم المعماري.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary hover:border-secondary/40 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-secondary" />
            <span>تحديث</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_12px_rgba(13,110,253,0.35)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs with Live Badges */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setStatusFilter(f.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              statusFilter === f.id
                ? "bg-primary-container text-white shadow-sm"
                : "bg-surface border border-line text-text-muted hover:text-text-primary"
            }`}
          >
            <span>{f.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] ${
                statusFilter === f.id
                  ? "bg-white/20 text-white font-bold"
                  : "bg-surface-container text-text-muted"
              }`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <InquiryListTable
        inquiries={inquiries}
        isLoading={isLoading}
        onSelectInquiry={setSelectedInquiry}
      />

      {/* Details Modal */}
      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onSave={handleSaveModal}
        isSaving={isUpdating}
      />
    </div>
  );
};
