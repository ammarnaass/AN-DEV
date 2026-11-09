import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Project } from "@andev/shared";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Terminal } from "lucide-react";

export const ProjectsPage: React.FC = () => {
  const { locale } = useI18n();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["public-projects"],
    queryFn: () => apiFetch<Project[]>("/api/projects")
  });

  const filters = [
    { id: "all", label_ar: "الكل (6)", label_en: "All (6)" },
    { id: "web", label_ar: "تطبيقات ويب", label_en: "Web Apps" },
    { id: "mobile", label_ar: "تطبيقات موبايل", label_en: "Mobile Apps" },
    { id: "saas", label_ar: "منصات SaaS", label_en: "SaaS Platforms" },
    { id: "system", label_ar: "أنظمة مؤسسية", label_en: "Enterprise Systems" }
  ];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === "all") return true;
    const tech = (typeof p.tech_json === "string" ? p.tech_json : JSON.stringify(p.tech_json || [])).toLowerCase();
    const title = (p.title_ar + " " + p.title_en).toLowerCase();
    const summary = (p.summary_ar + " " + p.summary_en).toLowerCase();
    const combined = `${tech} ${title} ${summary}`;

    if (activeFilter === "web") return combined.includes("web") || combined.includes("react") || combined.includes("ويب");
    if (activeFilter === "mobile") return combined.includes("mobile") || combined.includes("flutter") || combined.includes("موبايل");
    if (activeFilter === "saas") return combined.includes("saas") || combined.includes("منصة") || combined.includes("b2b");
    if (activeFilter === "system") return combined.includes("system") || combined.includes("api") || combined.includes("لوجستي") || combined.includes("عيادات");
    return true;
  });

  return (
    <div className="w-full pt-24 sm:pt-28 pb-20 bg-background overflow-hidden">
      {/* Ambient Glows */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Page Header & Architectural Monogram */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div className="flex flex-col gap-3 max-w-2xl text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line w-fit">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-xs text-secondary tracking-wider uppercase font-semibold">
                PORTFOLIO // PRODUCTION-READY SYSTEMS
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
              {locale === "ar" ? "أعمالنا ومشاريعنا المنجزة" : "Our Engineered Projects & Portfolio"}
            </h1>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              {locale === "ar"
                ? "استكشف مجموعة من المنصات الرقمية وتطبيقات الويب والموبايل التي قمنا بتطويرها لعملائنا بأحدث المعايير الهندسية، مع التركيز على الأداء العالي والأمان القوي."
                : "Explore high-availability web platforms, mobile apps, and distributed systems developed with extreme precision, speed, and architectural resilience."}
            </p>
          </div>

          {/* Terminal Status Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface border border-line shadow-sm self-start md:self-end shrink-0">
            <div className="w-10 h-10 rounded-lg bg-surface-container border border-line flex items-center justify-center text-secondary">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-start">
              <span className="font-mono text-[11px] text-text-muted">
                STATUS: DEPLOYED
              </span>
              <span className="font-mono text-xs font-bold text-secondary">
                6 PRODUCTION PLATFORMS
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 pb-6 border-b border-line mb-10">
          {filters.map(f => {
            const isSelected = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all select-none ${
                  isSelected
                    ? "bg-primary-container text-white shadow-[0_0_12px_rgba(13,110,253,0.35)]"
                    : "bg-surface-container border border-line text-text-muted hover:text-text-primary hover:border-secondary/40"
                }`}
              >
                {locale === "ar" ? f.label_ar : f.label_en}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 rounded-xl border border-line bg-surface/40 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 rounded-xl border border-line bg-surface/30">
            <p className="text-text-muted text-base">
              {locale === "ar" ? "لا توجد مشاريع في هذا التصنيف حالياً" : "No projects found in this category"}
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="px-4 py-2 rounded-lg bg-surface-container border border-line text-secondary text-sm font-semibold"
            >
              {locale === "ar" ? "عرض جميع الأعمال" : "Show All Projects"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
