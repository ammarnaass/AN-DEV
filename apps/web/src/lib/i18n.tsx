import React, { createContext, useContext, useState, useEffect } from "react";

export type Locale = "ar" | "en";

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  isRtl: boolean;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.services": "خدماتنا",
    "nav.projects": "أعمالنا",
    "nav.blog": "المدونة",
    "nav.contact": "تواصل معنا",
    "nav.start_project": "ابدأ مشروعك",
    "hero.tag": "Code · Create · Solve",
    "hero.title": "أفكار نُحوّلها إلى تطبيقات تُحدث فرقاً",
    "hero.desc": "نطوّر برمجيات بشغف لتمكين الشركات وأصحاب المشاريع في الجزائر وخارجها من التوسع عبر حلول رقمية موثوقة.",
    "hero.btn.start": "ابدأ مشروعك",
    "hero.btn.work": "استكشف أعمالنا",
    "services.title": "ماذا نبني",
    "services.subtitle": "حلول متكاملة تلبّي أدق متطلبات عملك",
    "services.web.title": "تطبيقات الويب والمنصات السحابية",
    "services.web.desc": "واجهات تفاعلية فائقة السرعة مع خوادم قوية وآمنة تدعم آلاف المستخدمين المتزامنين.",
    "services.mobile.title": "تطبيقات الموبايل (iOS & Android)",
    "services.mobile.desc": "تطبيقات أصلية وهجينة بأداء استثنائي وتجربة مستخدم مدروسة بعناية.",
    "services.systems.title": "قواعد البيانات والأنظمة المخصصة وAPI",
    "services.systems.desc": "هندسة نظم خلفية متماسكة ومصممة للتوسع والعمل دون انقطاع.",
    "projects.title": "أعمال مختارة",
    "projects.view_all": "عرض جميع الأعمال",
    "process.title": "كيف نعمل",
    "process.1.num": "01",
    "process.1.title": "تخطيط واستيعاب الفكرة",
    "process.1.desc": "ندرس متطلبات مشروعك ونحدد المعمارية التقنية والتصميم الأنسب قبل كتابة سطر كود واحد.",
    "process.2.num": "02",
    "process.2.title": "تطوير سريع ومستمر",
    "process.2.desc": "نبني بنية تحتية نظيفة مع دورات مراجعة مستمرة تضمن لك رؤية التقدم أسبوعاً بأسبوع.",
    "process.3.num": "03",
    "process.3.title": "إطلاق، تأمين وتوسّع",
    "process.3.desc": "ننشر المشروع على خوادم محمية مع نسخ احتياطي وتدريب ودعم فني مستمر.",
    "cta.title": "هل أنت مستعد لنقل فكرتك إلى أرض الواقع؟",
    "cta.desc": "احصل على استشارة تقنية مجانية وعرض سعر مخصص لمشروعك خلال 48 ساعة.",
    "contact.title": "طلب مشروع جديد",
    "contact.subtitle": "أخبرنا بتفاصيل فكرتك وسنتواصل معك لمناقشة خطة التنفيذ",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.type": "نوع المشروع",
    "contact.budget": "الميزانية التقديرية (اختياري)",
    "contact.message": "تفاصيل الفكرة والمتطلبات",
    "contact.submit": "إرسال طلب المشروع",
    "contact.success_title": "تم استلام طلبك بنجاح!",
    "contact.success_desc": "شكراً لثقتك في AN DEV. سنقوم بدراسة متطلباتك والرد عليك بالبريد خلال يومي عمل.",
    "footer.rights": "جميع الحقوق محفوظة © AN DEV"
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.projects": "Portfolio",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.start_project": "Start a Project",
    "hero.tag": "Code · Create · Solve",
    "hero.title": "Transforming Ideas into Impactful Software",
    "hero.desc": "We build high-performance web, mobile, and custom systems empowering companies in Algeria and globally to scale.",
    "hero.btn.start": "Start a Project",
    "hero.btn.work": "Explore Our Work",
    "services.title": "What We Build",
    "services.subtitle": "Tailored software engineered for your business needs",
    "services.web.title": "Web Applications & Cloud Platforms",
    "services.web.desc": "High-performance reactive frontends backed by robust, secure, and horizontally scalable backend services.",
    "services.mobile.title": "Mobile Apps (iOS & Android)",
    "services.mobile.desc": "Cross-platform and native mobile solutions engineered with intuitive UX and offline resilience.",
    "services.systems.title": "Databases, APIs & Custom Systems",
    "services.systems.desc": "Resilient system architectures designed for high throughput, data integrity, and 99.9% uptime.",
    "projects.title": "Featured Projects",
    "projects.view_all": "View All Work",
    "process.title": "How We Work",
    "process.1.num": "01",
    "process.1.title": "Discovery & Planning",
    "process.1.desc": "We analyze your business requirements, define architectural boundaries, and design the solution before code is written.",
    "process.2.num": "02",
    "process.2.title": "Agile Development",
    "process.2.desc": "Iterative delivery with weekly milestone demos, automated testing, and strict code review gates.",
    "process.3.num": "03",
    "process.3.title": "Launch & Evolution",
    "process.3.desc": "Production deployment with automated backups, monitoring, and ongoing support for continuous growth.",
    "cta.title": "Ready to bring your software vision to life?",
    "cta.desc": "Get a free technical consultation and a tailored quotation for your project within 48 hours.",
    "contact.title": "Request a Project",
    "contact.subtitle": "Tell us about your project vision and we will schedule an introductory technical call",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.type": "Project Type",
    "contact.budget": "Estimated Budget (Optional)",
    "contact.message": "Project Details & Scope",
    "contact.submit": "Submit Project Inquiry",
    "contact.success_title": "Inquiry Received Successfully!",
    "contact.success_desc": "Thank you for reaching out to AN DEV. We will review your requirements and respond within 2 business days.",
    "footer.rights": "All rights reserved © AN DEV"
  }
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{
  children: React.ReactNode;
  initialLocale?: Locale;
}> = ({ children, initialLocale }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (initialLocale) return initialLocale;
    const saved = typeof window !== "undefined" ? localStorage.getItem("andev_locale") : null;
    return (saved === "en" || saved === "ar") ? saved : "ar";
  });

  const isRtl = locale === "ar";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      document.documentElement.lang = locale;
      localStorage.setItem("andev_locale", locale);
    }
  }, [locale, isRtl]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const toggleLocale = () => setLocaleState(prev => (prev === "ar" ? "en" : "ar"));

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.ar[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, isRtl, t }}>
      {children}
    </I18nContext.Provider>
  );
};

const defaultI18nContext: I18nContextType = {
  locale: "ar",
  setLocale: () => {},
  toggleLocale: () => {},
  isRtl: true,
  t: (k: string) => translations.ar[k] || k,
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  return context || defaultI18nContext;
};

