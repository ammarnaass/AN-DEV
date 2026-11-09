import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "../components/home/Hero";
import { TechStack } from "../components/home/TechStack";
import { Services } from "../components/home/Services";
import { Process } from "../components/home/Process";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Project } from "@andev/shared";
import { ArrowLeft, ArrowRight, MessageSquareCode } from "lucide-react";

export const HomePage: React.FC = () => {
  const { locale, isRtl } = useI18n();

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["public-projects"],
    queryFn: () => apiFetch<Project[]>("/api/projects")
  });

  const featured = projects.slice(0, 3);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Tech Stack Horizontal Banner */}
      <TechStack />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Featured Portfolio (02 // SHOWCASE) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto border-t border-line" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs sm:text-sm">
              <span>02 // SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              {locale === "ar" ? "أعمال مختارة" : "Selected Case Studies"}
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-xl">
              {locale === "ar"
                ? "نماذج من التطبيقات والأنظمة الإنتاجية التي قمنا بهندستها وإطلاقها بنجاح للشركات في الجزائر وخارجها."
                : "A selection of resilient production systems and applications engineered and shipped by AN DEV."}
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container border border-line text-sm font-semibold text-text-primary hover:text-secondary hover:border-secondary/40 transition-all self-start md:self-end"
          >
            <span>{locale === "ar" ? "عرض كل الأعمال والمشاريع" : "View All Projects"}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* 5. Process Pipeline (03 // ENGINEERING METHODOLOGY) */}
      <div className="border-t border-line">
        <Process />
      </div>

      {/* 6. Conversion CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto rounded-2xl p-8 sm:p-14 lg:p-16 relative overflow-hidden bg-gradient-to-r from-surface via-surface-elevated to-surface border border-line shadow-[0_0_50px_-10px_rgba(13,110,253,0.3)]">
          {/* Internal Ambient Backlights */}
          <div className="absolute -top-24 -end-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -start-24 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-start">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono self-center lg:self-start">
                <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
                <span>{locale === "ar" ? "متاحون الآن للمشاريع الجديدة" : "Available for New Engagements"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-[40px] lg:leading-tight font-extrabold text-text-primary tracking-tight">
                {locale === "ar"
                  ? "جاهز لتحويل فكرتك إلى منتج رقمي متكامل؟"
                  : "Ready to Engineer Your Idea Into a Scalable Platform?"}
              </h2>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                {locale === "ar"
                  ? "سواء كنت تطلق شركة ناشئة أو تطور نظاماً قائماً لشركتك، فريق AN DEV مستعد لتقديم الاستشارة والمعمارية البرمجية التي تضمن نجاحك."
                  : "Whether launching a high-growth startup or modernizing enterprise legacy systems, our engineers deliver the exact software architecture you need."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link to="/contact">
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-white font-semibold text-sm sm:text-base hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_24px_rgba(13,110,253,0.4)] active:scale-[0.98]">
                  <span>{locale === "ar" ? "طلب استشارة أو مشروع" : "Start Project Inquiry"}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </Link>
              <a
                href="https://wa.me/213550123456"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-surface-container border border-line text-text-primary text-sm sm:text-base font-semibold hover:border-secondary/40 hover:text-secondary transition-all active:scale-[0.98]"
              >
                <MessageSquareCode className="w-4 h-4 text-secondary" />
                <span>{locale === "ar" ? "تواصل عبر واتساب" : "WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
