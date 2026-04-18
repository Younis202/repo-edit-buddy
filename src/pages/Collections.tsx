import { useRef } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/data/products";

import categoryOuterwear from "@/assets/category-outerwear.jpg";
import categoryKnitwear from "@/assets/category-knitwear.jpg";
import categoryTailoring from "@/assets/category-tailoring.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";

const collectionMeta = [
  {
    name: "عود",
    tagline: "ملك العطور الشرقية",
    description: "عطور عود فاخرة من أجود أنواع خشب العود الكمبودي والهندي. تركيبات غنية وعميقة تدوم طوال اليوم وتترك أثراً لا يُنسى.",
    image: categoryOuterwear,
    filter: "عود",
  },
  {
    name: "زهري",
    tagline: "نعومة تتحدث عن الذوق",
    description: "عطور زهرية من ورد طائفي أصيل وياسمين دمشقي. كل قطرة مستخلصة من بتلات مقطوفة يدوياً عند الفجر.",
    image: categoryKnitwear,
    filter: "زهري",
  },
  {
    name: "شرقي",
    tagline: "دفء ليالي الشرق",
    description: "تركيبات شرقية حصرية تجمع بين العنبر والزعفران والفانيليا. عطور تحكي قصة الشرق بكل رشة.",
    image: categoryTailoring,
    filter: "شرقي",
  },
  {
    name: "مسك",
    tagline: "نقاء بلا حدود",
    description: "مسك طبيعي نادر بتركيبات نقية وصافية. من مسك الطهارة الأبيض إلى المسك الأسود الجريء.",
    image: categoryAccessories,
    filter: "مسك",
  },
];

const Collections = () => {
  const { data: allProducts = [] } = useProducts();
  const collections = collectionMeta.map((c) => ({
    ...c,
    count: allProducts.filter((p) => p.category === c.filter).length,
  }));
  usePageSEO({ title: "المجموعات", description: "اكتشف مجموعات شذايا الحصرية — عطور فاخرة لكل مناسبة." });
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-background/60 z-10" />
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="font-display text-[20vw] font-light text-foreground/[0.03] tracking-tight leading-none select-none">
              ٠٠٤
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-30 px-6 md:px-12 pb-16 md:pb-24 w-full"
        >
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] tracking-wide text-accent font-body mb-6"
          >
            ٤ عوالم — {allProducts.length} عطر
          </motion.p>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light leading-[0.85] tracking-tight text-foreground mb-8">
            تسوّق حسب
            <br />
            <span className="italic">العالم</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-muted-foreground font-body text-sm max-w-md leading-relaxed"
          >
            أربعة عوالم متميزة، فلسفة واحدة مشتركة — الإتقان فوق الموضة، الجودة فوق الكمية، الهدوء فوق الضجيج.
          </motion.p>
        </motion.div>
      </section>

      {/* Collection Sections */}
      {collections.map((col, i) => (
        <CollectionSection key={col.name} collection={col} index={i} products={allProducts.filter((p) => p.category === col.filter)} />
      ))}

      {/* Bottom Statement */}
      <section className="py-24 md:py-36 px-6 md:px-12 border-t border-border/20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.2] tracking-tight"
          >
            أربعة عوالم. <span className="italic text-accent">لغة</span> واحدة.
          </motion.p>
        </div>
      </section>

      {/* All Products CTA */}
      <section className="pb-20 md:pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-border/20 pt-12">
          <div>
            <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-2">
              الأرشيف الكامل
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-light text-foreground">
              عرض جميع {allProducts.length} عطراً
            </h3>
          </div>
          <Link
            to="/shop"
            className="group flex items-center gap-3 text-[11px] tracking-wide font-body text-foreground hover:text-accent transition-colors border border-border/30 hover:border-accent/40 px-8 py-4"
          >
            <span>ادخل المتجر</span>
            <ArrowRight size={14} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
      </SmoothScroll>
    </>
  );
};

const CollectionSection = ({
  collection,
  index,
  products,
}: {
  collection: (typeof collectionMeta)[0] & { count: number };
  index: number;
  products: Product[];
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="border-t border-border/20">
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]`}>
        {/* Image */}
        <div
          ref={imgRef}
          className={`relative overflow-hidden ${isEven ? "" : "lg:order-2"}`}
        >
          <motion.img
            style={{ scale: imgScale, y: imgY }}
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover min-h-[50vh] lg:min-h-full"
          />
          <div className="absolute inset-0 bg-background/20" />

          <div className="absolute bottom-8 left-8 pointer-events-none">
            <span className="font-display text-[10rem] md:text-[14rem] font-light leading-none text-foreground/[0.05]">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-20 ${isEven ? "" : "lg:order-1"}`}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] tracking-wide text-accent font-body mb-6">
              مجموعة 0{index + 1}
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-light text-foreground mb-4 tracking-tight">
              {collection.name}
            </h2>
            <p className="font-display text-xl italic text-muted-foreground mb-8">
              {collection.tagline}
            </p>
            <div className="luxury-divider mb-8" />
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-10 max-w-md">
              {collection.description}
            </p>

            {/* Mini product list */}
            <div className="space-y-0 mb-10 border-t border-border/20">
              {products.slice(0, 3).map((product, pi) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + pi * 0.1, duration: 0.6 }}
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="group flex items-center justify-between py-4 border-b border-border/20 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-14 object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                      <div>
                        <span className="font-display text-base text-foreground group-hover:text-accent transition-colors">
                          {product.name}
                        </span>
                        <p className="text-[10px] text-muted-foreground font-body">{product.material}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-body text-foreground/60">{product.price}</span>
                      <ArrowUpRight size={12} className="text-foreground/20 group-hover:text-accent transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 text-[11px] tracking-wide font-body text-foreground hover:text-accent transition-colors"
            >
              <span>تسوّق {collection.name} — {collection.count} عطور</span>
              <ArrowRight size={14} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
