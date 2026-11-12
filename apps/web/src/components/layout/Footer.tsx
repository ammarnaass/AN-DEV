import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { usePublicSettings } from "../../hooks/usePublicSettings";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { SOCIAL_ITEMS, resolveUrl } from "./footer.constants";

export const Footer: React.FC = () => {
  const { t, locale } = useI18n();
  const { settings } = usePublicSettings();

  const email = settings.email || "contact@andev.dz";
  const phone = settings.phone || "+213 550 12 34 56";
  const whatsappRaw = settings.whatsapp || "+213550123456";
  const whatsappUrl = whatsappRaw.startsWith("http")
    ? whatsappRaw
    : `https://wa.me/${whatsappRaw.replace(/[^0-9]/g, "")}`;

  const locationText = locale === "ar"
    ? settings.location_ar || "الجزائر العاصمة، الجمهورية الجزائرية"
    : settings.location_en || "Algiers, Algeria";

  const footerDescription = locale === "ar"
    ? settings.footer_description_ar || "نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية - ا. تجربة برمجية متقدمة تواكب التطور السحابي والخوارزمي بأعلى معايير الجودة."
    : settings.footer_description_en || "Algerian software agency engineering high-performance web, mobile, and custom systems built for scale and reliability with mathematical precision.";

  // Active social links based on settings
  const activeSocialLinks = SOCIAL_ITEMS.filter(
    (item) => !!settings[item.key]?.trim()
  );

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-line mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Operational Status */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Logo size={38} />
            <p className="text-text-muted text-sm max-w-md leading-relaxed">
              {footerDescription}
            </p>
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

          {/* Col 3: Direct Contact Coordinates & Dynamic Social Links */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-secondary font-bold">
              {locale === "ar" ? "بيانات التواصل والمقر" : "Direct Coordinates"}
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-text-primary transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors" dir="ltr">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                <span>{locationText}</span>
              </li>

              {/* Dynamic Social Networks Ribbon */}
              <li className="pt-2 flex flex-wrap items-center gap-2.5">
                {activeSocialLinks.map((item) => {
                  const url = settings[item.key] || "";
                  const fullUrl = resolveUrl(item.key, url);

                  return (
                    <a
                      key={item.key}
                      href={fullUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-2 rounded-lg bg-surface-container border border-line text-text-muted ${item.color} transition-all hover:scale-105 shadow-sm`}
                      aria-label={item.label}
                      title={item.label}
                    >
                      {item.icon}
                    </a>
                  );
                })}

                {/* Admin Access Lock */}
                <Link
                  to="/admin/login"
                  className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors"
                  title="Admin Access"
                  aria-label="Admin Access"
                >
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
