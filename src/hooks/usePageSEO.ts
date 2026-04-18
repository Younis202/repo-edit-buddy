import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
  ogImage?: string;
}

const BRAND = "شذايا — عطور فاخرة";
const DEFAULT_DESC = "شذايا — براند عطور فاخرة مصري. أجود أنواع العود والمسك والورد الطائفي. تسوق الآن واستمتع بشحن مجاني.";
const SITE_URL = "https://shathaya.com";

function setMeta(name: string, content: string, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export const usePageSEO = ({ title, description, ogImage }: SEOOptions) => {
  useEffect(() => {
    const prev = document.title;
    const fullTitle = title ? `${title} | شذايا` : BRAND;
    const desc = description || DEFAULT_DESC;

    document.title = fullTitle;
    setMeta("description", desc);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "شذايا", "property");
    setMeta("og:url", SITE_URL + window.location.pathname, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);

    if (ogImage) {
      setMeta("og:image", ogImage, "property");
      setMeta("twitter:image", ogImage);
    }

    return () => {
      document.title = prev;
    };
  }, [title, description, ogImage]);
};
