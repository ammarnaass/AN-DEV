import React from "react";

interface SeoBrandBioFormProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SeoBrandBioForm: React.FC<SeoBrandBioFormProps> = ({
  settings,
  onChange,
}) => {
  return (
    <>
      {/* Tagline & Footer Bio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            شعار الهوية اللفظي (Tagline بالعربية)
          </label>
          <input
            type="text"
            value={settings.tagline_ar || ""}
            onChange={(e) => onChange("tagline_ar", e.target.value)}
            placeholder="نطوّر برمجيات تُحدث فرقاً حقيقياً في أعمالكم"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            شعار الهوية اللفظي (Tagline بالإنجليزية)
          </label>
          <input
            type="text"
            dir="ltr"
            value={settings.tagline_en || ""}
            onChange={(e) => onChange("tagline_en", e.target.value)}
            placeholder="We engineer software that transforms your business"
            className="w-full h-11 px-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            نبذة وتوصيف الموقع في التذييل (Footer Bio بالعربية)
          </label>
          <textarea
            rows={2}
            value={settings.footer_description_ar ?? ""}
            onChange={(e) => onChange("footer_description_ar", e.target.value)}
            placeholder="نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية - ا. تجربة برمجية متقدمة تواكب التطور السحابي والخوارزمي بأعلى معايير الجودة."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            نبذة وتوصيف الموقع في التذييل (Footer Bio بالإنجليزية)
          </label>
          <textarea
            rows={2}
            dir="ltr"
            value={settings.footer_description_en ?? ""}
            onChange={(e) => onChange("footer_description_en", e.target.value)}
            placeholder="We engineer scalable digital solutions and high-performance apps with meticulous precision."
            className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>
      </div>
    </>
  );
};

