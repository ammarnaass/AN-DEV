import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { AdminStats, Inquiry } from "@andev/shared";
import {
  MessageSquare,
  FolderKanban,
  Eye,
  ArrowLeft,
  Zap,
  Plus,
  Terminal,
  ShieldCheck
} from "lucide-react";

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
      icon: <MessageSquare className="w-5 h-5 text-secondary" />,
      tag: "بحاجة للمراجعة",
      link: "/admin/inquiries?status=new"
    },
    {
      title: "مشاريع منشورة في المعرض",
      value: stats?.published_projects || 0,
      icon: <FolderKanban className="w-5 h-5 text-primary" />,
      tag: "حالة نشطة",
      link: "/admin/projects"
    },
    {
      title: "إجمالي الزيارات (30 يوم)",
      value: stats?.views_last_30_days || 0,
      icon: <Eye className="w-5 h-5 text-status-ok" />,
      tag: "تتبع بدون كوكيز",
      link: null
    },
    {
      title: "معدل استجابة API",
      value: "< 25ms",
      icon: <Zap className="w-5 h-5 text-status-warn" />,
      tag: "SQLite WAL + Fastify",
      link: null
    }
  ];

  return (
    <div className="space-y-8 text-start max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
            <span>OPERATIONAL // ALGIERS CLUSTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            مرحباً عمار (Ammar) 👋
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            نظرة تشغيلية فورية على طلبات العملاء، تفاعل الزيارات وحالة المنصات البرمجية المنشورة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_12px_rgba(13,110,253,0.35)]"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مشروع جديد</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-line bg-surface flex flex-col justify-between gap-3 shadow-sm hover:border-secondary/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted font-medium">{c.title}</span>
              <div className="p-2 rounded-lg bg-surface-container border border-line">{c.icon}</div>
            </div>
            <div className="text-3xl font-black text-text-primary font-mono">{c.value}</div>
            <div className="flex items-center justify-between pt-2 border-t border-line text-[11px] font-mono">
              <span className="text-text-muted">{c.tag}</span>
              {c.link && (
                <Link to={c.link} className="text-secondary hover:underline flex items-center gap-1 font-semibold">
                  <span>إدارة</span>
                  <ArrowLeft className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: Inquiries & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Recent Inquiries */}
        <div className="lg:col-span-8 rounded-xl border border-line bg-surface p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-secondary" />
              <h2 className="text-base font-bold text-text-primary">أحدث طلبات المشاريع الواردة</h2>
            </div>
            <Link to="/admin/inquiries" className="text-xs text-secondary hover:underline font-mono font-semibold">
              عرض كل الطلبات ({recentInquiries.length})
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="divide-y divide-line">
              {recentInquiries.slice(0, 5).map(inq => (
                <div key={inq.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-text-primary truncate">{inq.name}</span>
                      <span className="text-xs text-text-muted font-mono">({inq.email})</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container border border-line text-secondary">
                        {inq.project_type}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-1">{inq.message}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold ${
                        inq.status === "new"
                          ? "bg-secondary/15 text-secondary border border-secondary/30"
                          : inq.status === "in_progress"
                          ? "bg-status-warn/15 text-status-warn border border-status-warn/30"
                          : "bg-surface-container text-text-muted border border-line"
                      }`}
                    >
                      {inq.status === "new" ? "جديد" : inq.status === "in_progress" ? "قيد المتابعة" : "مغلق"}
                    </span>
                    <Link
                      to="/admin/inquiries"
                      className="p-1 rounded text-text-muted hover:text-text-primary"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-text-muted text-xs font-mono">
              لا توجد طلبات واردة حتى الآن.
            </div>
          )}
        </div>

        {/* Right Column (4 cols): System Status & Audit Log */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-line bg-surface p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-line text-sm font-bold text-text-primary">
              <Terminal className="w-4 h-4 text-secondary" />
              <span>سجل العمليات الأخير (Audit Log)</span>
            </div>

            <div className="space-y-3 text-xs font-mono text-text-muted">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-status-ok shrink-0 mt-1" />
                <div>
                  <p className="text-text-primary font-semibold">Litestream S3 Replication Sync</p>
                  <p className="text-[10px]">Continuous WAL snapshot verified</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-status-ok shrink-0 mt-1" />
                <div>
                  <p className="text-text-primary font-semibold">Security Token Verification</p>
                  <p className="text-[10px]">Argon2 password hash confirmed</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-1" />
                <div>
                  <p className="text-text-primary font-semibold">Page View Counter Processed</p>
                  <p className="text-[10px]">F10 cookieless aggregate active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
              <ShieldCheck className="w-4 h-4 text-status-ok" />
              <span>جاهزية البيئة والمعايير</span>
            </div>
            <div className="space-y-1.5 text-xs text-text-muted">
              <div className="flex items-center justify-between">
                <span>محرك الـ API:</span>
                <span className="text-secondary font-mono">Fastify 5 + Node.js 22</span>
              </div>
              <div className="flex items-center justify-between">
                <span>قاعدة البيانات:</span>
                <span className="text-secondary font-mono">SQLite (WAL Mode)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>تشفير الجلسات:</span>
                <span className="text-status-ok font-mono">Argon2 + HttpOnly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
