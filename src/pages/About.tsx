import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import WaveDivider from "@/components/WaveDivider";
import GoldenOrnament from "@/components/GoldenOrnament";
import SmokeEffect from "@/components/SmokeEffect";
import aboutImage from "@/assets/perfume.jpg";
import aboutAtelier from "@/assets/about-atelier.jpg";
import aboutIngredients from "@/assets/about-ingredients.jpg";
import aboutBoutique from "@/assets/about-boutique.jpg";

const stats = [
  { number: "١٢", label: "عاماً من الإتقان" },
  { number: "٤٧", label: "عطراً فريداً" },
  { number: "١٥", label: "بلداً حول العالم" },
  { number: "١٠٠٪", label: "مكونات طبيعية" },
];

const values = [
  {
    title: "الأصالة",
    desc: "نحافظ على تراث صناعة العطور الشرقية الأصيلة، نكرّم الماضي ونصنع المستقبل بأيدٍ أمينة.",
  },
  {
    title: "الإتقان",
    desc: "كل قطرة تمر بأيدي خبراء متخصصين، كل تركيبة تُختبر مئات المرات حتى تصل للكمال.",
  },
  {
    title: "التفرّد",
    desc: "لا نصنع عطوراً للجميع. نصنع عطوراً لمن يفهم أن العطر هو انعكاس الروح.",
  },
];

const ingredients = [
  { name: "عود كمبودي", origin: "غابات كمبوديا" },
  { name: "ورد طائفي", origin: "مدينة الطائف" },
  { name: "مسك طبيعي", origin: "جبال التبت" },
  { name: "عنبر خام", origin: "سواحل عُمان" },
  { name: "زعفران إيراني", origin: "سهول خراسان" },
  { name: "دهن العود", origin: "أرخبيل الملايو" },
];

const About = () => {
  usePageSEO({
    title: "من نحن",
    description:
      "تعرف على قصة شذايا — براند عطور فاخرة مصري يجمع بين أصالة الشرق وفن صناعة العطور.",
  });
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />

          {/* Hero */}
          <section
            ref={heroRef}
            className="relative h-[90vh] md:h-screen overflow-hidden"
          >
            <motion.div
              style={{ scale: heroScale }}
              className="absolute inset-0"
            >
              <img
                src={aboutBoutique}
                alt="بوتيك شذايا"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, hsla(40,20%,5%,0.4) 0%, hsla(40,20%,5%,0.6) 50%, hsla(40,20%,5%,0.95) 100%)",
                }}
              />
            </motion.div>
            <SmokeEffect />
            <motion.div
              style={{ opacity: heroOpacity }}
              className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[11px] tracking-[0.3em] text-accent/70 font-accent mb-6"
              >
                قصة عطر — قصة إرث
              </motion.p>
              <GoldenOrnament size="md" className="mb-8" />
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-foreground leading-[0.95] mb-6"
              >
                من نحن
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-sm md:text-base text-foreground/50 font-body max-w-lg leading-relaxed"
              >
                حيث يلتقي فن العطور بروح الشرق — رحلة بدأت بشغف وأصبحت إرثاً
                يُعبق الأجيال
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
            >
              <span className="text-[10px] tracking-wide text-foreground/20 font-body">
                اكتشف قصتنا
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
                className="w-px h-12 bg-gradient-to-b from-accent/30 to-transparent"
              />
            </motion.div>
          </section>

          <WaveDivider variant="mist" />

          {/* Origin Story */}
          <section className="px-6 md:px-12 py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center max-w-7xl mx-auto">
              <ParallaxImage src={aboutImage} alt="بداية شذايا" />
              <AnimatedContent>
                <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-4">
                  البداية
                </p>
                <div className="luxury-divider mb-8" />
                <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-8">
                  من شغف <br />
                  صغير
                  <br />
                  إلى إرثٍ <span className="text-gold-gradient">خالد</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-[2] font-body mb-6 max-w-md">
                  بدأت شذايا كحلم في معمل صغير بقلب الجزيرة العربية. كان المؤسس
                  يؤمن بأن العطر ليس مجرد رائحة — بل هو لغة تنطق بما تعجز عنه
                  الكلمات. من هذا الإيمان، وُلدت شذايا.
                </p>
                <p className="text-sm text-muted-foreground leading-[2] font-body mb-10 max-w-md">
                  اليوم، بعد أكثر من عقد من الإتقان، أصبحت شذايا رمزاً للفخامة
                  الأصيلة التي لا تعرف التنازل — عطورٌ تُصنع بأيدي أمهر
                  الحرفيين، من أنقى المكونات، لأرقى الأذواق.
                </p>
                <GoldenOrnament size="sm" className="!mx-0" />
              </AnimatedContent>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 md:py-24 border-y border-border/20 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(38 60% 55% / 0.03) 0%, transparent 70%)",
              }}
            />
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="text-center"
                >
                  <span className="font-display text-4xl md:text-6xl text-accent/80 block mb-3">
                    {stat.number}
                  </span>
                  <span className="text-[11px] tracking-wide text-muted-foreground font-accent">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          <WaveDivider variant="subtle" />

          {/* Philosophy / Values */}
          <section className="px-6 md:px-12 py-20 md:py-32">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-20"
              >
                <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-4">
                  فلسفتنا
                </p>
                <GoldenOrnament size="md" className="mb-8" />
                <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                  ما نؤمن به
                </h2>
                <p className="text-sm text-muted-foreground font-body max-w-lg mx-auto leading-relaxed">
                  ثلاث ركائز تقوم عليها كل قطرة نصنعها — هي بوصلتنا في عالمٍ لا
                  يتوقف عن التغيّر
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.15,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative p-8 md:p-10 border border-border/20 hover:border-accent/30 transition-all duration-700 bg-card/30 backdrop-blur-sm"
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-l from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    <span className="font-display text-6xl md:text-7xl text-foreground/[0.03] absolute top-4 right-4 leading-none select-none">
                      {String(i + 1).padStart(2, "٠")}
                    </span>
                    <h3 className="font-display text-2xl text-foreground mb-4 relative z-10">
                      {v.title}
                    </h3>
                    <div className="luxury-divider mb-6" />
                    <p className="text-sm text-muted-foreground leading-[2] font-body relative z-10">
                      {v.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Atelier */}
          <section className="relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
              <div className="relative h-[50vh] lg:h-auto overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={aboutAtelier}
                  alt="معمل شذايا"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent lg:from-background/80" />
              </div>
              <div className="flex items-center px-6 md:px-12 lg:px-16 py-16 lg:py-0 relative">
                <SmokeEffect />
                <AnimatedContent>
                  <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-4">
                    المعمل
                  </p>
                  <div className="luxury-divider mb-8" />
                  <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-8">
                    حيث يُولد{" "}
                    <span className="text-gold-gradient">الإلهام</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-[2] font-body mb-6 max-w-lg">
                    في معملنا، الوقت لا يُقاس بالساعات — بل بعدد المرات التي
                    يُعاد فيها تركيب كل عطر حتى يصل لنقطة الكمال. خبراؤنا يمزجون
                    بين العلم والفن، بين الدقة والإحساس.
                  </p>
                  <p className="text-sm text-muted-foreground leading-[2] font-body mb-10 max-w-lg">
                    كل عطر يمر بأكثر من ٢٠٠ تجربة قبل أن يحمل اسم شذايا. هذا ليس
                    مجرد إنتاج — هذا طقسٌ مقدّس.
                  </p>
                  <Link
                    to="/lookbook"
                    className="inline-flex items-center gap-4 text-xs tracking-wide text-foreground/80 hover:text-accent transition-colors duration-500 group font-accent"
                  >
                    <span>استكشف الكتالوج</span>
                    <span className="block w-12 h-px bg-foreground/40 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                  </Link>
                </AnimatedContent>
              </div>
            </div>
          </section>

          <WaveDivider variant="gold" />

          {/* Ingredients */}
          <section className="px-6 md:px-12 py-20 md:py-32 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, hsl(38 60% 55% / 0.04) 0%, transparent 60%)",
              }}
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
              <AnimatedContent>
                <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-4">
                  المكونات
                </p>
                <div className="luxury-divider mb-8" />
                <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-8">
                  أندر المكونات <br />
                  من أبعد <span className="text-gold-gradient">الأصقاع</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-[2] font-body mb-10 max-w-md">
                  نسافر إلى أقاصي الأرض بحثاً عن المكونات التي تستحق أن تحمل
                  توقيع شذايا. كل مادة خام تُختار بعناية فائقة من مصادرها
                  الأصلية.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {ingredients.map((ing, i) => (
                    <motion.div
                      key={ing.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className="py-3 border-b border-border/20"
                    >
                      <span className="font-display text-base text-foreground block">
                        {ing.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-body">
                        {ing.origin}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedContent>
              <ParallaxImage
                src={aboutIngredients}
                alt="مكونات شذايا الفاخرة"
              />
            </div>
          </section>

          {/* Quote */}
          <section className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-display text-[40vw] font-bold text-foreground/[0.015] leading-none">
                ش
              </span>
            </div>
            <SmokeEffect />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <GoldenOrnament size="lg" className="mb-12" />
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="font-display text-2xl md:text-4xl lg:text-5xl text-foreground leading-[1.6] mb-10"
              >
                <span className="text-accent/40">"</span>
                العطر هو الشكل الأكثر حميمية من الذاكرة — يسبق الكلمات، يتجاوز
                الزمن، ويبقى حين يُنسى كل شيء
                <span className="text-accent/40">"</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-xs tracking-[0.2em] text-muted-foreground font-accent">
                  — مؤسس شذايا
                </span>
              </motion.div>
              <GoldenOrnament size="lg" className="mt-12" />
            </div>
          </section>

          <WaveDivider variant="mist" flip />

          {/* CTA */}
          <section className="px-6 md:px-12 py-20 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-6">
                ابدأ رحلتك
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8">
                اكتشف عالم شذايا
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-12 leading-relaxed max-w-md mx-auto">
                كل عطر يحكي قصة مختلفة. اعثر على القصة التي تشبهك.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-4 text-[12px] tracking-wide text-background bg-foreground px-10 py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-500 font-accent"
                >
                  تسوّق العطور
                </Link>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-4 text-[12px] tracking-wide text-foreground/60 border border-border/30 px-10 py-4 hover:border-accent/50 hover:text-accent transition-all duration-500 font-accent"
                >
                  استكشف المجموعات
                </Link>
              </div>
            </motion.div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
      animate={isInView ? { opacity: 1, clipPath: "inset(0 0 0 0%)" } : {}}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className="relative aspect-[4/5] overflow-hidden"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
    </motion.div>
  );
};

const AnimatedContent = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default About;
