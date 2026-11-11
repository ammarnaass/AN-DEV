import React from "react";
import { Layers, Globe, Smartphone, Laptop, Store } from "lucide-react";

export interface ProjectTypeOption {
  id: "web" | "mobile" | "desktop" | "pos" | "system";
  label_ar: string;
  label_en: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  { id: "web", label_ar: "منصة ويب / SaaS", label_en: "Web App", icon: Globe },
  { id: "mobile", label_ar: "تطبيق هواتف", label_en: "Mobile App", icon: Smartphone },
  { id: "desktop", label_ar: "برنامج مكتبي", label_en: "Desktop App", icon: Laptop },
  { id: "pos", label_ar: "نظام كاشير POS", label_en: "POS System", icon: Store },
  { id: "system", label_ar: "نظام مؤسسي ERP", label_en: "Enterprise System", icon: Layers },
];

export interface ProjectTypeSelectorProps {
  projectType: "web" | "mobile" | "desktop" | "pos" | "system";
  onSelectType: (val: "web" | "mobile" | "desktop" | "pos" | "system") => void;
}

export const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({
  projectType,
  onSelectType,
}) => {
  return (
    <div className="space-y-2 text-start">
      <div className="flex items-center justify-between">
        <label
          htmlFor="specs-project-type"
          className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold"
        >
          <Layers className="w-3.5 h-3.5 text-secondary" />
          <span>نوع التطبيق (Project Type) *</span>
        </label>
        <span className="text-[11px] font-mono text-secondary font-bold">
          {PROJECT_TYPE_OPTIONS.find(o => o.id === projectType)?.label_ar}
        </span>
      </div>

      {/* Quick-Select Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {PROJECT_TYPE_OPTIONS.map(opt => {
          const IconComponent = opt.icon;
          const isSelected = projectType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectType(opt.id)}
              className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-secondary/15 border-secondary text-text-primary shadow-sm ring-1 ring-secondary/30 font-bold"
                  : "bg-surface-container border-line text-text-muted hover:border-secondary/40 hover:text-text-primary"
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isSelected ? "text-secondary" : "text-text-muted"}`} />
              <span className="text-[11px] leading-tight truncate w-full">{opt.label_ar}</span>
            </button>
          );
        })}
      </div>

      {/* Hidden select for standard form accessibility and testing */}
      <select
        id="specs-project-type"
        value={projectType}
        onChange={e => onSelectType(e.target.value as any)}
        className="sr-only"
      >
        {PROJECT_TYPE_OPTIONS.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.label_ar} ({opt.label_en})
          </option>
        ))}
      </select>
    </div>
  );
};

