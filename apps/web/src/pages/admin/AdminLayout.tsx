import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Logo } from "../../components/layout/Logo";
import { LayoutDashboard, MessageSquare, FolderKanban, Settings, LogOut, ArrowRight } from "lucide-react";

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: authData, isLoading, isError } = useQuery<{ admin: { email: string } }>({
    queryKey: ["admin-me"],
    queryFn: () => apiFetch<{ admin: { email: string } }>("/api/auth/me"),
    retry: false
  });

  const { data: stats } = useQuery<{ new_inquiries: number }>({
    queryKey: ["admin-stats"],
    queryFn: () => apiFetch<{ new_inquiries: number }>("/api/admin/stats"),
    enabled: !!authData
  });

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-mute text-sm font-mono">
        جاري التحقق من الجلسة...
      </div>
    );
  }

  if (isError || !authData) {
    navigate("/admin/login");
    return null;
  }

  const navItems = [
    { href: "/admin", label: "نظرة عامة", icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      href: "/admin/inquiries",
      label: "الطلبات",
      icon: <MessageSquare className="w-4 h-4" />,
      badge: stats?.new_inquiries || 0
    },
    { href: "/admin/projects", label: "المشاريع", icon: <FolderKanban className="w-4 h-4" /> },
    { href: "/admin/settings", label: "الإعدادات", icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row text-ink">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-e border-line bg-surface/60 p-5 justify-between">
        <div className="space-y-6">
          <div className="pb-4 border-b border-line flex items-center justify-between">
            <Logo size={32} />
            <Link to="/" title="العودة للموقع" className="p-1 rounded text-mute hover:text-accent">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <nav className="space-y-1.5 text-start">
            {navItems.map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-[#050816] font-bold shadow-sm"
                      : "text-mute hover:text-ink hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-accent text-[#050816]">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin User info & Logout */}
        <div className="pt-4 border-t border-line space-y-3 text-start">
          <div className="text-xs text-mute truncate font-mono">
            {authData.admin.email}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-semibold text-err hover:underline"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-6">
        <header className="h-14 border-b border-line bg-surface/40 px-6 flex items-center justify-between">
          <span className="text-xs font-mono text-mute">لوحة الإدارة · AN DEV</span>
          <Link to="/" className="text-xs text-accent hover:underline">
            معاينة الموقع العام ←
          </Link>
        </header>
        <main className="flex-1 p-6 sm:p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 start-0 end-0 z-40 bg-surface border-t border-line h-16 flex items-center justify-around px-2">
        {navItems.map(item => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium p-1 relative ${
                isActive ? "text-accent font-bold" : "text-mute"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 ? (
                <span className="absolute top-0 end-1 w-2 h-2 rounded-full bg-accent" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

