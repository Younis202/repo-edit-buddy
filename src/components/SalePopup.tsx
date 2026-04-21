import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Gift, X } from "lucide-react";
import { Link } from "react-router-dom";
import essentialPocket from "@/assets/essentials/essential-pocket-hero.jpg";

const STORAGE_KEY = "shazaya_essentials_drawer_v4";
const AUTO_OPEN_TRIGGER = 0.28;

const SalePopup = () => {
  const [open, setOpen] = useState(false);
  const [autoOpenEnabled, setAutoOpenEnabled] = useState(true);
  const { scrollY } = useScroll();
  const ribbonY = useTransform(scrollY, [0, 1200], [0, 180]);
  const ribbonRotate = useTransform(scrollY, [0, 1000], [0, -2]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    setAutoOpenEnabled(!wasDismissed);

    if (wasDismissed) return;

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      if (progress >= AUTO_OPEN_TRIGGER) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    setAutoOpenEnabled(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="افتح هدية شذايا — أسعار في المتناول"
        style={{ y: ribbonY, rotate: ribbonRotate }}
        className="fixed top-28 left-3 md:left-5 z-[70] group flex items-center gap-2.5"
      >
        {/* Gift bow icon — refined */}
        <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-foreground border border-accent/40 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)]">
          {/* bow loops */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-[80%] w-3.5 h-2.5 border border-accent/70 rounded-full rotate-[-20deg]" />
          <span className="absolute -top-1.5 left-1/2 translate-x-[-20%] w-3.5 h-2.5 border border-accent/70 rounded-full rotate-[20deg]" />
          <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
          <Gift className="w-5 h-5 md:w-6 md:h-6 text-accent" strokeWidth={1.5} />
          {/* pulse ring */}
          <motion.span
            animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 border border-accent/50 pointer-events-none"
          />
        </div>

        {/* Always-visible label pill */}
        <div className="flex flex-col items-start bg-background/85 backdrop-blur-md border border-accent/25 px-3 py-2 shadow-lg group-hover:border-accent/50 transition-colors duration-400">
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
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="fixed inset-0 z-[90] bg-background/45 backdrop-blur-[3px]"
              onClick={close}
            />

            <motion.aside
              initial={{ x: "-108%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-108%", opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-4 right-4 bottom-4 md:left-6 md:right-auto md:bottom-6 z-[100] w-auto md:w-[420px] bg-card border border-accent/20 overflow-hidden"
              style={{ boxShadow: "0 32px 90px -18px rgba(0,0,0,0.7), 0 0 50px hsla(38,60%,55%,0.12)" }}
              role="dialog"
              aria-modal="true"
              aria-label="هدية شذايا"
            >
              <div className="absolute inset-2 border border-accent/[0.08] pointer-events-none z-10" />

              <button
                onClick={close}
                aria-label="إغلاق"
                className="absolute top-3 left-3 z-20 w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-accent transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] min-h-[280px]">
                <div className="relative bg-gradient-to-br from-secondary/60 via-background to-secondary/20 overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={essentialPocket}
                    alt="عبوة الجيب من شذايا"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <div className="absolute top-3 right-3 bg-foreground text-background px-2.5 py-1">
                    <span className="text-[8px] tracking-[0.2em] font-accent">−٤٣٪</span>
                  </div>
                </div>

                <div className="p-6 md:p-7 text-right flex flex-col justify-between gap-5">
                  <div>
                    <p className="text-[9px] tracking-[0.28em] text-accent/70 font-accent mb-3">
                      هدية شذايا · ESSENTIALS
                    </p>
                    <div className="luxury-divider mb-5 mr-0 ml-auto" />
                    <h3 className="font-display text-2xl md:text-3xl leading-[1.05] text-foreground mb-3">
                      أسعار
                      <span className="text-gold-gradient italic"> في المتناول</span>
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-body mb-4">
                      مجموعة اقتصادية بنفس روح شذايا — تبدأ من
                      <span className="text-accent"> ١٩٩ ج.م</span>
                      ، بتغليف فاخر وشخصية كاملة.
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-5 border-t border-border/40 pt-4">
                    <Link
                      to="/essentials"
                      onClick={close}
                      className="group inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-background bg-foreground px-5 py-3 hover:bg-accent hover:text-accent-foreground transition-colors duration-500 font-accent"
                    >
                      <span>اكتشف المجموعة</span>
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
                    </Link>
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground/55 line-through font-body">٣٥٠ ج.م</p>
                      <p className="font-display text-2xl text-accent">١٩٩</p>
                      <p className="text-[9px] tracking-[0.22em] text-muted-foreground/60 font-accent">ج.م</p>
                    </div>
                  </div>
                </div>
              </div>

              {autoOpenEnabled && <div className="h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SalePopup;
