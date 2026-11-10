import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { Logo } from "./Logo";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";
import { Menu, X, Sun, Moon, Globe, ArrowLeft, ArrowRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const { locale, toggleLocale, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: locale === "ar" ? "الرئيسية" : "Home" },
    { href: "/#services", label: t("nav.services") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") }
  ];

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-line shadow-[0_1px_16px_rgba(0,0,0,0.12)] py-3"
          : "bg-surface/75 backdrop-blur-lg border-b border-line-subtle py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Lockup */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <Logo size={36} />
          </Link>
        </div>

        {/* Desktop Navigation Links with active pill styling */}
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.map(link => {
            const isActive =
              link.href === "/"
                ? location.pathname === "/" && !location.hash
                : link.href.startsWith("/#")
                ? location.hash === link.href.substring(1)
                : location.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-container text-white shadow-[0_0_12px_rgba(13,110,253,0.35)]"
                    : "text-text-muted hover:text-text-primary hover:bg-surface-container"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-mono text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-secondary" />
            <span className="font-semibold">{locale === "ar" ? "EN" : "عربي"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg bg-surface-container border border-line flex items-center justify-center text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors"
            title={locale === "ar" ? "تبديل المظهر (فاتح / داكن)" : "Toggle theme (Dark / Light)"}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-warn" /> : <Moon className="w-4 h-4 text-secondary" />}
          </button>

          {/* Start Project CTA Button */}
          <Link to="/contact">
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]">
              <span>{t("nav.start_project")}</span>
              {locale === "ar" ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLocale}
            className="px-2 py-1 rounded bg-surface-container border border-line text-xs font-mono text-secondary"
          >
            {locale === "ar" ? "EN" : "عربي"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-text-primary"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-line px-4 pt-3 pb-6 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-surface-container"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-line flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs text-text-muted"
            >
              {isDark ? <Sun className="w-4 h-4 text-warn" /> : <Moon className="w-4 h-4 text-secondary" />}
              <span>{isDark ? (locale === "ar" ? "الوضع الفاتح" : "Light Mode") : (locale === "ar" ? "الوضع الداكن" : "Dark Mode")}</span>
            </button>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" variant="primary">
                {t("nav.start_project")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
