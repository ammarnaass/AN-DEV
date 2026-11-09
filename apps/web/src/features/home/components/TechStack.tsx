import React from "react";
import { Cpu } from "lucide-react";
import { useI18n } from "../../../lib/i18n";

const techs = [
  "TypeScript",
  "React / Vite",
  "Next.js",
  "Fastify",
  "SQLite / Postgres",
  "Drizzle ORM",
  "Tailwind CSS",
  "Flutter",
  "Docker",
  "Linux / CI/CD"
];

export const TechStack: React.FC = () => {
  const { locale } = useI18n();

  return (
    <section className="w-full bg-surface-container-low border-y border-line py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 text-text-muted font-mono text-xs sm:text-sm whitespace-nowrap">
          <Cpu className="w-4 h-4 text-secondary" />
          <span className="font-semibold tracking-wide">
            {locale === "ar" ? "الترسانة التقنية المعتمدة :" : "Validated Tech Arsenal:"}
          </span>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-text-muted font-mono text-xs sm:text-sm">
          {techs.map(tech => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-surface-container border border-line text-text-primary hover:text-secondary hover:border-secondary/40 hover:bg-surface-elevated transition-all select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
