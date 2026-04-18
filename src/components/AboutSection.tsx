import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import aboutImage from "@/assets/about-image.jpg";
import GoldenOrnament from "@/components/GoldenOrnament";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="px-6 md:px-12 py-16 md:py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, hsl(38 60% 55% / 0.03) 0%, transparent 60%)",
        }}
      />
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
          animate={isInView ? { opacity: 1, clipPath: "inset(0 0 0 0%)" } : {}}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          <img
            src={aboutImage}
            alt="معمل شذايا للعطور"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-6">
            قصتنا
          </p>
          <div className="luxury-divider mb-8" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-8">
            صُنعت <br />
            <span className="text-gold-gradient">بعناية</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-[2] mb-6 max-w-md font-body">
            تأسست شذايا على مبدأ أن العطر يجب أن يتجاوز حدود الزمن. نصنع عطوراً
            تعيش عند تقاطع الفن والأصالة، بمواد مستوردة من أجود المصادر في
            العالم.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-[2] mb-10 max-w-md font-body">
            نؤمن بالقوة الهادئة للإتقان — حيث كل نوتة، كل مكوّن، كل قطرة تخدم
            هدفاً.
          </p>
          <GoldenOrnament size="sm" className="!mx-0 mb-8" />
          <Link
            to="/about"
            className="inline-flex items-center gap-4 text-xs tracking-wide text-foreground/80 hover:text-accent transition-colors duration-500 group font-accent"
          >
            <span>اقرأ المزيد</span>
            <span className="block w-12 h-px bg-foreground/40 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
