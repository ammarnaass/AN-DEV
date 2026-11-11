import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../../lib/i18n";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  ShieldCheck,
} from "lucide-react";
import { Project } from "@andev/shared";

export interface ProjectDetailHeaderProps {
  project: Project;
  title: string;
  summary: string;
}

export const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({
  project,
  title,
  summary,
}) => {
  const { locale, isRtl } = useI18n();

  return (
    <header className="space-y-6 text-start">
      {/* Top Breadcrumbs & Badges Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-text-muted">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-secondary hover:text-text-primary transition-colors font-semibold"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{locale === "ar" ? "معرض الأعمال" : "Portfolio"}</span>
          </Link>
          <span>/</span>
          <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </div>

        {/* System Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container border border-line text-secondary font-mono text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
            <span>{locale === "ar" ? "منشور في بيئة الإنتاج" : "Production Active"}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-elevated border border-line text-text-primary font-mono text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>{locale === "ar" ? "معتمد CIB / Algérie Poste" : "CIB / Edahabia Certified"}</span>
          </span>
        </div>
      </div>

      {/* Header Info & Title */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight">
          {title}
        </h1>
        <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-3xl">
          {summary}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]">
                <span>{locale === "ar" ? "معاينة النظام الحي" : "Launch Live Platform"}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noreferrer">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container border border-line text-text-primary text-sm font-semibold hover:border-secondary/40 hover:text-secondary transition-all active:scale-[0.98]">
                <Github className="w-4 h-4 text-secondary" />
                <span>{locale === "ar" ? "مستودع الكود" : "Source Code"}</span>
              </button>
            </a>
          )}
          <Link to="/contact">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-elevated border border-line text-secondary text-sm font-semibold hover:bg-surface-container transition-all active:scale-[0.98]">
              <span>{locale === "ar" ? "طلب مشروع مماثل" : "Request Similar System"}</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

