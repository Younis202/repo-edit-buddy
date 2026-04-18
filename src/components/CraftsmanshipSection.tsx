import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import craftsmanship1 from "@/assets/craftsmanship-1.jpg";
import GoldenOrnament from "@/components/GoldenOrnament";

const steps = [
  { num: "٠١", title: "اختيار المواد", desc: "نختار من أجود المصادر في العالم. عود كمبودي، ورد طائفي، مسك طبيعي. كل مكوّن يُختار بعناية فائقة." },
  { num: "٠٢", title: "التركيب", desc: "كل تركيبة تُصاغ من الصفر على يد خبراء العطور. لا قوالب جاهزة، لا تكرار." },
  { num: "٠٣", title: "التعتيق", desc: "أكثر من ٩٠ يوماً من التعتيق لكل عطر. الصبر هو سر الكمال." },
  { num: "٠٤", title: "التغليف", desc: "كل زجاجة تُفحص ثلاث مرات قبل أن تحمل اسم شذايا. الفخامة في التفاصيل." },
];

const CraftsmanshipSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="craftsmanship" ref={sectionRef} className="px-6 md:px-12 py-16 md:py-28 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
        <motion.div initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={isInView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }} className="relative aspect-square overflow-hidden lg:sticky lg:top-32">
          <motion.img src={craftsmanship1} alt="معمل شذايا" className="w-full h-full object-cover" style={{ y: imageY }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
          <div className="absolute bottom-6 right-6">
            <span className="text-[10px] tracking-wide text-foreground/60 bg-background/40 backdrop-blur-md px-3 py-1.5 font-body">المعمل — القاهرة</span>
          </div>
        </motion.div>
        <div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
            <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-5">العملية</p>
            <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }} className="luxury-divider mb-6 origin-right" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-[0.95]">صُنع <span className="text-gold-gradient">بإتقان</span></h2>
          </motion.div>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }} className="group py-8 border-b border-border/30 hover:border-accent/30 transition-colors duration-700 cursor-default">
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="font-display text-3xl md:text-5xl font-bold text-foreground/[0.08] group-hover:text-accent/30 transition-colors duration-700 leading-none mt-1 select-none">{step.num}</span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-500 mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body max-w-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <GoldenOrnament size="sm" className="!mx-0 mt-12 mb-8" />
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }} className="flex items-center gap-8">
            <div className="text-center">
              <span className="font-display text-3xl md:text-4xl text-accent">+٩٠</span>
              <p className="text-[11px] tracking-wide text-muted-foreground mt-2 font-accent">يوم تعتيق</p>
            </div>
            <div className="w-px h-12 bg-border/30" />
            <div className="text-center">
              <span className="font-display text-3xl md:text-4xl text-accent">٨</span>
              <p className="text-[11px] tracking-wide text-muted-foreground mt-2 font-accent">خبراء عطور</p>
            </div>
            <div className="w-px h-12 bg-border/30" />
            <div className="text-center">
              <span className="font-display text-3xl md:text-4xl text-accent">٣×</span>
              <p className="text-[11px] tracking-wide text-muted-foreground mt-2 font-accent">فحوصات جودة</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
