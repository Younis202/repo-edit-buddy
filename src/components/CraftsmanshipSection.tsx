import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import craftsmanship1 from "@/assets/craftsmanship-1.jpg";

const steps = [
  { num: "01", title: "Material Sourcing", desc: "Selected from the finest mills in Italy and Japan. Every fiber is chosen for its character, drape, and longevity." },
  { num: "02", title: "Pattern Making", desc: "Each pattern is drafted by hand, accounting for the unique behavior of every fabric we work with." },
  { num: "03", title: "Hand Construction", desc: "Over 40 hours of hand-stitching goes into each garment. No shortcuts, no compromises." },
  { num: "04", title: "Final Pressing", desc: "Every piece is pressed and inspected three times before it earns the MAISON label." },
];

const CraftsmanshipSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="craftsmanship" ref={sectionRef} className="px-6 md:px-12 py-16 md:py-28 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left — sticky image */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={isInView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
          className="relative aspect-square overflow-hidden lg:sticky lg:top-32"
        >
          <motion.img
            src={craftsmanship1}
            alt="MAISON atelier craftsmanship"
            className="w-full h-full object-cover"
            style={{ y: imageY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="text-[9px] tracking-ultra uppercase text-foreground/60 bg-background/40 backdrop-blur-md px-3 py-1.5 font-body">
              Atelier — Florence, Italy
            </span>
          </div>
        </motion.div>

        {/* Right — process steps */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-5 font-body">The Process</p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
              className="luxury-divider mb-6 origin-left"
            />
            <h2 className="font-display text-4xl md:text-6xl font-light text-foreground leading-[0.95]">
              Built by <span className="italic">Hand</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group py-8 border-b border-border/30 hover:border-accent/30 transition-colors duration-700 cursor-default"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="font-display text-3xl md:text-5xl font-light text-foreground/[0.08] group-hover:text-accent/30 transition-colors duration-700 leading-none mt-1 select-none">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-light text-foreground group-hover:text-accent transition-colors duration-500 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body max-w-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center gap-8"
          >
            <div className="text-center">
              <span className="font-display text-3xl md:text-4xl font-light text-accent">40+</span>
              <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mt-2 font-body">Hours per piece</p>
            </div>
            <div className="w-px h-12 bg-border/30" />
            <div className="text-center">
              <span className="font-display text-3xl md:text-4xl font-light text-accent">12</span>
              <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mt-2 font-body">Master artisans</p>
            </div>
            <div className="w-px h-12 bg-border/30" />
            <div className="text-center">
              <span className="font-display text-3xl md:text-4xl font-light text-accent">3×</span>
              <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mt-2 font-body">Quality checks</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
