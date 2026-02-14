import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pressLogos = [
  { name: "VOGUE", quote: "Redefining modern luxury with quiet confidence." },
  { name: "GQ", quote: "The brand that understands restraint is the ultimate luxury." },
  { name: "ELLE", quote: "MAISON makes clothes that whisper, not shout." },
  { name: "HARPER'S BAZAAR", quote: "A masterclass in understated elegance." },
  { name: "ESQUIRE", quote: "The future of menswear, rooted in tradition." },
];

const PressSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 border-y border-border/40 overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 md:mb-20 px-6"
      >
        <p className="text-xs tracking-ultra uppercase text-muted-foreground font-body">As Seen In</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5">
        {pressLogos.map((press, i) => (
          <motion.div
            key={press.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="border-b md:border-b-0 md:border-r last:border-r-0 border-border/30 px-6 py-12 md:py-16 text-center group hover:bg-secondary/20 transition-colors duration-700 relative overflow-hidden"
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <h3 className="font-display text-lg md:text-xl tracking-editorial text-foreground/30 group-hover:text-foreground transition-colors duration-500 mb-4">
              {press.name}
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-body italic max-w-[180px] mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              "{press.quote}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PressSection;
