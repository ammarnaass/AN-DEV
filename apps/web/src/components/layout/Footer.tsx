import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Github, Linkedin, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-line mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-line">
          {/* Col 1: Brand & Operational Status */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Logo size={38} />
            <p className="text-text-muted text-sm max-w-md leading-relaxed">
              {locale === "ar"
                ? "نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية - الجزائر. تجربة برمجية متقدمة تواكب التطور السحابي والخوارزمي بأعلى معايير الجودة."
                : "Algerian software agency engineering high-performance web, mobile, and custom systems built for scale and reliability with mathematical precision."}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container border border-line text-secondary font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
                <span>{locale === "ar" ? "الجزائر العاصمة | أنظمة نشطة" : "Algiers Hub | Active Systems"}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-secondary font-bold">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <Link to="/" className="hover:text-text-primary transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-text-primary transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-text-primary transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-text-primary transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-text-primary transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Coordinates */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-secondary font-bold">
              {locale === "ar" ? "بيانات التواصل والمقر" : "Direct Coordinates"}
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a href="mailto:contact@andev.dz" className="hover:text-text-primary transition-colors">
                  contact@andev.dz
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a href="https://wa.me/213550123456" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors" dir="ltr">
                  +213 550 12 34 56
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                <span>{locale === "ar" ? "الجزائر العاصمة، الجمهورية الجزائرية" : "Algiers, Algeria"}</span>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a
                  href="https://github.com/an-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <Link
                  to="/admin/login"
                  className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors"
                  title="Admin Access"
                >
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            &copy; {new Date().getFullYear()} AN DEV. All Rights Reserved. // Code · Create · Solve
          </div>
          <div className="flex items-center gap-4">
            <span className="text-secondary font-semibold">Algeria Tech Hub</span>
            <span>•</span>
            <span>Vite + React + SQLite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
