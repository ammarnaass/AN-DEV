import React from "react";
import { Globe, Smartphone, Server, ArrowUpRight } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { Link } from "react-router-dom";

export const Services: React.FC = () => {
  const { locale } = useI18n();

  const services = [
    {
      code: "CORE.01",
      icon: Globe,
      title: locale === "ar"
        ? "تطبيقات الويب المتقدمة والمنصات التفاعلية"
        : "Advanced Web Apps & Interactive Platforms",
      desc: locale === "ar"
        ? "بناء منصات رقمية متجاوبة وسريعة جداً باستخدام أحدث ممارسات الواجهات، مع إدارة بيانات متزامنة وتجربة مستخدم مخصصة وفق أعلى معايير الـ UX."
        : "Building lightning-fast, resilient web platforms using modern front-end architectures, real-time data sync, and high-conversion UX standards.",
      techs: ["React", "Vite", "Next.js", "Node.js", "Tailwind CSS"]
    },
    {
      code: "CORE.02",
      icon: Smartphone,
      title: locale === "ar"
        ? "تطبيقات الموبايل والأنظمة الهجينة متعددة المنصات"
        : "Cross-Platform Mobile Apps & Offline-First Systems",
      desc: locale === "ar"
        ? "تطوير تطبيقات أصلية وهجينة بنظام التشغيل Android و iOS ذات تجربة سلسة وقدرة على العمل دون اتصال ومزامنة سحابية فائقة الاعتمادية."
        : "Developing high-performance Android & iOS mobile applications with offline-first persistence, native hardware access, and seamless synchronization.",
      techs: ["Flutter", "React Native", "Android", "iOS", "Local DB"]
    },
    {
      code: "CORE.03",
      icon: Server,
      title: locale === "ar"
        ? "هندسة الأنظمة الخلفية والـ API وقواعد البيانات فائقة السرعة"
        : "High-Throughput Backend APIs & Low-Latency Architecture",
      desc: locale === "ar"
        ? "تصميم خوادم API منخفضة التأخير (Sub-25ms) مع قواعد بيانات مدمجة أو موزعة (SQLite WAL, PostgreSQL) وحماية أمنية مشددة للمؤسسات."
        : "Designing sub-25ms REST APIs with embedded and distributed architectures (SQLite WAL, PostgreSQL), strict cryptographic security, and enterprise scalability.",
      techs: ["Fastify", "SQLite WAL", "PostgreSQL", "Drizzle ORM", "Docker"]
    }
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto" id="services">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs sm:text-sm">
            <span>01 // SERVICES &amp; CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {locale === "ar" ? "ماذا نبني" : "What We Build"}
          </h2>
        </div>
        <p className="text-text-muted text-sm sm:text-base max-w-md">
          {locale === "ar"
            ? "حلول هندسية مصممة للعمل دون انقطاع مع تركيز جذري على الأمان، السرعة والاستدامة البرمجية."
            : "Engineering solutions designed for uninterrupted uptime with relentless focus on security, speed, and software longevity."}
        </p>
      </div>

      {/* Architectural Cards Container */}
      <div className="flex flex-col gap-4">
        {services.map(s => {
          const IconComponent = s.icon;
          return (
            <div
              key={s.code}
              className="group p-6 sm:p-8 rounded-xl bg-surface border border-line hover:border-secondary/40 hover:bg-surface-elevated transition-all duration-300 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5 max-w-2xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface-container border border-line flex items-center justify-center text-secondary group-hover:bg-primary-container group-hover:text-white transition-all shrink-0">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-secondary font-bold">{s.code}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-secondary transition-colors">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Stack Chips & CTA Link */}
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-3 self-start lg:self-center shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {s.techs.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-surface-container border border-line text-xs font-mono text-text-muted group-hover:text-text-primary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="w-9 h-9 rounded-lg bg-surface-container border border-line hidden sm:flex items-center justify-center text-text-muted group-hover:text-secondary group-hover:border-secondary/50 transition-colors"
                  title="Discuss Service"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

