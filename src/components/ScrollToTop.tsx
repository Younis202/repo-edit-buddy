import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to top whenever the route pathname changes.
 * Place inside <BrowserRouter> but above <Routes>.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use 'auto' (instant) so it never feels janky after a page transition.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // Also reset documentElement for browsers that ignore window.scrollTo on some routes.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
