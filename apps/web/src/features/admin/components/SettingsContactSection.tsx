import React from "react";
import { Mail } from "lucide-react";

interface SettingsContactSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsContactSection: React.FC<SettingsContactSectionProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-5 shadow-sm text-start">
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
            onChange={e => onChange("email", e.target.value)}
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
            onChange={e => onChange("whatsapp", e.target.value)}
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
            onChange={e => onChange("phone", e.target.value)}
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
            onChange={e => onChange("location_ar", e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
          />
        </div>
      </div>
    </div>
  );
};

