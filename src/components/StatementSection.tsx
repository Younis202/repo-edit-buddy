import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = [
  "We", "don't", "follow", "trends.", "We", "create",
  "timeless", "pieces", "that", "outlive", "every", "season."
];

const StatementSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-12 flex items-center justify-center">
      <div className="max-w-5xl text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="luxury-divider mx-auto mb-16 origin-left"
        />

        <p className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.4] md:leading-[1.4]">
          <span className="text-foreground/30 mr-3">"</span>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} italic={word === "timeless"} />;
          })}
          <span className="text-foreground/30 ml-1">"</span>
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-14 text-xs tracking-ultra uppercase text-muted-foreground font-body"
        >
          — Artistic Director, MAISON
        </motion.p>
      </div>
    </section>
  );
};

const Word = ({
  word,
  range,
  progress,
  italic,
}: {
  word: string;
  range: [number, number];
  progress: any;
  italic?: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.3em] ${italic ? "italic text-accent" : ""}`}
    >
      {word}
    </motion.span>
  );
};

export default StatementSection;
