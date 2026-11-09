import React, { useState, useEffect } from "react";
import { Save, RotateCcw, CheckCircle2, Terminal } from "lucide-react";
import { useAdminSettings } from "../hooks/useAdminSettings";
import { SettingsContactSection } from "../components/SettingsContactSection";
import { SettingsSocialSection } from "../components/SettingsSocialSection";
import { SettingsSeoSection } from "../components/SettingsSeoSection";
import { SettingsTelemetrySection } from "../components/SettingsTelemetrySection";

export const AdminSettingsPage: React.FC = () => {
  const { settings: initialSettings, isLoading, updateSettings, isUpdating } = useAdminSettings();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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
            disabled={isUpdating}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isUpdating ? "جاري الحفظ..." : "حفظ كل التغييرات"}</span>
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
        <SettingsContactSection settings={settings} onChange={handleChange} />
        <SettingsSocialSection settings={settings} onChange={handleChange} />
        <SettingsSeoSection settings={settings} onChange={handleChange} />
        <SettingsTelemetrySection />
      </form>
    </div>
  );
};

