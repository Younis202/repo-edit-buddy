import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GoldenOrnament from "@/components/GoldenOrnament";
import SmokeEffect from "@/components/SmokeEffect";

const words = ["لا", "نتبع", "الصيحات.", "نصنع", "عطوراً", "خالدة", "تتجاوز", "كل", "موسم."];

const StatementSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.4"] });

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-12 flex items-center justify-center relative overflow-hidden">
      <SmokeEffect />
      <div className="max-w-5xl text-center relative z-10">
        <GoldenOrnament size="lg" className="mb-14" />
        <p className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.4] md:leading-[1.4]">
          <span className="text-accent/40 ml-3">"</span>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} italic={word === "خالدة"} />;
          })}
          <span className="text-accent/40 mr-1">"</span>
        </p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-14 text-xs tracking-[0.2em] text-muted-foreground font-accent">
          — المدير الفني، شذايا
        </motion.p>
        <GoldenOrnament size="md" className="mt-14" />
      </div>
    </section>
  );
};

const Word = ({ word, range, progress, italic }: { word: string; range: [number, number]; progress: any; italic?: boolean }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ml-[0.3em] ${italic ? "italic text-accent" : ""}`}>{word}</motion.span>
  );
};

export default StatementSection;
