import React from "react";
import { Link } from "react-router-dom";
import { Project } from "@andev/shared";
import { useI18n } from "../../lib/i18n";
import { TechChip } from "../ui/TechChip";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { locale, isRtl } = useI18n();

  const title = locale === "ar" ? project.title_ar : project.title_en;
  const summary = locale === "ar" ? project.summary_ar : project.summary_en;
  const techList: string[] = typeof project.tech_json === "string"
    ? JSON.parse(project.tech_json || "[]")
    : project.tech_json || [];

  return (
    <div className="group rounded-card border border-line bg-surface overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow flex flex-col text-start">
      {/* 16:10 Cover image container */}
      <Link to={`/projects/${project.slug}`} className="block relative aspect-[16/10] bg-bg overflow-hidden">
        {project.cover_image ? (
          <img
            src={project.cover_image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback placeholder pattern if image is missing
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-80" />
        {project.featured && (
          <span className="absolute top-3 end-3 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-accent text-[#050816] shadow-sm">
            {locale === "ar" ? "مميز" : "Featured"}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-mute text-sm line-clamp-2 leading-relaxed">
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
              <span className="text-xs font-mono text-mute self-center">
                +{techList.length - 4}
              </span>
            )}
          </div>

          {/* Details Link */}
          <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-accent transition-colors">
            <span className="flex items-center gap-1">
              <span>{locale === "ar" ? "تفاصيل المشروع" : "Case Study"}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </span>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-mute hover:text-accent p-1"
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
