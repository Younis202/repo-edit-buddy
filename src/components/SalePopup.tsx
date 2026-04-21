// شنطة الهدية الذهبية — ribbon ذهبي فاخر يطفو بجانب الموقع.
// الضغط عليه يفتح الـ EssentialsQuickPicker مباشرةً (modal سريع لاختيار العبوة + العطر).
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, X } from "lucide-react";
import { useEssentials } from "@/contexts/EssentialsContext";

const STORAGE_KEY = "shazaya_essentials_ribbon_dismissed_v1";
const AUTO_PULSE_TRIGGER = 0.28;

const SalePopup = () => {
  const { openPicker } = useEssentials();
  const [hidden, setHidden] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const { scrollY } = useScroll();
  const ribbonY = useTransform(scrollY, [0, 1200], [0, 180]);
  const ribbonRotate = useTransform(scrollY, [0, 1000], [0, -2]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    setHidden(wasDismissed);

    if (wasDismissed) return;

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      if (progress >= AUTO_PULSE_TRIGGER) {
        setPulseActive(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHidden(true);
    if (typeof window !== "undefined") sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const handleOpen = () => {
    setPulseActive(false);
    openPicker();
  };

  if (hidden) return null;

  return (
    <motion.div
      style={{ y: ribbonY, rotate: ribbonRotate }}
      className="fixed top-28 left-3 md:left-5 z-[70] group flex items-center gap-2.5"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
        aria-label="افتح هدية شذايا — أسعار في المتناول"
        className="flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        {/* Gift bow icon */}
        <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-foreground border border-accent/40 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)]">
          <span className="absolute -top-1.5 left-1/2 -translate-x-[80%] w-3.5 h-2.5 border border-accent/70 rounded-full rotate-[-20deg]" />
          <span className="absolute -top-1.5 left-1/2 translate-x-[-20%] w-3.5 h-2.5 border border-accent/70 rounded-full rotate-[20deg]" />
          <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
          <Gift className="w-5 h-5 md:w-6 md:h-6 text-accent" strokeWidth={1.5} />
          {pulseActive && (
            <motion.span
              animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 border border-accent pointer-events-none"
            />
          )}
        </div>

        {/* Always-visible label pill */}
        <div className="flex flex-col items-start bg-background/85 backdrop-blur-md border border-accent/25 px-3 py-2 shadow-lg group-hover:border-accent/60 transition-colors duration-400">
          <span className="text-[8px] tracking-[0.28em] text-accent/80 font-accent leading-none mb-1">
            ✦ هدية
          </span>
          <span className="text-[10px] tracking-[0.16em] text-foreground font-accent leading-none whitespace-nowrap">
            أسعار في المتناول
          </span>
          <span className="text-[8px] tracking-[0.2em] text-muted-foreground/70 font-body leading-none mt-1">
            من ١٩٩ ج.م
          </span>
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={dismiss}
        aria-label="إخفاء"
        className="absolute -top-2 -left-2 w-5 h-5 bg-background border border-border/40 rounded-full flex items-center justify-center text-foreground/40 hover:text-accent hover:border-accent/50 transition-colors opacity-0 group-hover:opacity-100"
      >
        <X className="w-2.5 h-2.5" strokeWidth={2} />
      </button>
    </motion.div>
  );
};

export default SalePopup;
