import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("revealing"), 300);
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 1800);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  const displayNum = Math.min(Math.round(progress), 100)
    .toString()
    .padStart(3, "0");

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Left curtain */}
          <motion.div
            className="fixed top-0 left-0 w-1/2 h-full z-[100] bg-background"
            initial={{ x: 0 }}
            animate={phase === "revealing" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          />
          {/* Right curtain */}
          <motion.div
            className="fixed top-0 right-0 w-1/2 h-full z-[100] bg-background"
            initial={{ x: 0 }}
            animate={phase === "revealing" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Center content */}
          <motion.div
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center pointer-events-none"
            animate={phase === "revealing" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Giant number */}
            <motion.span
              className="font-display text-[8rem] md:text-[14rem] font-light text-foreground/[0.06] leading-none select-none tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayNum}
            </motion.span>

            {/* Brand */}
            <motion.h1
              initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl md:text-4xl font-light text-foreground absolute"
            >
              MAISON
            </motion.h1>

            {/* Progress bar */}
            <div className="absolute bottom-24 w-48 md:w-64">
              <div className="h-px bg-border/30 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-accent"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-[9px] tracking-ultra uppercase text-muted-foreground font-body text-center"
              >
                Spring / Summer 2026
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
