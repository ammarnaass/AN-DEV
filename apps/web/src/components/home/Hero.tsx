import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { Button } from "../ui/Button";
import { GlowingCodeBlock } from "../ui/GlowingCodeBlock";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const { t, isRtl } = useI18n();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto p-inline-safe">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface/60 text-xs font-mono text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("hero.tag")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.25]">
              {t("hero.title")}
            </h1>

            <p className="text-mute text-base sm:text-lg leading-relaxed max-w-xl">
              {t("hero.desc")}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link to="/contact">
                <Button size="lg" variant="primary">
                  <span className="flex items-center gap-2">
                    <span>{t("hero.btn.start")}</span>
                    {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </span>
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="secondary">
                  {t("hero.btn.work")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Glowing Code Window */}
          <div className="lg:col-span-5 relative">
            <GlowingCodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
};
