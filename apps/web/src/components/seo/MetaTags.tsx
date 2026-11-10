import React, { useEffect } from "react";
import { useI18n } from "../../lib/i18n";
import { usePublicSettings } from "../../hooks/usePublicSettings";

export interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}) => {
  const { locale } = useI18n();
  const { settings } = usePublicSettings();

  const brandName = "AN DEV";
  const defaultTitleAr =
    settings.seo_site_title_ar || "AN DEV | وكالة تطوير برمجيات، مواقع وتطبيقات في الجزائر";
  const defaultTitleEn =
    settings.seo_site_title_en || "AN DEV | High-Performance Software Development Agency Algeria";

  const siteTitle = title
    ? `${title} | ${brandName}`
    : locale === "ar"
    ? defaultTitleAr
    : defaultTitleEn;

  const metaDesc =
    description ||
    (locale === "ar"
      ? settings.seo_meta_description_ar ||
        "وكالة برمجيات جزائرية متخصصة في تطوير مواقع الويب، تطبيقات الهاتف، أنظمة نقاط البيع POS، وبرمجيات إدارة المؤسسات ERP بأعلى معايير الأداء والسرعة."
      : settings.seo_meta_description_en ||
        "Top software engineering agency in Algeria building bespoke web platforms, mobile apps, ERPs, and cloud systems engineered for scale and speed.");

  const metaKeywords =
    keywords ||
    (locale === "ar"
      ? settings.seo_keywords_ar ||
        "تطوير برمجيات الجزائر, برمجة مواقع, تصميم تطبيقات, تطبيقات موبايل الجزائر, أنظمة نقاط البيع, برمجة أنظمة ERP, مطور برامج, وكالة برمجيات, AN DEV"
      : settings.seo_keywords_en ||
        "software agency algeria, web development algeria, mobile apps algeria, custom software, ERP systems, POS systems, AN DEV");

  const canonicalBase = (settings.seo_canonical_url || "https://andev.dz").replace(/\/$/, "");
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const currentUrl = url
    ? url.startsWith("http")
      ? url
      : `${canonicalBase}${url}`
    : `${canonicalBase}${pathname}`;

  const ogImage = image || settings.seo_og_image || "/brand/brand-board.webp";
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${canonicalBase}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

  const robotsDirective = noindex
    ? "noindex, nofollow"
    : settings.seo_robots_indexing || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  useEffect(() => {
    // 1. Page Title
    document.title = siteTitle;

    // Helper: Meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      if (!content && content !== "") return;
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper: Link tags
    const setLink = (rel: string, href: string, extraAttrs?: Record<string, string>) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs?.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        if (extraAttrs) {
          for (const [k, v] of Object.entries(extraAttrs)) {
            el.setAttribute(k, v);
          }
        }
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Standard SEO Tags
    setMeta("description", metaDesc);
    setMeta("keywords", metaKeywords);
    setMeta("author", settings.seo_author || "AN DEV Agency");
    setMeta("robots", robotsDirective);

    // Search Console Verifications
    if (settings.seo_google_verification) {
      setMeta("google-site-verification", settings.seo_google_verification);
    }
    if (settings.seo_bing_verification) {
      setMeta("msvalidate.01", settings.seo_bing_verification);
    }

    // Geo-Targeting (Algeria / Algiers)
    setMeta("geo.region", settings.seo_geo_region || "DZ-16");
    setMeta("geo.placename", settings.seo_geo_placename || "Algiers");
    setMeta("geo.position", "36.7538;3.0588");
    setMeta("ICBM", "36.7538, 3.0588");

    // Open Graph / Facebook / WhatsApp
    setMeta("og:site_name", brandName, true);
    setMeta("og:title", siteTitle, true);
    setMeta("og:description", metaDesc, true);
    setMeta("og:url", currentUrl, true);
    setMeta("og:image", fullOgImage, true);
    setMeta("og:type", type, true);
    setMeta("og:locale", locale === "ar" ? "ar_DZ" : "en_US", true);
    setMeta("og:locale:alternate", locale === "ar" ? "en_US" : "ar_DZ", true);

    if (publishedTime) {
      setMeta("article:published_time", publishedTime, true);
    }
    if (modifiedTime) {
      setMeta("article:modified_time", modifiedTime, true);
    }

    // Twitter / X Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@andev_dz");
    setMeta("twitter:creator", "@andev_dz");
    setMeta("twitter:title", siteTitle);
    setMeta("twitter:description", metaDesc);
    setMeta("twitter:image", fullOgImage);

    // Canonical & Hreflang
    setLink("canonical", currentUrl);
    setLink("alternate", currentUrl, { hreflang: "ar" });
    setLink("alternate", `${currentUrl}${currentUrl.includes("?") ? "&" : "?"}lang=en`, { hreflang: "en" });
    setLink("alternate", currentUrl, { hreflang: "x-default" });

    // Schema.org Structured Data (JSON-LD)
    const activeSocials = [
      settings.facebook,
      settings.github,
      settings.linkedin,
      settings.twitter,
      settings.instagram,
      settings.youtube,
      settings.telegram,
    ].filter(Boolean);

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${canonicalBase}/#website`,
          "url": canonicalBase,
          "name": brandName,
          "description": metaDesc,
          "inLanguage": locale === "ar" ? "ar" : "en",
          "publisher": { "@id": `${canonicalBase}/#organization` }
        },
        {
          "@type": ["Organization", "ProfessionalService"],
          "@id": `${canonicalBase}/#organization`,
          "name": brandName,
          "alternateName": ["AN DEV Algeria", "وكالة تطوير برمجيات AN DEV", "AN DEV Agency"],
          "url": canonicalBase,
          "logo": `${canonicalBase}/brand/logo-squircle.webp`,
          "image": fullOgImage,
          "description": metaDesc,
          "email": settings.email || "contact@andev.dz",
          "telephone": settings.phone || "+213550123456",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Algiers",
            "addressLocality": "Algiers",
            "addressRegion": "Algiers",
            "addressCountry": "DZ"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.7538,
            "longitude": 3.0588
          },
          "sameAs": activeSocials
        }
      ]
    };

    let scriptEl = document.querySelector("#schema-org-jsonld") as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "schema-org-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(structuredData);

  }, [
    siteTitle,
    metaDesc,
    metaKeywords,
    currentUrl,
    fullOgImage,
    type,
    publishedTime,
    modifiedTime,
    robotsDirective,
    locale,
    settings,
  ]);

  return null;
};
