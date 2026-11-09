import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Inquiry } from "@andev/shared";
import {
  MessageSquare,
  RefreshCw,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  X,
  UserCheck
} from "lucide-react";

export const AdminInquiriesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [noteText, setNoteText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"new" | "in_progress" | "closed">("new");

  const { data: inquiries = [], isLoading, refetch } = useQuery<Inquiry[]>({
    queryKey: ["admin-inquiries", statusFilter],
    queryFn: () => {
      const param = statusFilter !== "all" ? `?status=${statusFilter}` : "";
      return apiFetch<Inquiry[]>(`/api/admin/inquiries${param}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, admin_note }: { id: number; status: string; admin_note: string }) => {
      return apiFetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, admin_note })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      if (selectedInquiry) {
        setSelectedInquiry(prev => prev ? { ...prev, status: selectedStatus, admin_note: noteText } : null);
      }
    }
  });

  const openDetails = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNoteText(inq.admin_note || "");
    setSelectedStatus(inq.status);
  };

  const handleSaveStatusAndNote = () => {
    if (!selectedInquiry) return;
    updateMutation.mutate({
      id: selectedInquiry.id,
      status: selectedStatus,
      admin_note: noteText
    });
  };

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
      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 rounded-xl bg-surface border border-line" />
          ))}
        </div>
      ) : inquiries.length > 0 ? (
        <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-surface-container border-b border-line text-xs font-mono text-text-muted">
                <tr>
                  <th className="p-4 text-start">العميل والمشروع</th>
                  <th className="p-4 text-start">النوع والميزانية</th>
                  <th className="p-4 text-center">الحالة</th>
                  <th className="p-4 text-start">تاريخ الورود</th>
                  <th className="p-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {inquiries.map(inq => (
                  <tr
                    key={inq.id}
                    onClick={() => openDetails(inq)}
                    className="hover:bg-surface-elevated/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-bold text-text-primary text-sm flex items-center gap-2">
                          <span>{inq.name}</span>
                          {inq.status === "new" && (
                            <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
                          )}
                        </div>
                        <div className="text-xs font-mono text-text-muted">{inq.email}</div>
                        <p className="text-xs text-text-muted line-clamp-1 max-w-md pt-0.5">
                          {inq.message}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1 text-xs font-mono">
                        <div className="px-2 py-0.5 rounded bg-surface-container border border-line text-secondary inline-block">
                          {inq.project_type}
                        </div>
                        <div className="text-text-muted text-[11px]">
                          {inq.budget_range || "غير محدد"}
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold border ${
                          inq.status === "new"
                            ? "bg-secondary/15 text-secondary border-secondary/30"
                            : inq.status === "in_progress"
                            ? "bg-status-warn/15 text-status-warn border-status-warn/30"
                            : "bg-surface-container text-text-muted border-line"
                        }`}
                      >
                        {inq.status === "new" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-status-ok" />
                            <span>جديد</span>
                          </>
                        ) : inq.status === "in_progress" ? (
                          <>
                            <Clock className="w-3 h-3 text-status-warn" />
                            <span>قيد المتابعة</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-text-muted" />
                            <span>مغلق</span>
                          </>
                        )}
                      </span>
                    </td>

                    <td className="p-4 text-xs font-mono text-text-muted">
                      {new Date(inq.created_at).toLocaleDateString("ar-DZ", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          openDetails(inq);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-semibold text-secondary hover:bg-surface-elevated transition-colors"
                      >
                        معاينة وتعديل
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-text-muted text-sm border border-line rounded-xl bg-surface/30">
          لا توجد طلبات مشاريع تطابق الفلتر المحدد.
        </div>
      )}

      {/* Details & Notes Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-modal relative text-start">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-secondary" />
                  <h3 className="text-lg font-bold text-text-primary">
                    تفاصيل طلب العميل #{selectedInquiry.id}
                  </h3>
                </div>
                <div className="text-xs font-mono text-text-muted">
                  تاريخ الإرسال: {new Date(selectedInquiry.created_at).toLocaleString("ar-DZ")}
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface-container border border-line text-xs font-mono">
              <div>
                <span className="text-text-muted">الاسم:</span>
                <p className="text-text-primary font-bold pt-0.5">{selectedInquiry.name}</p>
              </div>
              <div>
                <span className="text-text-muted">البريد:</span>
                <p className="text-text-primary font-bold pt-0.5">{selectedInquiry.email}</p>
              </div>
              <div>
                <span className="text-text-muted">نوع المشروع:</span>
                <p className="text-secondary font-bold pt-0.5">{selectedInquiry.project_type}</p>
              </div>
              <div>
                <span className="text-text-muted">الميزانية:</span>
                <p className="text-text-primary font-bold pt-0.5">{selectedInquiry.budget_range || "غير محدد"}</p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-text-muted font-semibold">نص الرسالة والمتطلبات:</span>
              <div className="p-4 rounded-xl bg-surface-container border border-line text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status & Admin Notes */}
            <div className="space-y-4 pt-2 border-t border-line">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-muted font-semibold">
                  حالة الطلب التشغيلية:
                </label>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
                >
                  <option value="new">جديد (New)</option>
                  <option value="in_progress">قيد المتابعة (In Progress)</option>
                  <option value="closed">مغلق (Closed)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-muted font-semibold">
                  ملاحظات الإدارة الداخلية:
                </label>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="أدخل ملاحظات التقييم المعماري، أو نتائج الاتصال بالعميل..."
                  className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSaveStatusAndNote}
                  disabled={updateMutation.isPending}
                  className="px-5 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_12px_rgba(13,110,253,0.35)] disabled:opacity-50"
                >
                  {updateMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
