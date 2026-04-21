import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // expose so ScrollToTop (route change) can reset Lenis instantly
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
