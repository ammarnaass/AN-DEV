import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import {
  Save,
  RotateCcw,
  CheckCircle2,
  Mail,
  Share2,
  Search,
  Database,
  ShieldCheck,
  Terminal
} from "lucide-react";

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const { data: initialSettings, isLoading } = useQuery<Record<string, string>>({
    queryKey: ["admin-settings"],
    queryFn: () => apiFetch<Record<string, string>>("/api/admin/settings")
  });

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const saveMutation = useMutation({
    mutationFn: async (payload: Record<string, string>) => {
      return apiFetch("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify(payload)
      });
    },
    onSuccess: () => {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  });

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(settings);
  };

  const handleReset = () => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-text-muted font-mono">
        جاري تحميل إعدادات النظام...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-start max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>SYSTEM_CONFIG // REGISTRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            إعدادات الموقع والنظام
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            إدارة المتغيرات العامة، بيانات التواصل، بوابات الـ SEO، وإعدادات الاتصال بقاعدة البيانات.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saveMutation.isPending ? "جاري الحفظ..." : "حفظ كل التغييرات"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-status-ok/10 border border-status-ok/30 text-status-ok text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="font-semibold">تم حفظ التغييرات وتحديث الموقع وقاعدة البيانات فورياً!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Contact Coordinates */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-line">
            <Mail className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-bold text-text-primary">بيانات التواصل والمقر (الجزائر)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                البريد الإلكتروني الرسمي
              </label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={e => handleChange("email", e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                رقم واتساب للأعمال (مع كود الدولة)
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.whatsapp || ""}
                onChange={e => handleChange("whatsapp", e.target.value)}
                placeholder="+213550123456"
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                رقم الهاتف للاتصال المباشر
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.phone || ""}
                onChange={e => handleChange("phone", e.target.value)}
                placeholder="+213 550 12 34 56"
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                المقر والعنوان (Algiers Location)
              </label>
              <input
                type="text"
                value={settings.location_ar || ""}
                onChange={e => handleChange("location_ar", e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social & Ecosystem Links */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-line">
            <Share2 className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-bold text-text-primary">روابط الشبكات والمجتمعات التقنية</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                رابط منظمة GitHub
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.github || ""}
                onChange={e => handleChange("github", e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                صفحة LinkedIn الرسمية
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.linkedin || ""}
                onChange={e => handleChange("linkedin", e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
            </div>
          </div>
        </div>

        {/* Section 3: SEO & Meta */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-line">
            <Search className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-bold text-text-primary">إعدادات الـ SEO والظهور الرقمي</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                الشعار الرئيسي (Tagline بالعربية)
              </label>
              <input
                type="text"
                value={settings.tagline_ar || ""}
                onChange={e => handleChange("tagline_ar", e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                الشعار الرئيسي (Tagline بالإنجليزية)
              </label>
              <input
                type="text"
                dir="ltr"
                value={settings.tagline_en || ""}
                onChange={e => handleChange("tagline_en", e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Database & Infrastructure Telemetry */}
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

        {/* Section 5: Security Protocol */}
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
      </form>
    </div>
  );
};
