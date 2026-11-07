import React from "react";
import { useI18n } from "../../lib/i18n";
import { Globe, Smartphone, Server } from "lucide-react";

export const Services: React.FC = () => {
  const { t } = useI18n();

  const services = [
    {
      id: "web",
      icon: <Globe className="w-6 h-6 text-primary flex-shrink-0" />,
      title: t("services.web.title"),
      desc: t("services.web.desc"),
      tags: ["React", "Fastify", "TypeScript", "Tailwind CSS"]
    },
    {
      id: "mobile",
      icon: <Smartphone className="w-6 h-6 text-primary flex-shrink-0" />,
      title: t("services.mobile.title"),
      desc: t("services.mobile.desc"),
      tags: ["Flutter", "Dart", "iOS", "Android"]
    },
    {
      id: "systems",
      icon: <Server className="w-6 h-6 text-primary flex-shrink-0" />,
      title: t("services.systems.title"),
      desc: t("services.systems.desc"),
      tags: ["SQLite", "PostgreSQL", "Docker", "REST API"]
    }
  ];

  return (
    <section id="services" className="py-20 border-t border-line">
      <div className="max-w-6xl mx-auto p-inline-safe">
        {/* Section Header */}
        <div className="space-y-2 mb-12 text-start">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
            {t("services.title")}
          </h2>
          <p className="text-mute text-sm sm:text-base">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Clean Service Rows per PRD specification */}
        <div className="divide-y divide-line">
          {services.map(s => (
            <div
              key={s.id}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-surface/30 px-4 rounded-lg transition-colors"
            >
              <div className="md:col-span-5 flex items-center gap-4 text-start">
                <div className="p-2.5 rounded-lg border border-line bg-surface flex-shrink-0">
                  {s.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-7 space-y-3 text-start">
                <p className="text-ink/90 text-sm sm:text-base leading-relaxed">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      dir="ltr"
                      className="px-2 py-0.5 rounded text-xs font-mono bg-surface border border-line text-mute"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

