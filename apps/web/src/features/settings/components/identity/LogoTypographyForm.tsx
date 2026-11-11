import React from "react";

export interface LogoTypographyFormProps {
  namePrefix: string;
  nameSuffix: string;
  tagline: string;
  onChange: (key: string, val: string) => void;
}

export const LogoTypographyForm: React.FC<LogoTypographyFormProps> = ({
  namePrefix,
  nameSuffix,
  tagline,
  onChange,
}) => {
  return (
    <div className="space-y-4 pt-2 text-start">
      {/* Prefix and Suffix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            بادئة اسم العلامة (Prefix)
          </label>
          <input
            type="text"
            dir="ltr"
            placeholder="AN"
            value={namePrefix}
            onChange={(e) => onChange("logo_name_prefix", e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-bold font-sans focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            لاحقة اسم العلامة (Suffix)
          </label>
          <input
            type="text"
            dir="ltr"
            placeholder="DEV"
            value={nameSuffix}
            onChange={(e) => onChange("logo_name_suffix", e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-bold font-sans focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-text-muted font-semibold">
          الشعار اللفظي المصاحب (Tagline / Slogan)
        </label>
        <input
          type="text"
          dir="ltr"
          placeholder="CODE · CREATE · SOLVE"
          value={tagline}
          onChange={(e) => onChange("logo_tagline", e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono tracking-wider focus:outline-none focus:border-secondary"
        />
      </div>
    </div>
  );
};

