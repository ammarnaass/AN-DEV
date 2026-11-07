import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Project } from "@andev/shared";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Button } from "../components/ui/Button";
import { Layers } from "lucide-react";

export const ProjectsPage: React.FC = () => {
  const { locale } = useI18n();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["public-projects"],
    queryFn: () => apiFetch<Project[]>("/api/projects")
  });

  const filters = [
    { id: "all", label_ar: "جميع الأعمال", label_en: "All Projects" },
    { id: "web", label_ar: "تطبيقات الويب", label_en: "Web Apps" },
    { id: "mobile", label_ar: "تطبيقات الموبايل", label_en: "Mobile Apps" },
    { id: "system", label_ar: "الأنظمة والـ API", label_en: "Systems & APIs" }
  ];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === "all") return true;
    const tech = (typeof p.tech_json === "string" ? p.tech_json : JSON.stringify(p.tech_json || [])).toLowerCase();
    const title = (p.title_ar + " " + p.title_en).toLowerCase();
    const summary = (p.summary_ar + " " + p.summary_en).toLowerCase();
    const combined = `${tech} ${title} ${summary}`;

    if (activeFilter === "web") return combined.includes("web") || combined.includes("react") || combined.includes("ويب");
    if (activeFilter === "mobile") return combined.includes("mobile") || combined.includes("flutter") || combined.includes("موبايل");
    if (activeFilter === "system") return combined.includes("system") || combined.includes("api") || combined.includes("نظام") || combined.includes("erp");
    return true;
  });

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto p-inline-safe space-y-12">
      {/* Header */}
      <div className="space-y-4 text-start max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface text-xs font-mono text-accent">
          <Layers className="w-3.5 h-3.5" />
          <span>{locale === "ar" ? "معرض الأعمال" : "Portfolio"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
          {locale === "ar" ? "مشاريع بنيناها بشغف ودقة" : "Software We Engineered with Precision"}
        </h1>
        <p className="text-mute text-base leading-relaxed">
          {locale === "ar"
            ? "استكشف مجموعة من تطبيقات الويب والموبايل والأنظمة المتكاملة التي طوّرناها لمختلف القطاعات في الجزائر."
            : "Explore selected web applications, mobile products, and scalable enterprise platforms delivered by AN DEV."}
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2.5 pb-2 border-b border-line">
        {filters.map(f => {
          const isSelected = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all select-none ${
                isSelected
                  ? "bg-primary text-[#050816] shadow-sm font-bold"
                  : "bg-surface border border-line text-mute hover:text-ink hover:border-accent/40"
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
            <div key={i} className="h-80 rounded-card border border-line bg-surface/40 animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 rounded-card border border-line bg-surface/30">
          <p className="text-mute text-base">
            {locale === "ar" ? "لا توجد مشاريع في هذا التصنيف حالياً" : "No projects found in this category"}
          </p>
          <Button variant="secondary" size="sm" onClick={() => setActiveFilter("all")}>
            {locale === "ar" ? "عرض جميع الأعمال" : "Show All Projects"}
          </Button>
        </div>
      )}
    </div>
  );
};
