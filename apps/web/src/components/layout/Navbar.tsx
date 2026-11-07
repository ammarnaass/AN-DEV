import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { Logo } from "./Logo";
import { Button } from "../ui/Button";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";

export const Navbar: React.FC = () => {
  const { locale, toggleLocale, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const navLinks = [
    { href: "/#services", label: t("nav.services") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") }
  ];

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-line shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto p-inline-safe flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-mute">
          {navLinks.map(link => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors hover:text-accent ${
                  isActive ? "text-accent font-semibold" : ""
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line text-xs font-mono text-mute hover:text-accent hover:border-accent/40 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "EN" : "عربي"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-line text-mute hover:text-accent hover:border-accent/40 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* CTA */}
          <Link to="/contact">
            <Button size="sm" variant="primary">
              {t("nav.start_project")}
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLocale}
            className="p-1.5 rounded border border-line text-xs font-mono text-mute"
          >
            {locale === "ar" ? "EN" : "عربي"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink rounded border border-line"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-line px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-ink hover:text-accent py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm text-mute"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{isDark ? "الوضع الفاتح" : "الوضع الداكن"}</span>
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

