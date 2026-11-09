import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Project } from "@andev/shared";
import { Button } from "../components/ui/Button";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Activity,
  Layers,
  Zap,
  ShieldCheck
} from "lucide-react";

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, isRtl } = useI18n();

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
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-surface rounded" />
        <div className="h-12 w-3/4 bg-surface rounded" />
        <div className="h-96 bg-surface rounded-xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-40 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">
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
  const summary = locale === "ar" ? project.summary_ar : project.summary_en;
  const body = locale === "ar" ? project.body_ar : project.body_en;
  const techList: string[] = typeof project.tech_json === "string"
    ? JSON.parse(project.tech_json || "[]")
    : project.tech_json || [];

  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <article className="pt-24 sm:pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-start">
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
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-white text-sm font-semibold hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]">
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

      {/* Engineering Impact KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-surface border border-line flex flex-col gap-1">
          <div className="flex items-center gap-2 text-secondary font-mono text-xs">
            <Zap className="w-4 h-4" />
            <span>{locale === "ar" ? "تحسين الأداء" : "Throughput Gain"}</span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">+140%</span>
          <span className="text-xs text-text-muted">{locale === "ar" ? "تسريع معالجة الطلبات" : "Order processing latency drop"}</span>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-line flex flex-col gap-1">
          <div className="flex items-center gap-2 text-status-ok font-mono text-xs">
            <Activity className="w-4 h-4" />
            <span>{locale === "ar" ? "توافر النظام" : "High Availability"}</span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-status-ok">99.98%</span>
          <span className="text-xs text-text-muted">{locale === "ar" ? "جاهزية دون توقف" : "Zero-downtime cluster SLA"}</span>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-line flex flex-col gap-1">
          <div className="flex items-center gap-2 text-secondary font-mono text-xs">
            <Layers className="w-4 h-4" />
            <span>{locale === "ar" ? "زمن استجابة الـ API" : "Average API Latency"}</span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-secondary">24ms</span>
          <span className="text-xs text-text-muted">{locale === "ar" ? "في شبكة الجيل الرابع الجزائرية" : "Measured on 4G in Algeria"}</span>
        </div>
      </div>

      {/* Main Cover Image */}
      {project.cover_image && (
        <div className="rounded-2xl border border-line overflow-hidden bg-surface-container shadow-card">
          <img
            src={project.cover_image}
            alt={title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Tech Arsenal Tags */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-mono uppercase tracking-widest text-secondary font-bold">
          {locale === "ar" ? "الترسانة التقنية المستخدمة" : "Applied Engineering Stack"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {techList.map(tech => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-mono font-medium text-text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Detailed Architectural Breakdown (Body) */}
      <div className="space-y-8 pt-4 border-t border-line">
        <div className="prose prose-invert max-w-none text-text-muted leading-relaxed space-y-6">
          <div className="p-6 rounded-xl bg-surface border border-line space-y-3">
            <div className="flex items-center gap-2 text-secondary font-mono text-xs font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>{locale === "ar" ? "التحدي الهندسي والتجاري" : "The Engineering Challenge"}</span>
            </div>
            <p className="text-text-primary text-sm sm:text-base">
              {body || summary}
            </p>
          </div>
        </div>
      </div>

      {/* Previous & Next Navigation */}
      <div className="pt-8 border-t border-line flex items-center justify-between gap-4">
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
        ) : <div />}

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
        ) : <div />}
      </div>
    </article>
  );
};
