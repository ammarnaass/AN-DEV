import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useProjects, ProjectCard } from "../../portfolio";
import { Hero } from "../components/Hero";
import { TechStack } from "../components/TechStack";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { HomeConversionCta } from "../components/HomeConversionCta";
import { MetaTags } from "../../../components/seo/MetaTags";

export const HomePage: React.FC = () => {
  const { locale, isRtl } = useI18n();
  const { data: projects = [] } = useProjects();
  const featured = projects.slice(0, 3);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <MetaTags />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Tech Stack Horizontal Banner */}
      <TechStack />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Featured Portfolio (02 // SHOWCASE) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto border-t border-line" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2 text-start">
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
      <HomeConversionCta />
    </div>
  );
};

