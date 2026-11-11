import React from "react";
import { DesktopSpecs } from "@andev/shared";
import { Laptop, Download, HardDrive, Database, Cpu, Check } from "lucide-react";

interface DesktopSpecsEditorProps {
  specs: Partial<DesktopSpecs>;
  onChange: (specs: Partial<DesktopSpecs>) => void;
  packageSize: string;
  onPackageSizeChange: (val: string) => void;
  downloadUrl: string;
  onDownloadUrlChange: (val: string) => void;
}

const ARCHITECTURES = [
  { id: "x64", label: "Windows x64 / Intel 64-bit" },
  { id: "arm64", label: "Apple Silicon (M1/M2/M3/M4) & ARM64" },
  { id: "linux_deb", label: "Linux (Debian / Ubuntu / .AppImage)" }
];

export const DesktopSpecsEditor: React.FC<DesktopSpecsEditorProps> = ({
  specs,
  onChange,
  packageSize,
  onPackageSizeChange,
  downloadUrl,
  onDownloadUrlChange
}) => {
  const updateSpec = <K extends keyof DesktopSpecs>(key: K, val: DesktopSpecs[K]) => {
    onChange({ ...specs, [key]: val });
  };

  const toggleArch = (archId: string) => {
    const current = specs.architectures || [];
    if (current.includes(archId)) {
      updateSpec("architectures", current.filter(x => x !== archId));
    } else {
      updateSpec("architectures", [...current, archId]);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-xl border border-line bg-surface-container/30 animate-fadeIn text-start">
      <div className="flex items-center gap-2 pb-2 border-b border-line text-xs font-mono font-bold text-secondary uppercase">
        <Laptop className="w-4 h-4" />
        <span>تخصيص برنامج حاسوب مكتبي (Desktop Software Specs)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Installer URL */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <Download className="w-3.5 h-3.5 text-secondary" />
            <span>رابط تحميل ملف التثبيت (.exe / .dmg / .deb)</span>
          </label>
          <input
            type="text"
            value={downloadUrl || specs.installer_url || ""}
            onChange={e => {
              onDownloadUrlChange(e.target.value);
              updateSpec("installer_url", e.target.value);
            }}
            placeholder="https://andev.dz/downloads/setup.exe"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Package Size */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <HardDrive className="w-3.5 h-3.5 text-secondary" />
            <span>حجم برنامج التثبيت (Installer Size)</span>
          </label>
          <input
            type="text"
            value={packageSize || specs.package_size || ""}
            onChange={e => {
              onPackageSizeChange(e.target.value);
              updateSpec("package_size", e.target.value);
            }}
            placeholder="مثال: 64.8 MB Installer"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Database Engine */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <Database className="w-3.5 h-3.5 text-secondary" />
            <span>محرك قاعدة البيانات المحلية المدمجة</span>
          </label>
          <input
            type="text"
            value={specs.database_type || "SQLite Local Embedded"}
            onChange={e => updateSpec("database_type", e.target.value)}
            placeholder="SQLite / DuckDB / Embedded PostgreSQL"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>

        {/* System Requirements */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
            <Cpu className="w-3.5 h-3.5 text-secondary" />
            <span>متطلبات التشغيل الدنيا (System Requirements)</span>
          </label>
          <input
            type="text"
            value={specs.system_requirements || ""}
            onChange={e => updateSpec("system_requirements", e.target.value)}
            placeholder="مثال: 4GB RAM, Intel Core i3 / Windows 10+"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Architectures */}
      <div className="space-y-2 pt-2 border-t border-line">
        <label className="text-xs font-mono text-text-muted font-semibold">
          المعماريات وأنظمة التشغيل المدعومة
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {ARCHITECTURES.map(arch => {
            const isSelected = (specs.architectures || []).includes(arch.id);
            return (
              <button
                key={arch.id}
                type="button"
                onClick={() => toggleArch(arch.id)}
                className={`flex items-center justify-between gap-1.5 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "bg-secondary/15 border-secondary text-text-primary shadow-sm"
                    : "bg-surface border-line text-text-muted hover:border-secondary/40"
                }`}
              >
                <span className="truncate">{arch.label}</span>
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
                  isSelected ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

