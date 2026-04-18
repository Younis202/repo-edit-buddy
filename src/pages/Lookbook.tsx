import { useRef } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";

import lookbook1 from "@/assets/lookbook-2 (1).jpg";
import lookbook0 from "@/assets/omar2.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import heroImage from "@/assets/hero-image.jpg";
import craftsmanship1 from "@/assets/craftsmanship-1.jpg";

const editorialSpreads = [
  {
    id: 1,
    title: "بين",
    titleItalic: "النور والظل",
    caption: "الفصل الأول — ساعة الهدوء",
    description:
      "صُوِّر عند الفجر في قصر فلورنسي مهجور. كل ظل يحكي قصة من الرقي والتحفظ.",
    images: [lookbook1, collection1],
    layout: "left-heavy" as const,
  },
  {
    id: 2,
    title: "ثقل",
    titleItalic: "اللاشيء",
    caption: "الفصل الثاني — بلا وزن",
    description:
      "عطور خفيفة كالهواء تذوب في الروح. التقطت في حركة طبيعية، بلا تكلّف.",
    images: [collection2, lookbook2],
    layout: "right-heavy" as const,
  },
  {
    id: 3,
    title: "صمت",
    titleItalic: "يُلبَس",
    caption: "الفصل الثالث — الثابت",
    description: "دراسة في الأحادية. حين يتحدث العطر، لا يحتاج مرتديه أن ينطق.",
    images: [lookbook3, collection3],
    layout: "left-heavy" as const,
  },
];

const galleryImages = [
  {
    src: collection4,
    aspect: "aspect-[3/4]",
    span: "md:col-span-1 md:row-span-2",
  },
  { src: heroImage, aspect: "aspect-[4/3]", span: "md:col-span-1" },
  { src: craftsmanship1, aspect: "aspect-[4/3]", span: "md:col-span-1" },
  {
    src: lookbook0,
    aspect: "aspect-[3/4]",
    span: "md:col-span-1 md:row-span-2",
  },
  { src: collection2, aspect: "aspect-[4/3]", span: "md:col-span-1" },
  { src: lookbook3, aspect: "aspect-[4/3]", span: "md:col-span-1" },
];

const Lookbook = () => {
  usePageSEO({
    title: "الكتالوج",
    description:
      "كتالوج شذايا — صور حصرية وأجواء فاخرة من عالم العطور الشرقية.",
  });
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />

          {/* Hero */}
          <section ref={heroRef} className="relative h-[100vh] overflow-hidden">
            <motion.div
              style={{ scale: heroScale }}
              className="absolute inset-0"
            >
              <img
                src={lookbook1}
                alt="كتاب الإطلالات"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "var(--hero-overlay)" }}
              />
            </motion.div>

            <motion.div
              style={{ opacity: heroOpacity }}
              className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12"
            >
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[10px] tracking-wide text-accent font-body mb-6"
              >
                إصدار ٢٠٢٦ — تصوير حصري
              </motion.p>

              <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-light leading-[0.85] tracking-tight text-foreground mb-8">
                كتاب <span className="italic">الإطلالات</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-muted-foreground font-body text-sm max-w-md leading-relaxed"
              >
                سرد بصري في ثلاثة فصول — لحظات مصمّمة تتأرجح بين القصد والغريزة.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute left-6 md:left-12 bottom-28 hidden md:block"
              >
                <p className="text-[10px] tracking-wide text-foreground/30 font-body [writing-mode:vertical-rl]">
                  مرّر للاستكشاف
                </p>
              </motion.div>
            </motion.div>
          </section>

          {/* Scrolling marquee */}
          <section className="py-8 border-y border-border/20 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-12 font-display text-3xl md:text-5xl font-light text-foreground/[0.06] tracking-tight"
                >
                  إصدار ٢٠٢٦ — بين النور والظل — الفصل الأول–الثالث — إصدار ٢٠٢٦
                  —
                </span>
              ))}
            </div>
          </section>

          {/* Editorial Spreads */}
          {editorialSpreads.map((spread, i) => (
            <EditorialSpread key={spread.id} spread={spread} index={i} />
          ))}

          {/* Pull Quote */}
          <QuoteSection />

          {/* Masonry Gallery */}
          <GallerySection />

          {/* Credits */}
          <CreditsSection />

          {/* CTA */}
          <section className="py-20 md:py-28 px-6 md:px-12 border-t border-border/20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-2">
                  تسوّق الإصدار
                </p>
                <h3 className="font-display text-2xl md:text-4xl font-light text-foreground">
                  كل عطر. <span className="italic">متوفر الآن.</span>
                </h3>
              </div>
              <Link
                to="/shop"
                className="group flex items-center gap-3 text-[11px] tracking-wide font-body text-foreground hover:text-accent transition-colors border border-border/30 hover:border-accent/40 px-8 py-4"
              >
                <span>تسوّق المجموعة</span>
                <ArrowRight
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

const EditorialSpread = ({
  spread,
  index,
}: {
  spread: (typeof editorialSpreads)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const img1Y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const img2Y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const isLeftHeavy = spread.layout === "left-heavy";

  return (
    <section
      ref={ref}
      className="py-16 md:py-28 px-6 md:px-12 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20"
        >
          <p className="text-[10px] tracking-wide text-accent font-body mb-4">
            {spread.caption}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.9]">
            {spread.title}
            <br />
            <span className="italic">{spread.titleItalic}</span>
          </h2>
        </motion.div>

        <div
          ref={imgRef}
          className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-12`}
        >
          <div
            className={`${
              isLeftHeavy ? "md:col-span-7" : "md:col-span-5"
            } overflow-hidden`}
          >
            <motion.div
              style={{ y: img1Y }}
              className="relative group cursor-pointer"
            >
              <img
                src={spread.images[0]}
                alt={spread.title}
                className="w-full aspect-[4/5] object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/10 group-hover:bg-background/0 transition-colors duration-700" />
              <div className="absolute bottom-6 left-6 pointer-events-none">
                <span className="font-display text-[8rem] md:text-[12rem] font-light leading-none text-foreground/[0.04]">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          </div>
          <div
            className={`${
              isLeftHeavy ? "md:col-span-5" : "md:col-span-7"
            } flex flex-col gap-4 md:gap-6`}
          >
            <motion.div
              style={{ y: img2Y }}
              className="flex-1 overflow-hidden group cursor-pointer"
            >
              <img
                src={spread.images[1]}
                alt={spread.titleItalic}
                className="w-full h-full object-cover aspect-[4/5] md:aspect-auto transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="py-6"
            >
              <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm">
                {spread.description}
              </p>
              <div className="luxury-divider mt-6" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuoteSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-28 md:py-40 px-6 md:px-12 border-t border-border/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[15vw] font-light text-foreground/[0.02] tracking-tight leading-none whitespace-nowrap">
          شذايا
        </span>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.2] tracking-tight"
        >
          العطر لا يُصدر <span className="italic text-accent">ضجيجاً</span>.
          <br />
          بل يصنع <span className="italic">صمتاً</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[10px] tracking-wide text-muted-foreground font-body mt-10"
        >
          — المدير الإبداعي، شذايا
        </motion.p>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-4">
            خلف العدسة
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground">
            اللقطات <span className="italic">الحصرية</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`overflow-hidden group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={`معرض ${i + 1}`}
                className={`w-full h-full object-cover ${img.aspect} transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CreditsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const credits = [
    { role: "التصوير", name: "استوديو البلّيني" },
    { role: "التنسيق", name: "مارغو ديلارو" },
    { role: "الإخراج الفني", name: "شذايا الإبداعية" },
    { role: "الموقع", name: "قصر كورسيني، فلورنسا" },
    { role: "التجميل", name: "أتيليه بوتيه" },
    { role: "الإنتاج", name: "استوديوهات شذايا" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 border-t border-border/20"
    >
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-wide text-muted-foreground font-body mb-10 text-center"
        >
          فريق العمل
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
          {credits.map((credit, i) => (
            <motion.div
              key={credit.role}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-1">
                {credit.role}
              </p>
              <p className="font-display text-base text-foreground">
                {credit.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
