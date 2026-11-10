import React from "react";
import { Search } from "lucide-react";

interface SettingsSeoSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsSeoSection: React.FC<SettingsSeoSectionProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-5 shadow-sm text-start">
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
            onChange={e => onChange("tagline_ar", e.target.value)}
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
            onChange={e => onChange("tagline_en", e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5 pt-3 border-t border-line">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            نص نبذة الموقع في التذييل (Footer Bio بالعربية)
          </label>
          <textarea
            rows={3}
            value={settings.footer_description_ar ?? ""}
            onChange={e => onChange("footer_description_ar", e.target.value)}
            placeholder="نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية - ا. تجربة برمجية متقدمة تواكب التطور السحابي والخوارزمي بأعلى معايير الجودة."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
          <p className="text-[11px] text-text-muted">
            النص التعريفي الذي يظهر تحت شعار AN DEV في أسفل كافة صفحات الموقع (Footer).
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            نص نبذة الموقع في التذييل (Footer Bio بالإنجليزية)
          </label>
          <textarea
            rows={2}
            dir="ltr"
            value={settings.footer_description_en ?? ""}
            onChange={e => onChange("footer_description_en", e.target.value)}
            placeholder="Algerian software agency engineering high-performance web, mobile, and custom systems built for scale and reliability with mathematical precision."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>
      </div>
    </div>
  );
};

