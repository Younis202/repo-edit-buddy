import { useEffect } from "react";

/**
 * Inject a JSON-LD <script> tag for structured data (Schema.org).
 * Removes the previous tag on cleanup to avoid duplicates between pages.
 */
export const useJsonLd = (data: Record<string, unknown> | null) => {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.dataset.jsonld = "page";
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);
};
