import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { CheckCircle2 } from "lucide-react";

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

  if (isLoading) {
    return <div className="p-8 text-center text-mute font-mono">جاري تحميل الإعدادات...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl text-start">
      <div>
        <h1 className="text-2xl font-bold text-ink">إعدادات الموقع العام</h1>
        <p className="text-mute text-xs font-mono">بيانات التواصل المباشر، وأرقام الواتساب وروابط الشبكات</p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-lg bg-ok/10 border border-ok/30 text-ok text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>تم حفظ الإعدادات بنجاح وتحديث الموقع العام</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-card border border-line bg-surface/50 p-6 sm:p-8 space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-mute font-semibold">البريد الإلكتروني الرسمي</label>
          <input
            type="email"
            value={settings.email || ""}
            onChange={e => handleChange("email", e.target.value)}
            className="w-full h-11 px-4 rounded border border-line bg-bg/50 text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-mute font-semibold">رقم واتساب للأعمال (مع كود الدولة)</label>
          <input
            type="text"
            dir="ltr"
            value={settings.whatsapp || ""}
            onChange={e => handleChange("whatsapp", e.target.value)}
            placeholder="+213550123456"
            className="w-full h-11 px-4 rounded border border-line bg-bg/50 text-sm font-mono text-start"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-mute font-semibold">رقم الهاتف للاتصال المباشر</label>
          <input
            type="text"
            dir="ltr"
            value={settings.phone || ""}
            onChange={e => handleChange("phone", e.target.value)}
            placeholder="+213 550 12 34 56"
            className="w-full h-11 px-4 rounded border border-line bg-bg/50 text-sm font-mono text-start"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-mute font-semibold">حساب تيليغرام</label>
          <input
            type="text"
            dir="ltr"
            value={settings.telegram || ""}
            onChange={e => handleChange("telegram", e.target.value)}
            placeholder="andev_dz"
            className="w-full h-11 px-4 rounded border border-line bg-bg/50 text-sm font-mono text-start"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-mute font-semibold">رابط GitHub</label>
          <input
            type="url"
            dir="ltr"
            value={settings.github || ""}
            onChange={e => handleChange("github", e.target.value)}
            className="w-full h-11 px-4 rounded border border-line bg-bg/50 text-sm font-mono text-start"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" isLoading={saveMutation.isPending}>
            حفظ الإعدادات
          </Button>
        </div>
      </form>
    </div>
  );
};

