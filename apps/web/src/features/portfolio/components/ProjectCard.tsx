import React from "react";
import { Link } from "react-router-dom";
import { Project } from "@andev/shared";
import { useI18n } from "../../../lib/i18n";
import { TechChip } from "../../../components/ui/TechChip";
import { PlatformIcon } from "./PlatformIcon";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { locale, isRtl } = useI18n();

  const title = locale === "ar" ? project.title_ar : project.title_en;
  const summary = locale === "ar" ? project.summary_ar : project.summary_en;
  const techList: string[] = typeof project.tech_json === "string"
    ? JSON.parse(project.tech_json || "[]")
    : project.tech_json || [];

  const platformsList: string[] = Array.isArray(project.platforms_json)
    ? project.platforms_json
    : typeof project.platforms_json === "string"
    ? JSON.parse(project.platforms_json || '["web"]')
    : ["web"];

  const getTypeName = (type: string) => {
    switch (type) {
      case "mobile":
        return locale === "ar" ? "تطبيق موبايل" : "Mobile App";
      case "desktop":
        return locale === "ar" ? "برنامج مكتبي" : "Desktop App";
      case "pos":
        return locale === "ar" ? "كاشير ونقاط بيع POS" : "POS & Retail";
      case "system":
        return locale === "ar" ? "نظام مؤسسي متكامل ERP" : "Enterprise ERP";
      case "web":
      default:
        return locale === "ar" ? "تطبيق ويب" : "Web App";
    }
  };

  return (
    <div className="group rounded-card border border-line bg-surface overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-card flex flex-col text-start">
      {/* 16:10 Cover image container */}
      <Link to={`/projects/${project.slug}`} className="block relative aspect-[16/10] bg-background overflow-hidden">
        {project.cover_image ? (
          <img
            src={project.cover_image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-80" />

        {/* Featured Ribbon Badge */}
        {project.featured && (
          <div className="absolute top-3 end-3 z-10">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-secondary/20 text-secondary border border-secondary/40 backdrop-blur-md shadow-sm">
              {locale === "ar" ? "مميز" : "Featured"}
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata Row: App Type, Version & Platform Icons */}
          <div className="flex items-center justify-between gap-2 pb-1 border-b border-line/40">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-secondary/15 text-secondary border border-secondary/30">
                {getTypeName(project.project_type || "web")}
              </span>
              {project.version && (
                <span className="text-[10px] font-mono text-text-muted">
                  {project.version}
                </span>
              )}
            </div>

            {platformsList.length > 0 && (
              <div className="flex items-center gap-1 text-text-muted">
                {platformsList.slice(0, 3).map(platform => (
                  <PlatformIcon
                    key={platform}
                    platform={platform}
                    className="w-3.5 h-3.5 text-secondary"
                  />
                ))}
                {platformsList.length > 3 && (
                  <span className="text-[9px] font-mono text-text-muted">
                    +{platformsList.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          <Link to={`/projects/${project.slug}`} className="block">
            <h3 className="text-lg font-bold text-text-primary group-hover:text-secondary transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>

          <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
            {summary}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {techList.slice(0, 4).map(tech => (
              <TechChip key={tech} label={tech} />
            ))}
            {techList.length > 4 && (
              <span className="text-xs font-mono text-text-muted self-center">
                +{techList.length - 4}
              </span>
            )}
          </div>

          {/* Details Link */}
          <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-secondary transition-colors">
            <span className="flex items-center gap-1">
              <span>{locale === "ar" ? "دراسة الحالة والمواصفات" : "Specs & Case Study"}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </span>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-muted hover:text-secondary p-1"
                title="Live URL"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
