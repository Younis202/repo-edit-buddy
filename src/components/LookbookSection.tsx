import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";

const LookbookSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <section id="lookbook" ref={sectionRef} className="px-6 md:px-12 py-16 md:py-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20 md:mb-32"
      >
        <p className="text-xs tracking-ultra uppercase text-muted-foreground mb-4 font-body">SS26 Campaign</p>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[0.95]">
          Between
          <br />
          <span className="italic">Light & Shadow</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start max-w-7xl mx-auto">
        {/* Left image - larger */}
        <motion.div
          style={{ y: y1 }}
          className="md:col-span-5"
        >
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { opacity: 1, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            className="relative overflow-hidden aspect-[3/4]"
          >
            <img
              src={lookbook1}
              alt="SS26 Campaign — Look 01"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="mt-4 text-xs tracking-editorial uppercase text-muted-foreground font-body"
          >
            Look 01 — The Charcoal Suit
          </motion.p>
        </motion.div>

        {/* Center image — tall, offset up */}
        <motion.div
          style={{ y: y2 }}
          className="md:col-span-4 md:mt-32"
        >
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { opacity: 1, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
            className="relative overflow-hidden aspect-[3/4]"
          >
            <img
              src={lookbook2}
              alt="SS26 Campaign — Look 02"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
            className="mt-4 text-xs tracking-editorial uppercase text-muted-foreground font-body"
          >
            Look 02 — Detail: The Timepiece
          </motion.p>
        </motion.div>

        {/* Right image — smaller */}
        <motion.div
          style={{ y: y3 }}
          className="md:col-span-3 md:mt-64"
        >
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { opacity: 1, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="relative overflow-hidden aspect-[3/4]"
          >
            <img
              src={lookbook3}
              alt="SS26 Campaign — Look 03"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.6 }}
            className="mt-4 text-xs tracking-editorial uppercase text-muted-foreground font-body"
          >
            Look 03 — The Camel Coat
          </motion.p>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mt-20 md:mt-32"
      >
        <a
          href="#"
          className="inline-flex items-center gap-6 text-xs tracking-ultra uppercase text-foreground/80 hover:text-accent transition-colors duration-500 group font-body"
        >
          <span className="block w-16 h-px bg-foreground/30 group-hover:w-24 group-hover:bg-accent transition-all duration-700" />
          <span>View Full Lookbook</span>
          <span className="block w-16 h-px bg-foreground/30 group-hover:w-24 group-hover:bg-accent transition-all duration-700" />
        </a>
      </motion.div>
    </section>
  );
};

export default LookbookSection;
