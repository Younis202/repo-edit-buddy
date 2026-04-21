// قسم "أسعار في المتناول" — نسخة مكثّفة، فاخرة، متناسقة مع باقي سكاشن الهوم
// 3 منتجات في صف أنيق · animation هادي · تيلر نحو /essentials
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import productPocketOil from "@/assets/essentials/product-pocket-oil.jpg";
import productSprayClassic from "@/assets/essentials/product-spray-classic.jpg";
import productSpraySignature from "@/assets/essentials/product-spray-signature.jpg";

interface MiniProduct {
  slug: string;
  name: string;
  italic: string;
  size: string;
  price: string;
  original: string;
  image: string;
}

const products: MiniProduct[] = [
  {
    slug: "pocket-oil",
    name: "الزيت الخام",
    italic: "Pocket Oil",
    size: "٤ · ٦ · ٨ جرام",
    price: "١٩٩",
    original: "٣٤٩",
    image: productPocketOil,
  },
  {
    slug: "spray-classic",
    name: "الرشاش الكلاسيكي",
    italic: "Classic Spray",
    size: "٥٠ · ١٠٠ مل",
    price: "٢٩٩",
    original: "٤٩٩",
    image: productSprayClassic,
  },
  {
    slug: "spray-signature",
    name: "رشاش التوقيع",
    italic: "Signature Spray",
    size: "٥٠ · ١٠٠ مل",
    price: "٣٢٩",
    original: "٥٤٩",
    image: productSpraySignature,
  },
];

const EssentialsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      id="essentials"
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* subtle ambient gold */}
      <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header — matches other home sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] text-accent/70 mb-5 font-accent">
            ESSENTIALS · مجموعة الأساسيات
          </p>
          <div className="luxury-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground leading-[1] mb-5">
            الفخامة <span className="text-gold-gradient italic">في متناولك</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground/75 leading-relaxed font-body max-w-lg mx-auto">
            نفس الزيوت. نفس الإتقان. ثلاث عبوات بأسعار تبدأ من
            <span className="text-accent"> ١٩٩ ج.م</span>.
          </p>
        </motion.div>

        {/* 3 Products — clean editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <Link to={`/product/${p.slug}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-secondary/30 to-background mb-5">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-accent/[0.08]" />
                  {/* corner discount tag */}
                  <div className="absolute top-4 right-4 bg-foreground/90 backdrop-blur-sm text-background px-2.5 py-1">
                    <span className="text-[9px] tracking-[0.18em] font-accent">عرض</span>
                  </div>
                </div>

                <div className="text-right px-1">
                  <p className="text-[9px] tracking-[0.28em] text-accent/70 font-accent mb-2">
                    {p.italic}
                  </p>
                  <h3 className="font-display text-2xl text-foreground mb-1 leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.18em] text-muted-foreground/60 font-accent mb-3">
                    {p.size}
                  </p>
                  <div className="flex items-baseline justify-between gap-3 pt-3 border-t border-border/30">
                    <span className="text-[10px] tracking-[0.2em] text-foreground/60 group-hover:text-accent transition-colors font-accent inline-flex items-center gap-1.5">
                      عرض
                      <ArrowLeft className="w-2.5 h-2.5 group-hover:-translate-x-0.5 transition-transform" />
                    </span>
                    <div className="text-left">
                      <span className="text-[10px] text-muted-foreground/55 line-through font-body ml-2">
                        {p.original}
                      </span>
                      <span className="font-display text-xl text-accent">{p.price}</span>
                      <span className="text-[9px] tracking-[0.2em] text-muted-foreground/60 font-accent mr-1">
                        ج.م
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <Link
            to="/essentials"
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.22em] text-foreground border-b border-foreground/40 pb-2 hover:text-accent hover:border-accent transition-colors duration-500 font-accent"
          >
            <span>اكتشف المجموعة كاملة</span>
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EssentialsSection;
