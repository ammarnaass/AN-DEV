import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <footer className="border-t border-line bg-surface/40 pt-16 pb-12 mt-20">
      <div className="max-w-6xl mx-auto p-inline-safe">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-line">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Logo size={40} />
            <p className="text-mute text-sm max-w-sm leading-relaxed">
              {locale === "ar"
                ? "شركة برمجيات جزائرية متخصصة في بناء تطبيقات الويب والموبايل والأنظمة السحابية المتقدمة وفق أعلى معايير الجودة."
                : "Algerian software agency engineering high-performance web, mobile, and custom systems built for scale and reliability."}
            </p>
            <div className="flex items-center gap-3 pt-2 text-mute">
              <a
                href="https://github.com/an-dev"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-line hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-line hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              {locale === "ar" ? "روابط سريعة" : "Navigation"}
            </h4>
            <ul className="space-y-2 text-sm text-mute">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-accent transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-accent transition-colors text-xs opacity-75">
                  {locale === "ar" ? "لوحة الإدارة" : "Admin Login"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              {locale === "ar" ? "تواصل مباشر" : "Direct Contact"}
            </h4>
            <ul className="space-y-2.5 text-sm text-mute">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contact@andev.dz" className="hover:text-accent transition-colors">
                  contact@andev.dz
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://wa.me/213550123456" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" dir="ltr">
                  +213 550 12 34 56
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{locale === "ar" ? "الجزائر العاصمة، الجزائر" : "Algiers, Algeria"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-mute/80 gap-3">
          <p>{t("footer.rights")}</p>
          <div className="flex items-center gap-4 font-mono">
            <span>Vite + React</span>
            <span>•</span>
            <span>Fastify + SQLite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
