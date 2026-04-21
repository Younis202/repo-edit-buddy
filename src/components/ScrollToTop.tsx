import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to top whenever the route pathname changes.
 * Place inside <BrowserRouter> but above <Routes>.
 * Also resets the Lenis smooth-scroll instance if present.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1) If Lenis is active, force it to the top instantly so it doesn't
    //    fight with native scrollTo.
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    }
    // 2) Native fallback for browsers / pages without Lenis.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
