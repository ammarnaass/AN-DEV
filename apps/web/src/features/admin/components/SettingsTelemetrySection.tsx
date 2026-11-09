import React from "react";
import { Database, ShieldCheck } from "lucide-react";

export const SettingsTelemetrySection: React.FC = () => {
  return (
    <div className="space-y-8 text-start">
      {/* Database & Infrastructure Telemetry */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-bold text-text-primary">إعدادات قاعدة البيانات والنسخ الاحتياطي</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-status-ok font-mono text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
            <span>WAL ENGINE ACTIVE</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-surface-container border border-line space-y-1">
            <span className="text-text-muted">مسار قاعدة البيانات:</span>
            <p className="text-text-primary font-bold">data/andev.db</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container border border-line space-y-1">
            <span className="text-text-muted">نمط التسجيل (Journal):</span>
            <p className="text-secondary font-bold">WAL (Write-Ahead Log)</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container border border-line space-y-1">
            <span className="text-text-muted">نظام النسخ المتزامن:</span>
            <p className="text-status-ok font-bold">Litestream S3 Daemon</p>
          </div>
        </div>
      </div>

      {/* Security Protocol */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-4 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-line">
          <ShieldCheck className="w-4 h-4 text-status-ok" />
          <h2 className="text-base font-bold text-text-primary">إعدادات الأمان وجلسات المشرفين</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-line">
            <span>خوارزمية تشفير كلمات المرور:</span>
            <span className="text-text-primary font-bold">Argon2id (m=65536, t=3, p=4)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-line">
            <span>سياسة الكوكيز للجلسات:</span>
            <span className="text-status-ok font-bold">HttpOnly + SameSite=Strict</span>
          </div>
        </div>
      </div>
    </div>
  );
};
