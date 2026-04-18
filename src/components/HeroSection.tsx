import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-shazaya.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  return (
    <section ref={ref} className="relative h-[120vh] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="شذايا — عطور فاخرة ٢٠٢٦"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(40,20%,5%,0.15) 0%, hsla(40,20%,5%,0.4) 40%, hsla(40,20%,5%,0.92) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: -90 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden md:block origin-center"
      >
        <span className="text-[10px] tracking-wide text-foreground/25 font-body whitespace-nowrap">
          ٢٠٢٦ — فن العطور الشرقية
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 90 }}
        animate={{ opacity: 1, rotate: 90 }}
        transition={{ delay: 3.4, duration: 0.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 hidden md:block origin-center"
      >
        <span className="text-[10px] tracking-wide text-foreground/15 font-body whitespace-nowrap">
          صُنع يدوياً بعناية
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12"
      >
        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] md:text-xs tracking-[0.2em] text-foreground/40 font-accent"
          >
            مجموعة ٢٠٢٦ الحصرية
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-[3.5rem] md:text-[7rem] lg:text-[9.5rem] font-bold text-foreground leading-[0.95] mb-2">
            فن <span className="text-gold-gradient italic">العطور</span>
          </h1>
        </motion.div>

        <div className="overflow-hidden mt-12 md:mt-16">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-10"
          >
            <a
              href="#collection"
              className="inline-flex items-center gap-4 text-[12px] md:text-xs tracking-wide text-background bg-foreground px-8 py-3.5 hover:bg-accent hover:text-accent-foreground transition-colors duration-500 font-accent"
            >
              تسوّق الآن
            </a>
            <a
              href="#lookbook"
              className="inline-flex items-center gap-4 text-[11px] md:text-xs tracking-wide text-foreground/60 hover:text-accent transition-colors duration-500 group font-accent"
            >
              <span>استكشف المجموعة</span>
              <span className="block w-12 h-px bg-foreground/20 group-hover:w-20 group-hover:bg-accent transition-all duration-700" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-wide text-foreground/20 font-body">
          اكتشف
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
