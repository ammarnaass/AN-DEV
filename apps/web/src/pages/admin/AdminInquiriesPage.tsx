import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Inquiry } from "@andev/shared";
import { Button } from "../../components/ui/Button";
import { Mail, Clock, MessageSquare, Check, X, Edit3 } from "lucide-react";

export const AdminInquiriesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [noteText, setNoteText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"new" | "in_progress" | "closed">("new");

  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
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

  const filters = [
    { id: "all", label: "جميع الطلبات" },
    { id: "new", label: "جديد" },
    { id: "in_progress", label: "قيد المتابعة" },
    { id: "closed", label: "مغلق" }
  ];

  return (
    <div className="space-y-6 text-start">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">إدارة طلبات المشاريع</h1>
          <p className="text-mute text-xs font-mono">متابعة العملاء وتحديث حالات الطلبات والملاحظات الداخلية</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === f.id
                  ? "bg-primary text-[#050816] font-bold"
                  : "bg-surface border border-line text-mute hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      {isLoading ? (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-14 rounded-lg bg-surface/50 border border-line" />
          ))}
        </div>
      ) : inquiries.length > 0 ? (
        <div className="rounded-card border border-line bg-surface/40 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-surface/80 border-b border-line text-xs font-mono text-mute">
                <tr>
                  <th className="p-4 text-start">العميل</th>
                  <th className="p-4 text-start">نوع المشروع</th>
                  <th className="p-4 text-start">الميزانية</th>
                  <th className="p-4 text-start">الحالة</th>
                  <th className="p-4 text-start">التاريخ</th>
                  <th className="p-4 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {inquiries.map(inq => (
                  <tr
                    key={inq.id}
                    onClick={() => openDetails(inq)}
                    className="hover:bg-surface/60 cursor-pointer transition-colors h-14"
                  >
                    <td className="p-4 font-semibold text-ink">
                      <div className="line-clamp-1">{inq.name}</div>
                      <div className="text-xs text-mute font-mono">{inq.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-bg border border-line text-accent">
                        {inq.project_type}
                      </span>
                    </td>
                    <td className="p-4 text-mute text-xs">
                      {inq.budget_range || "غير محددة"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          inq.status === "new"
                            ? "bg-primary/20 text-accent border border-primary/40"
                            : inq.status === "in_progress"
                            ? "bg-warn/20 text-warn border border-warn/40"
                            : "bg-mute/20 text-mute border border-mute/40"
                        }`}
                      >
                        {inq.status === "new" ? "جديد" : inq.status === "in_progress" ? "قيد المتابعة" : "مغلق"}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-mute">
                      {new Date(inq.created_at).toLocaleDateString("ar-DZ")}
                    </td>
                    <td className="p-4 text-center">
                      <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); openDetails(inq); }}>
                        فتح
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center text-mute border border-line rounded-card bg-surface/30">
          لا توجد طلبات تطابق هذا التصنيف
        </div>
      )}

      {/* Detail / Update Dialog */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-card border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 end-5 text-mute hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-accent">تفاصيل الطلب رقم #{selectedInquiry.id}</span>
              <h2 className="text-xl font-bold text-ink">{selectedInquiry.name}</h2>
              <p className="text-xs text-mute font-mono">{selectedInquiry.email}</p>
            </div>

            {/* Message Box */}
            <div className="p-4 rounded-lg bg-bg/60 border border-line space-y-2">
              <span className="text-xs font-mono text-mute">نص الرسالة / فكرة المشروع:</span>
              <p className="text-sm text-ink/90 whitespace-pre-line leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-mute font-semibold">تغيير حالة الطلب</label>
              <div className="grid grid-cols-3 gap-2">
                {(["new", "in_progress", "closed"] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`py-2 px-3 rounded border text-xs font-semibold transition-all ${
                      selectedStatus === st
                        ? "bg-primary text-[#050816] border-primary font-bold shadow-sm"
                        : "bg-surface border-line text-mute hover:text-ink"
                    }`}
                  >
                    {st === "new" ? "جديد" : st === "in_progress" ? "قيد المتابعة" : "مغلق"}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Admin Note */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-mute font-semibold">ملاحظة داخلية خاصة بالمدير</label>
              <textarea
                rows={3}
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="اكتب ملاحظة داخلية (مثال: تم الاتصال، يرغب في مناقشة الميزانية الأسبوع القادم)..."
                className="w-full p-3 rounded border border-line bg-bg/50 text-ink text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line">
              <a
                href={`mailto:${selectedInquiry.email}?subject=رد على طلب مشروعك - AN DEV`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-primary text-primary hover:bg-primary/10 text-xs font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>رد بالبريد الإلكتروني</span>
              </a>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  isLoading={updateMutation.isPending}
                  onClick={handleSaveStatusAndNote}
                >
                  حفظ التعديلات
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedInquiry(null)}>
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
