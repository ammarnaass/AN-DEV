import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "../components/home/Hero";
import { Services } from "../components/home/Services";
import { Process } from "../components/home/Process";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Button } from "../components/ui/Button";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Project } from "@andev/shared";
import { ArrowLeft, ArrowRight, Code2 } from "lucide-react";

export const HomePage: React.FC = () => {
  const { t, locale, isRtl } = useI18n();

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["public-projects"],
    queryFn: () => apiFetch<Project[]>("/api/projects")
  });

  const featured = projects.slice(0, 3);

  const technologies = [
    "Python", "TypeScript", "React", "Fastify", "Flutter", "SQLite",
    "PostgreSQL", "Docker", "Tailwind CSS", "Dart", "REST API", "Git"
  ];

  return (
    <div className="space-y-10">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Services */}
      <Services />

      {/* 3. Featured Portfolio */}
      <section className="py-20 border-t border-line">
        <div className="max-w-6xl mx-auto p-inline-safe space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-start">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                {t("projects.title")}
              </h2>
              <p className="text-mute text-sm">
                {locale === "ar"
                  ? "نماذج من التطبيقات والأنظمة التي قمنا ببنائها وإطلاقها بنجاح"
                  : "Production software and systems engineered and shipped by AN DEV"}
              </p>
            </div>
            <Link to="/projects">
              <Button variant="secondary" size="sm">
                <span className="flex items-center gap-1.5">
                  <span>{t("projects.view_all")}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section className="py-16 border-t border-line bg-surface/30">
        <div className="max-w-6xl mx-auto p-inline-safe text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent">
            <Code2 className="w-4 h-4" />
            <span>{locale === "ar" ? "التقنيات والأدوات التي نتقنها" : "Core Technologies & Production Stack"}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {technologies.map(tech => (
              <span
                key={tech}
                dir="ltr"
                className="px-4 py-2 rounded-full border border-line bg-surface text-ink text-sm font-mono font-medium hover:border-accent hover:text-accent transition-all select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <Process />

      {/* 6. Bottom Conversion CTA */}
      <section className="py-20 border-t border-line">
        <div className="max-w-4xl mx-auto p-inline-safe">
          <div className="rounded-card border border-primary/40 bg-gradient-to-br from-surface to-bg p-8 sm:p-14 text-center space-y-6 shadow-glow relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-ink">
                {t("cta.title")}
              </h2>
              <p className="text-mute text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                {t("cta.desc")}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4 relative z-10">
              <Link to="/contact">
                <Button size="lg" variant="primary">
                  {t("nav.start_project")}
                </Button>
              </Link>
              <a
                href="https://wa.me/213550123456"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 h-14 rounded border border-line text-ink hover:text-[#25D366] hover:border-[#25D366]/40 text-base font-semibold transition-colors"
              >
                {locale === "ar" ? "تواصل عبر واتساب" : "WhatsApp Us"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
