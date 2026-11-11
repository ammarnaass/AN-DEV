import React from "react";
import { MobileSpecs } from "@andev/shared";
import { Smartphone, Download, WifiOff, HardDrive, ShieldCheck, Check } from "lucide-react";

interface MobileSpecsEditorProps {
  specs: Partial<MobileSpecs>;
  onChange: (specs: Partial<MobileSpecs>) => void;
  packageSize: string;
  onPackageSizeChange: (val: string) => void;
  downloadUrl: string;
  onDownloadUrlChange: (val: string) => void;
}

const AVAILABLE_HARDWARE = [
  { id: "Camera", label_ar: "الكاميرا ومسح الباركود" },
  { id: "Biometrics", label_ar: "بصمة الإصبع والوجه" },
  { id: "GPS", label_ar: "الموقع الجغرافي GPS" },
  { id: "Bluetooth", label_ar: "بلوتوث للطابعات المتنقلة" },
  { id: "PushNotifications", label_ar: "الإشعارات الفورية Push" }
];

export const MobileSpecsEditor: React.FC<MobileSpecsEditorProps> = ({
  specs,
  onChange,
  packageSize,
  onPackageSizeChange,
  downloadUrl,
  onDownloadUrlChange
}) => {
  const updateSpec = <K extends keyof MobileSpecs>(key: K, val: MobileSpecs[K]) => {
    onChange({ ...specs, [key]: val });
  };

  const toggleHardware = (hwId: string) => {
    const current = specs.hardware_features || [];
    if (current.includes(hwId)) {
      updateSpec("hardware_features", current.filter(x => x !== hwId));
    } else {
      updateSpec("hardware_features", [...current, hwId]);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-xl border border-line bg-surface-container/30 animate-fadeIn text-start">
      <div className="flex items-center gap-2 pb-2 border-b border-line text-xs font-mono font-bold text-secondary uppercase">
        <Smartphone className="w-4 h-4" />
        <span>تخصيص تطبيق هواتف ذكية (Mobile App Specs - Android / iOS)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* APK Direct Download URL */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <Download className="w-3.5 h-3.5 text-secondary" />
            <span>رابط تحميل ملف APK المباشر</span>
          </label>
          <input
            type="text"
            value={downloadUrl || specs.apk_url || ""}
            onChange={e => {
              onDownloadUrlChange(e.target.value);
              updateSpec("apk_url", e.target.value);
            }}
            placeholder="https://andev.dz/downloads/app-release.apk"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Package Size */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <HardDrive className="w-3.5 h-3.5 text-secondary" />
            <span>حجم ملف التطبيق (APK / IPA Size)</span>
          </label>
          <input
            type="text"
            value={packageSize || specs.package_size || ""}
            onChange={e => {
              onPackageSizeChange(e.target.value);
              updateSpec("package_size", e.target.value);
            }}
            placeholder="مثال: 24.5 MB"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Google Play Store URL */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">رابط متجر Google Play (اختياري)</label>
          <input
            type="text"
            value={specs.play_store_url || ""}
            onChange={e => updateSpec("play_store_url", e.target.value)}
            placeholder="https://play.google.com/store/apps/details?id=..."
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Apple App Store URL */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">رابط متجر App Store (اختياري)</label>
          <input
            type="text"
            value={specs.app_store_url || ""}
            onChange={e => updateSpec("app_store_url", e.target.value)}
            placeholder="https://apps.apple.com/app/..."
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Minimum OS Version */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">الحد الأدنى لنظام التشغيل</label>
          <input
            type="text"
            value={specs.min_os || "Android 8.0+ / iOS 15+"}
            onChange={e => updateSpec("min_os", e.target.value)}
            placeholder="Android 8.0+ / iOS 15+"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Offline First Engine Toggle */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">العمل دون إنترنت (Offline-First)</label>
          <button
            type="button"
            onClick={() => updateSpec("offline_first", !specs.offline_first)}
            className={`w-full h-10 flex items-center justify-between px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              specs.offline_first
                ? "bg-secondary/15 border-secondary text-text-primary"
                : "bg-surface border-line text-text-muted hover:border-secondary/40"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <WifiOff className="w-4 h-4 text-secondary" />
              <span>يعمل بدون اتصال بالإنترنت مع مزامنة لاحقة</span>
            </div>
            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] font-bold ${
              specs.offline_first ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
            }`}>
              {specs.offline_first && <Check className="w-3 h-3" />}
            </div>
          </button>
        </div>
      </div>

      {/* Hardware Access Features */}
      <div className="space-y-2 pt-2 border-t border-line">
        <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span>ميزات العتاد وأذونات النظام المستخدمة (Hardware Features)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {AVAILABLE_HARDWARE.map(hw => {
            const isSelected = (specs.hardware_features || []).includes(hw.id);
            return (
              <button
                key={hw.id}
                type="button"
                onClick={() => toggleHardware(hw.id)}
                className={`flex items-center justify-between gap-1.5 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "bg-secondary/15 border-secondary text-text-primary shadow-sm"
                    : "bg-surface border-line text-text-muted hover:border-secondary/40"
                }`}
              >
                <span className="truncate">{hw.label_ar}</span>
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
                  isSelected ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
                }`}>
                  {isSelected && "✓"}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

