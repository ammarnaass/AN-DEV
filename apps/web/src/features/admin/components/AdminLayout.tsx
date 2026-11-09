import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  Settings,
  LogOut,
  ExternalLink,
  Database,
  ShieldCheck
} from "lucide-react";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useAdminStats } from "../hooks/useAdminStats";

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, isLoading, isError, logout } = useAdminAuth();
  const { data: stats } = useAdminStats(!!admin);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore
    }
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-text-muted text-sm font-mono">
        جاري التحقق من صلاحيات الجلسة...
      </div>
    );
  }

  if (isError || !admin) {
    navigate("/admin/login");
    return null;
  }

  const navItems = [
    {
      href: "/admin",
      label: "لوحة التحكم الرئيسية",
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      href: "/admin/inquiries",
      label: "إدارة طلبات المشاريع",
      icon: <MessageSquare className="w-4 h-4" />,
      badge: stats?.new_inquiries || 0
    },
    {
      href: "/admin/projects",
      label: "إدارة المشاريع والأعمال",
      icon: <FolderKanban className="w-4 h-4" />
    },
    {
      href: "/admin/settings",
      label: "إعدادات الموقع والنظام",
      icon: <Settings className="w-4 h-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-text-primary">
      {/* Desktop Sidebar (w-72) */}
      <aside className="hidden md:flex flex-col w-72 border-e border-line bg-surface p-5 justify-between select-none shrink-0">
        <div className="space-y-6">
          {/* Header */}
          <div className="pb-4 border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-container text-white font-mono font-bold flex items-center justify-center text-sm shadow-[0_0_12px_rgba(13,110,253,0.35)]">
                AN
              </div>
              <div className="flex flex-col text-start">
                <span className="font-bold text-sm text-text-primary tracking-tight">
                  AN DEV Core
                </span>
                <span className="text-[11px] font-mono text-text-muted">
                  نظام إدارة الوكالة
                </span>
              </div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-status-ok animate-pulse" title="System Operational" />
          </div>

          {/* Litestream Live Pill */}
          <div className="px-3 py-2 rounded-lg bg-surface-container border border-line flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-text-muted">
              <Database className="w-3.5 h-3.5 text-secondary" />
              <span>Litestream SQLite</span>
            </div>
            <span className="text-status-ok font-bold">نشط</span>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 text-start">
            {navItems.map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary-container text-white font-bold shadow-[0_0_12px_rgba(13,110,253,0.35)]"
                      : "text-text-muted hover:text-text-primary hover:bg-surface-container"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-secondary text-surface">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin User info & Return to site */}
        <div className="pt-4 border-t border-line space-y-3 text-start">
          <div className="p-3 rounded-lg bg-surface-container border border-line space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-text-primary">عمار (Ammar Naas)</span>
            </div>
            <div className="text-[11px] font-mono text-text-muted truncate">
              {admin.email}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-secondary" />
              <span>زيارة الموقع</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-status-err transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
