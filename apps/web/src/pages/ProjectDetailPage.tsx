import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Project } from "@andev/shared";
import { TechChip } from "../components/ui/TechChip";
import { Button } from "../components/ui/Button";
import { ArrowLeft, ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, isRtl } = useI18n();
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["project-detail", slug],
    queryFn: () => apiFetch<Project>(`/api/projects/${slug}`),
    enabled: !!slug
  });

  const { data: allProjects = [] } = useQuery<Project[]>({
    queryKey: ["public-projects"],
    queryFn: () => apiFetch<Project[]>("/api/projects")
  });

  if (isLoading) {
    return (
      <div className="pt-36 pb-24 max-w-4xl mx-auto p-inline-safe space-y-8 animate-pulse">
        <div className="h-8 w-40 bg-surface rounded" />
        <div className="h-12 w-3/4 bg-surface rounded" />
        <div className="h-80 bg-surface rounded-card" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-40 pb-24 max-w-md mx-auto p-inline-safe text-center space-y-4">
        <h2 className="text-2xl font-bold text-ink">
          {locale === "ar" ? "المشروع غير موجود" : "Project Not Found"}
        </h2>
        <Link to="/projects">
          <Button variant="secondary">
            {locale === "ar" ? "العودة للمعرض" : "Back to Portfolio"}
          </Button>
        </Link>
      </div>
    );
  }

  const title = locale === "ar" ? project.title_ar : project.title_en;
  const body = locale === "ar" ? project.body_ar : project.body_en;
  const techList: string[] = typeof project.tech_json === "string"
    ? JSON.parse(project.tech_json || "[]")
    : project.tech_json || [];

  // Previous & Next navigation
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <article className="pt-32 pb-24 max-w-4xl mx-auto p-inline-safe space-y-12 text-start">
      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-accent transition-colors"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{locale === "ar" ? "العودة إلى معرض الأعمال" : "Back to Portfolio"}</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            {title}
          </h1>
          <div className="flex items-center gap-3">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer">
                <Button size="sm" variant="primary">
                  <span className="flex items-center gap-1.5">
                    <span>{locale === "ar" ? "زيارة الموقع" : "Live Demo"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </Button>
              </a>
            )}
            {project.repo_url && (
              <a href={project.repo_url} target="_blank" rel="noreferrer">
                <Button size="sm" variant="secondary">
                  <span className="flex items-center gap-1.5">
                    <Github className="w-4 h-4" />
                    <span>{locale === "ar" ? "الكود" : "Code"}</span>
                  </span>
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-2">
          {techList.map(t => (
            <TechChip key={t} label={t} />
          ))}
        </div>
      </div>

      {/* Large Featured Image */}
      {project.cover_image && (
        <div className="rounded-card border border-line overflow-hidden bg-surface aspect-[16/9] relative shadow-lg">
          <img
            src={project.cover_image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Case Study Content Breakdown */}
      <div className="prose prose-invert max-w-none space-y-6 text-ink/90 leading-relaxed font-sans border-b border-line pb-12">
        <div className="whitespace-pre-line text-base sm:text-lg">
          {body}
        </div>
      </div>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-ink">
            {locale === "ar" ? "معرض لقطات الشاشة" : "Screenshot Gallery"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {project.images.map(img => (
              <div
                key={img.id}
                onClick={() => setActiveModalImage(img.path)}
                className="cursor-pointer rounded-lg border border-line bg-surface overflow-hidden aspect-video hover:border-accent transition-all hover:scale-105"
              >
                <img
                  src={img.path}
                  alt={locale === "ar" ? img.alt_ar : img.alt_en}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-b border-line pb-12">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            className="p-4 rounded-card border border-line bg-surface/40 hover:border-accent transition-colors flex items-center gap-3"
          >
            {isRtl ? <ChevronRight className="w-5 h-5 text-accent" /> : <ChevronLeft className="w-5 h-5 text-accent" />}
            <div>
              <div className="text-xs text-mute font-mono">{locale === "ar" ? "المشروع السابق" : "Previous Project"}</div>
              <div className="text-sm font-bold text-ink line-clamp-1">{locale === "ar" ? prevProject.title_ar : prevProject.title_en}</div>
            </div>
          </Link>
        ) : <div />}

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="p-4 rounded-card border border-line bg-surface/40 hover:border-accent transition-colors flex items-center justify-end text-end gap-3"
          >
            <div>
              <div className="text-xs text-mute font-mono">{locale === "ar" ? "المشروع التالي" : "Next Project"}</div>
              <div className="text-sm font-bold text-ink line-clamp-1">{locale === "ar" ? nextProject.title_ar : nextProject.title_en}</div>
            </div>
            {isRtl ? <ChevronLeft className="w-5 h-5 text-accent" /> : <ChevronRight className="w-5 h-5 text-accent" />}
          </Link>
        )}
      </div>

      {/* Matching Idea CTA */}
      <div className="rounded-card border border-primary/30 bg-surface p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-ink">
          {locale === "ar" ? "هل لديك فكرة أو متطلبات برمجية مشابهة؟" : "Have a similar project requirement?"}
        </h3>
        <p className="text-mute text-sm max-w-md mx-auto">
          {locale === "ar"
            ? "فريقنا جاهز لدراسة فكرتك وتقديم عرض فني ومالي يناسب أهدافك."
            : "Our engineering team is ready to analyze your requirements and provide an architectural blueprint."}
        </p>
        <Link to="/contact">
          <Button variant="primary" size="md">
            {locale === "ar" ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
          </Button>
        </Link>
      </div>

      {/* Modal Zoom View */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveModalImage(null)}
        >
          <button
            onClick={() => setActiveModalImage(null)}
            className="absolute top-6 end-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeModalImage}
            alt="Enlarged screenshot"
            className="max-w-full max-h-[90vh] object-contain rounded"
          />
        </div>
      )}
    </article>
  );
};
