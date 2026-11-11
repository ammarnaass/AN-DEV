import React, { useState } from "react";
import { Inquiry } from "@andev/shared";
import {
  MessageSquare,
  RefreshCw,
  Download,
  Search,
  Briefcase,
  Brain
} from "lucide-react";
import { useAdminInquiries } from "../hooks/useAdminInquiries";
import { InquiryListTable } from "../components/InquiryListTable";
import { InquiryDetailsModal } from "../components/InquiryDetailsModal";
import { ApproveInquiryModal } from "../components/ApproveInquiryModal";
import { ScheduleConsultationModal } from "../components/ScheduleConsultationModal";
import { RejectInquiryModal } from "../components/RejectInquiryModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

export const AdminInquiriesPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryToApprove, setInquiryToApprove] = useState<Inquiry | null>(null);
  const [inquiryToSchedule, setInquiryToSchedule] = useState<Inquiry | null>(null);
  const [inquiryToReject, setInquiryToReject] = useState<Inquiry | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);

  const {
    inquiries,
    isLoading,
    refetch,
    updateStatus,
    isUpdating,
    approveProject,
    isApproving,
    scheduleConsultation,
    isScheduling,
    rejectInquiry,
    isRejecting,
    deleteInquiry,
    isDeleting,
  } = useAdminInquiries(statusFilter, typeFilter, searchQuery);

  const handleExportCsv = () => {
    if (inquiries.length === 0) return;
    const headers = [
      "ID",
      "Tracking Code",
      "Type",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Project/Domain",
      "Budget/Date",
      "Quote",
      "Status",
      "Created At",
      "Message"
    ];
    const rows = inquiries.map(i => [
      i.id,
      `"${i.tracking_code || ""}"`,
      i.request_type || "project",
      `"${i.name.replace(/"/g, '""')}"`,
      i.email,
      `"${i.phone || ""}"`,
      `"${(i.company || "").replace(/"/g, '""')}"`,
      `"${(i.request_type === "consultation" ? i.consultation_domain : i.project_type) || ""}"`,
      `"${(i.request_type === "consultation" ? i.preferred_date : i.budget_range) || ""}"`,
      `"${i.quote_amount || ""}"`,
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

  const countPending = inquiries.filter(i => i.status === "pending" || i.status === "new").length;
  const countApproved = inquiries.filter(i => i.status === "approved").length;
  const countInProgress = inquiries.filter(i => i.status === "in_progress").length;
  const countCompleted = inquiries.filter(i => i.status === "completed").length;
  const countCancelled = inquiries.filter(i => i.status === "cancelled" || i.status === "rejected" || i.status === "closed").length;

  const countProjects = inquiries.filter(i => i.request_type === "project" || !i.request_type).length;
  const countConsultations = inquiries.filter(i => i.request_type === "consultation").length;

  const filters = [
    { id: "all", label: "جميع الطلبات", count: inquiries.length },
    { id: "pending", label: "جديد / قيد المراجعة", count: countPending },
    { id: "approved", label: "موافق عليه / مؤكد", count: countApproved },
    { id: "in_progress", label: "قيد المتابعة", count: countInProgress },
    { id: "completed", label: "مكتمل", count: countCompleted },
    { id: "cancelled", label: "ملغى / مرفوض", count: countCancelled }
  ];

  const handleSaveModal = async (id: number, status: string, admin_note: string) => {
    await updateStatus({ id, status, admin_note });
    setSelectedInquiry(null);
  };

  const handleApproveProject = async (id: number, quote_amount: string, estimated_timeline: string, admin_note?: string) => {
    await approveProject({ id, quote_amount, estimated_timeline, admin_note });
    setInquiryToApprove(null);
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
  };

  const handleScheduleConsultation = async (
    id: number,
    confirmed_datetime: string,
    meeting_mode: string,
    meeting_link?: string,
    admin_note?: string
  ) => {
    await scheduleConsultation({ id, confirmed_datetime, meeting_mode, meeting_link, admin_note });
    setInquiryToSchedule(null);
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
  };

  const handleReject = async (id: number, reason: string) => {
    await rejectInquiry({ id, reason });
    setInquiryToReject(null);
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
  };

  const handleDelete = async () => {
    if (!inquiryToDelete) return;
    await deleteInquiry(inquiryToDelete.id);
    setInquiryToDelete(null);
    if (selectedInquiry?.id === inquiryToDelete.id) setSelectedInquiry(null);
  };

  return (
    <div className="space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>INQUIRY_PIPELINE // CRM & CONSULTATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            إدارة طلبات المشاريع والاستشارات
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            نظام متكامل لمعالجة طلبات التطوير، حجز الاستشارات التقنية، إرسال عروض الأسعار والمواعيد، والتفاعل مع العملاء.
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
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-[0_0_12px_rgba(13,110,253,0.35)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm space-y-1">
          <span className="text-xs font-mono text-text-muted">إجمالي الطلبات</span>
          <p className="text-2xl font-extrabold text-text-primary">{inquiries.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm space-y-1">
          <span className="text-xs font-mono text-status-warn">قيد المراجعة (جديد)</span>
          <p className="text-2xl font-extrabold text-status-warn">{countPending}</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm space-y-1">
          <span className="text-xs font-mono text-ok">موافق عليه / مؤكد</span>
          <p className="text-2xl font-extrabold text-ok">{countApproved}</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm space-y-1">
          <span className="text-xs font-mono text-secondary">استشارات معمارية</span>
          <p className="text-2xl font-extrabold text-secondary">{countConsultations}</p>
        </div>
      </div>

      {/* Stream Tabs: All vs Projects vs Consultations */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex gap-2 p-1 rounded-xl bg-surface-container border border-line self-start">
          <button
            onClick={() => setTypeFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              typeFilter === "all" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            }`}
          >
            جميع المسارات ({inquiries.length})
          </button>
          <button
            onClick={() => setTypeFilter("project")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              typeFilter === "project" ? "bg-primary-container text-white shadow-sm" : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>طلبات المشاريع ({countProjects})</span>
          </button>
          <button
            onClick={() => setTypeFilter("consultation")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              typeFilter === "consultation" ? "bg-secondary text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>الاستشارات التقنية ({countConsultations})</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، الكود، الهاتف، البريد..."
            className="w-full h-10 px-3 ps-9 rounded-lg border border-line bg-surface text-text-primary text-xs focus:outline-none focus:border-secondary"
          />
          <Search className="w-4 h-4 text-text-muted absolute start-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Status Filter Pills */}
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
        onApproveInquiry={setInquiryToApprove}
        onScheduleConsultation={setInquiryToSchedule}
        onRejectInquiry={setInquiryToReject}
        onDeleteInquiry={setInquiryToDelete}
      />

      {/* Modals */}
      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onSave={handleSaveModal}
        isSaving={isUpdating}
        onOpenApprove={setInquiryToApprove}
        onOpenSchedule={setInquiryToSchedule}
        onOpenReject={setInquiryToReject}
        onOpenDelete={setInquiryToDelete}
      />

      <ApproveInquiryModal
        inquiry={inquiryToApprove}
        onClose={() => setInquiryToApprove(null)}
        onApprove={handleApproveProject}
        isApproving={isApproving}
      />

      <ScheduleConsultationModal
        inquiry={inquiryToSchedule}
        onClose={() => setInquiryToSchedule(null)}
        onSchedule={handleScheduleConsultation}
        isScheduling={isScheduling}
      />

      <RejectInquiryModal
        inquiry={inquiryToReject}
        onClose={() => setInquiryToReject(null)}
        onReject={handleReject}
        isRejecting={isRejecting}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(inquiryToDelete)}
        title="تأكيد الحذف النهائي للطلب"
        message={`هل أنت متأكد من حذف طلب العميل "${inquiryToDelete?.name}" (${inquiryToDelete?.tracking_code || inquiryToDelete?.id}) نهائياً من قاعدة البيانات؟\n\nتحذير: هذا إجراء حقيقي لا يمكن التراجع عنه.`}
        onClose={() => setInquiryToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};
