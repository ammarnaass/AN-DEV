import React, { useState } from "react";
import { Inquiry } from "@andev/shared";
import { useAdminInquiries } from "../hooks/useAdminInquiries";
import { AdminInquiriesHeader } from "../admin/AdminInquiriesHeader";
import { AdminInquiriesStats } from "../admin/AdminInquiriesStats";
import { AdminInquiriesFilters } from "../admin/AdminInquiriesFilters";
import { InquiryListTable } from "../admin/InquiryListTable";
import { InquiryDetailsModal } from "../admin/InquiryDetailsModal";
import { ApproveInquiryModal } from "../../admin/components/ApproveInquiryModal";
import { ScheduleConsultationModal } from "../../admin/components/ScheduleConsultationModal";
import { RejectInquiryModal } from "../../admin/components/RejectInquiryModal";
import { ConfirmDeleteModal } from "../../admin/components/ConfirmDeleteModal";

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
      "Message",
    ];
    const rows = inquiries.map((i) => [
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
      `"${i.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `andev_inquiries_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApproveProject = async (
    id: number,
    quote_amount: string,
    estimated_timeline: string,
    admin_note?: string
  ) => {
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
    await scheduleConsultation({
      id,
      confirmed_datetime,
      meeting_mode,
      meeting_link,
      admin_note,
    });
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
      <AdminInquiriesHeader
        onRefresh={() => refetch()}
        isLoading={isLoading}
        onExportCsv={handleExportCsv}
        hasInquiries={inquiries.length > 0}
      />

      {/* Stats Cards */}
      <AdminInquiriesStats inquiries={inquiries} />

      {/* Filters & Search */}
      <AdminInquiriesFilters
        inquiries={inquiries}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {/* Inquiries Table */}
      <InquiryListTable
        inquiries={inquiries}
        isLoading={isLoading}
        onSelectInquiry={setSelectedInquiry}
        onApproveInquiry={setInquiryToApprove}
        onScheduleConsultation={setInquiryToSchedule}
        onRejectInquiry={setInquiryToReject}
        onDeleteInquiry={setInquiryToDelete}
      />

      {/* Modal 1: Details */}
      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onSave={async (id, status, note) => {
          await updateStatus({ id, status, admin_note: note });
          setSelectedInquiry(null);
        }}
        isSaving={isUpdating}
        onOpenApprove={(inq) => {
          setSelectedInquiry(null);
          setInquiryToApprove(inq);
        }}
        onOpenSchedule={(inq) => {
          setSelectedInquiry(null);
          setInquiryToSchedule(inq);
        }}
        onOpenReject={(inq) => {
          setSelectedInquiry(null);
          setInquiryToReject(inq);
        }}
        onOpenDelete={(inq) => {
          setSelectedInquiry(null);
          setInquiryToDelete(inq);
        }}
      />

      {/* Modal 2: Approve Project */}
      {inquiryToApprove && (
        <ApproveInquiryModal
          inquiry={inquiryToApprove}
          onClose={() => setInquiryToApprove(null)}
          onApprove={handleApproveProject}
          isApproving={isApproving}
        />
      )}

      {/* Modal 3: Schedule Consultation */}
      {inquiryToSchedule && (
        <ScheduleConsultationModal
          inquiry={inquiryToSchedule}
          onClose={() => setInquiryToSchedule(null)}
          onSchedule={handleScheduleConsultation}
          isScheduling={isScheduling}
        />
      )}

      {/* Modal 4: Reject Inquiry */}
      {inquiryToReject && (
        <RejectInquiryModal
          inquiry={inquiryToReject}
          onClose={() => setInquiryToReject(null)}
          onReject={handleReject}
          isRejecting={isRejecting}
        />
      )}

      {/* Modal 5: Delete Confirmation */}
      {inquiryToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(inquiryToDelete)}
          title="تأكيد الحذف النهائي للطلب"
          message={`هل أنت متأكد من حذف طلب العميل "${inquiryToDelete.name}" (${inquiryToDelete.tracking_code || inquiryToDelete.id}) نهائياً من قاعدة البيانات؟\n\nتحذير: هذا إجراء حقيقي لا يمكن التراجع عنه.`}
          onClose={() => setInquiryToDelete(null)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};
