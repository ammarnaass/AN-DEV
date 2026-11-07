import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { AdminStats, Inquiry } from "@andev/shared";
import { MessageSquare, FolderKanban, Eye, ArrowLeft } from "lucide-react";

export const AdminDashboardPage: React.FC = () => {
  const { data: stats } = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: () => apiFetch<AdminStats>("/api/admin/stats")
  });

  const { data: recentInquiries = [] } = useQuery<Inquiry[]>({
    queryKey: ["admin-recent-inquiries"],
    queryFn: () => apiFetch<Inquiry[]>("/api/admin/inquiries")
  });

  const cards = [
    {
      title: "طلبات مشاريع جديدة",
      value: stats?.new_inquiries || 0,
      icon: <MessageSquare className="w-5 h-5 text-accent" />,
      link: "/admin/inquiries?status=new"
    },
    {
      title: "مشاريع منشورة",
      value: stats?.published_projects || 0,
      icon: <FolderKanban className="w-5 h-5 text-primary" />,
      link: "/admin/projects"
    },
    {
      title: "إجمالي الزيارات (آخر 30 يوم)",
      value: stats?.views_last_30_days || 0,
      icon: <Eye className="w-5 h-5 text-ok" />
    }
  ];

  return (
    <div className="space-y-8 text-start">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-ink">نظرة عامة</h1>
        <p className="text-mute text-xs font-mono">مؤشرات الأداء وآخر النشاطات</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <div key={i} className="p-6 rounded-card border border-line bg-surface/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-mute font-medium">{c.title}</span>
              <div className="p-2 rounded bg-bg/60 border border-line">{c.icon}</div>
            </div>
            <div className="text-3xl font-extrabold text-ink font-mono">{c.value}</div>
            {c.link && (
              <Link to={c.link} className="text-xs text-accent hover:underline flex items-center gap-1 pt-1 font-semibold">
                <span>عرض التفاصيل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Recent Inquiries List */}
      <div className="rounded-card border border-line bg-surface/40 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <h2 className="text-base font-bold text-ink">آخر طلبات المشاريع الواردة</h2>
          <Link to="/admin/inquiries" className="text-xs text-primary hover:underline font-semibold">
            عرض الكل
          </Link>
        </div>

        {recentInquiries.length > 0 ? (
          <div className="divide-y divide-line">
            {recentInquiries.slice(0, 5).map(inq => (
              <div key={inq.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink truncate">{inq.name}</span>
                    <span className="text-xs text-mute font-mono">({inq.email})</span>
                  </div>
                  <p className="text-xs text-mute line-clamp-1">{inq.message}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      inq.status === "new"
                        ? "bg-primary/20 text-accent border border-primary/40"
                        : inq.status === "in_progress"
                        ? "bg-warn/20 text-warn border border-warn/40"
                        : "bg-mute/20 text-mute border border-mute/40"
                    }`}
                  >
                    {inq.status === "new" ? "جديد" : inq.status === "in_progress" ? "قيد المتابعة" : "مغلق"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-mute font-mono">
            لا توجد طلبات واردة حتى الآن
          </div>
        )}
      </div>
    </div>
  );
};
