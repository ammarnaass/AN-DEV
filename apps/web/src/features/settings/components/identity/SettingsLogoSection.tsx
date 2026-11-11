import React, { useRef, useState } from "react";
import { RotateCcw, Sparkles, AlertCircle } from "lucide-react";
import { LogoUploadBox } from "./LogoUploadBox";
import { LogoTypographyForm } from "./LogoTypographyForm";
import { LogoDisplayModeSelector } from "./LogoDisplayModeSelector";
import { LogoLivePreviewCard } from "./LogoLivePreviewCard";

export interface SettingsLogoSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsLogoSection: React.FC<SettingsLogoSectionProps> = ({
  settings,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const customImage = settings.logo_image || "";
  const namePrefix = settings.logo_name_prefix !== undefined ? settings.logo_name_prefix : "AN";
  const nameSuffix = settings.logo_name_suffix !== undefined ? settings.logo_name_suffix : "DEV";
  const tagline = settings.logo_tagline !== undefined ? settings.logo_tagline : "CODE · CREATE · SOLVE";
  const displayMode = (settings.logo_display_mode as any) || "full";

  const handleResetToDefault = () => {
    onChange("logo_image", "");
    onChange("logo_name_prefix", "AN");
    onChange("logo_name_suffix", "DEV");
    onChange("logo_tagline", "CODE · CREATE · SOLVE");
    onChange("logo_display_mode", "full");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-6 shadow-sm text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-container/15 text-primary border border-primary/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              تخصيص الشعار وهوية العلامة التجارية
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              تعديل رمز الشعار، الاسم المعروض، الشعار اللفظي، ونمط الظهور عبر الشريط العلوي والتذييل.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetToDefault}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface-container text-text-muted hover:text-text-primary text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>استعادة الشعار الأصلي</span>
        </button>
      </div>

      {uploadError && (
        <div className="p-3 rounded-lg bg-status-danger/10 border border-status-danger/30 text-status-danger text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Main Grid: Controls + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Upload & Text Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <LogoUploadBox
            customImage={customImage}
            onChange={onChange}
            fileInputRef={fileInputRef}
            setUploadError={setUploadError}
          />

          <LogoTypographyForm
            namePrefix={namePrefix}
            nameSuffix={nameSuffix}
            tagline={tagline}
            onChange={onChange}
          />

          <LogoDisplayModeSelector
            displayMode={displayMode}
            onChange={onChange}
          />
        </div>

        {/* Right Side: Live Interactive Previews (5 cols) */}
        <LogoLivePreviewCard
          customImage={customImage}
          namePrefix={namePrefix}
          nameSuffix={nameSuffix}
          tagline={tagline}
          displayMode={displayMode}
        />
      </div>
    </div>
  );
};

