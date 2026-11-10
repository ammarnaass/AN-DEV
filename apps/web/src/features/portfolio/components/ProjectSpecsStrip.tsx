import React from "react";
import { Project } from "@andev/shared";
import { useI18n } from "../../../lib/i18n";
import { PlatformIcon } from "./PlatformIcon";
import { Download, Tag, HardDrive, Layers } from "lucide-react";

interface ProjectSpecsStripProps {
  project: Project;
  className?: string;
}

export const ProjectSpecsStrip: React.FC<ProjectSpecsStripProps> = ({
  project,
  className = ""
}) => {
  const { locale } = useI18n();

  const getTypeName = (type: string) => {
    switch (type) {
      case "mobile":
        return locale === "ar" ? "تطبيق هواتف ذكية" : "Mobile App";
      case "desktop":
        return locale === "ar" ? "برنامج حاسوب مكتبي" : "Desktop Software";
      case "pos":
        return locale === "ar" ? "نظام كاشير ونقاط بيع" : "POS & Retail System";
      case "system":
        return locale === "ar" ? "نظام مؤسسي سحابي" : "Enterprise System";
      case "web":
      default:
        return locale === "ar" ? "تطبيق ويب وسحابي" : "Web Application";
    }
  };

  const platformsList: string[] = Array.isArray(project.platforms_json)
    ? project.platforms_json
    : typeof project.platforms_json === "string"
    ? JSON.parse(project.platforms_json || '["web"]')
    : ["web"];

  return (
    <div
      className={`w-full rounded-2xl border border-line bg-surface/90 backdrop-blur-md p-4 sm:p-5 shadow-card flex flex-wrap items-center justify-between gap-4 text-start ${className}`}
    >
      {/* Left / Start Info Items */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        {/* Project Type Badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary">
            <Layers className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
              {locale === "ar" ? "نوع النظام" : "System Type"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-text-primary">
              {getTypeName(project.project_type || "web")}
            </span>
          </div>
        </div>

        <div className="h-8 w-px bg-line hidden sm:block" />

        {/* Version Badge */}
        {project.version && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container border border-line flex items-center justify-center text-text-muted">
              <Tag className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                {locale === "ar" ? "الإصدار" : "Version"}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-secondary">
                {project.version}
              </span>
            </div>
          </div>
        )}

        {/* Size Badge */}
        {project.package_size && (
          <>
            <div className="h-8 w-px bg-line hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container border border-line flex items-center justify-center text-text-muted">
                <HardDrive className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  {locale === "ar" ? "حجم الحزمة" : "Package Size"}
                </span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-text-primary">
                  {project.package_size}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="h-8 w-px bg-line hidden md:block" />

        {/* Supported Platforms Matrix */}
        {platformsList.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider pb-1">
                {locale === "ar" ? "المنصات المدعومة" : "Supported Platforms"}
              </span>
              <div className="flex items-center gap-2 text-text-primary">
                {platformsList.map(platform => (
                  <span
                    key={platform}
                    className="p-1.5 rounded-md bg-surface-container border border-line text-secondary hover:text-text-primary hover:border-secondary transition-colors"
                  >
                    <PlatformIcon platform={platform} className="w-4 h-4" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right / End Actions */}
      <div className="flex items-center gap-3">
        {project.download_url && (
          <a
            href={project.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-elevated border border-line hover:border-secondary/40 text-xs sm:text-sm font-semibold text-secondary hover:text-text-primary transition-all shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4 text-secondary" />
            <span>{locale === "ar" ? "تحميل الحزمة المباشرة" : "Download Package"}</span>
          </a>
        )}
      </div>
    </div>
  );
};

