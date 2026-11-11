import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../../lib/i18n";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project } from "@andev/shared";

export interface ProjectDetailNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export const ProjectDetailNavigation: React.FC<ProjectDetailNavigationProps> = ({
  prevProject,
  nextProject,
}) => {
  const { locale, isRtl } = useI18n();

  return (
    <nav className="pt-8 border-t border-line flex items-center justify-between gap-4 text-start">
      {prevProject ? (
        <Link
          to={`/projects/${prevProject.slug}`}
          className="flex items-center gap-2 p-3 rounded-lg bg-surface border border-line hover:border-secondary/40 text-xs sm:text-sm font-semibold text-text-muted hover:text-text-primary transition-all"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span className="truncate max-w-[150px] sm:max-w-[200px]">
            {locale === "ar" ? prevProject.title_ar : prevProject.title_en}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextProject ? (
        <Link
          to={`/projects/${nextProject.slug}`}
          className="flex items-center gap-2 p-3 rounded-lg bg-surface border border-line hover:border-secondary/40 text-xs sm:text-sm font-semibold text-text-muted hover:text-text-primary transition-all"
        >
          <span className="truncate max-w-[150px] sm:max-w-[200px]">
            {locale === "ar" ? nextProject.title_ar : nextProject.title_en}
          </span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};

