import React, { useEffect } from "react";
import { useI18n } from "../../lib/i18n";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image = "/og-image.png",
  url = "https://andev.dz"
}) => {
  const { locale } = useI18n();

  const siteTitle = title
    ? `${title} | AN DEV`
    : (locale === "ar"
        ? "AN DEV | شركة تطوير برمجيات وتطبيقات ويب وموبايل في الجزائر"
        : "AN DEV | High-Performance Software Agency in Algeria");

  const metaDesc = description || (locale === "ar"
    ? "شركة برمجيات جزائرية تبني تطبيقات ويب وموبايل وأنظمة مخصصة سحابية متقدمة للأعمال والشركات."
    : "Bespoke web, mobile, and custom backend systems engineering for high-growth businesses.");

  useEffect(() => {
    document.title = siteTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", metaDesc);
    setMeta("og:title", siteTitle, true);
    setMeta("og:description", metaDesc, true);
    setMeta("og:image", image, true);
    setMeta("og:url", url, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", siteTitle);
    setMeta("twitter:description", metaDesc);
  }, [siteTitle, metaDesc, image, url]);

  return null;
};

