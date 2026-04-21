import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Plus, Minus, ShoppingBag, ArrowUpLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useProducts } from "@/hooks/useProducts";
import { allProducts as fallback, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import packHero from "@/assets/discovery/discovery-pack-hero.jpg";
import vialImg from "@/assets/discovery/discovery-vial.jpg";
import lifestyleImg from "@/assets/discovery/discovery-lifestyle.jpg";

const PACK_SIZE = 5;
const PACK_PRICE = 950; // ج.م
const PACK_PRICE_DISPLAY = "٩٥٠ ج.م";
const TESTER_SIZE_LABEL = "١٠ مل — تستر";

const Discovery = () => {
  usePageSEO({
    title: "صندوق الاكتشاف — جرّب قبل ما تقرر",
    description: "صندوق الاكتشاف من شذايا — اختر ٥ عينات (١٠ مل) من عطورنا الفاخرة بسعر واحد. استكشف عالمك العطري قبل ما تختار قنينتك الكاملة.",
  });
  const { data: products = fallback } = useProducts();
  const [selected, setSelected] = useState<string[]>([]);
  const { addItem } = useCart();

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= PACK_SIZE) return prev;
      return [...prev, id];
    });
  };

  const remaining = PACK_SIZE - selected.length;
  const isComplete = selected.length === PACK_SIZE;

  const selectedProducts = useMemo(
    () => selected.map((id) => products.find((p) => String(p.id) === id)).filter(Boolean) as Product[],
    [selected, products]
  );

  const addPackToCart = () => {
    if (!isComplete) return;
    // Build a synthetic "Discovery Pack" product so it appears as one cart line
    const packProduct: Product = {
      id: `discovery-${Date.now()}`,
      slug: "discovery-set",
      name: "صندوق الاكتشاف — ٥ عينات",
      nameItalic: "الاكتشاف",
      price: PACK_PRICE_DISPLAY,
      category: "اكتشاف",
      gender: "unisex",
      tag: "محدود",
      sizes: [TESTER_SIZE_LABEL],
      images: [packHero],
      colors: [{ name: "ذهبي", value: "hsl(42, 60%, 55%)" }],
      shortDescription: selectedProducts.map((p) => p.name).join(" • "),
      material: "صندوق ٥ عينات ١٠ مل",
      season: "٢٠٢٦",
      accordion: [
        {
          title: "محتويات الصندوق",
          content: selectedProducts.map((p, i) => `${i + 1}. ${p.name} — ${p.category}`).join("\n"),
        },
      ],
    };
    addItem(packProduct, TESTER_SIZE_LABEL, "ذهبي", 1);
    setSelected([]);
  };

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />

          {/* Cinematic Hero */}
          <section
            ref={heroRef}
            className="relative pt-24 md:pt-32 min-h-[88vh] flex items-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={packHero}
                alt="صندوق الاكتشاف — تشكيلة العطور"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
              <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-background/60" />
            </div>

            <div className="relative z-10 px-6 md:px-12 w-full">
              <nav className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-10">
                <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
                <span>/</span>
                <span className="text-foreground">صندوق الاكتشاف</span>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles size={14} strokeWidth={1.5} className="text-accent" />
                  <p className="text-[10px] tracking-[0.3em] text-accent font-body">
                    صندوق الاكتشاف
                  </p>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isHeroInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
                  className="luxury-divider mb-8 origin-right"
                />
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[0.95] mb-8">
                  جرّب قبل ما <span className="italic text-accent">تختار</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-xl mb-10">
                  اختر ٥ عينات (١٠ مل لكل عينة) من مجموعتنا الكاملة — صندوق فاخر بـ {PACK_PRICE_DISPLAY} علشان تكتشف عطرك من غير ما تلتزم بقنينة كاملة.
                </p>

                <div className="flex flex-wrap items-center gap-8 text-[11px] tracking-wide font-body text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    ٥ عينات بـ ١٠ مل
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    تغليف فاخر مخملي
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    شحن متميز
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* How it works */}
          <section className="px-6 md:px-12 py-20 md:py-28 border-t border-border/20">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-5">
                <img src={vialImg} alt="عينة عطر ١٠ مل" className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="md:col-span-7">
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground font-body mb-4">
                  كيف تشتغل التجربة
                </p>
                <div className="luxury-divider mb-8 max-w-[120px] origin-right" />
                <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight mb-10">
                  ٣ خطوات بس <span className="italic">للاكتشاف</span>
                </h2>
                <div className="space-y-8">
                  {[
                    { n: "٠١", t: "اختار ٥ عطور", d: "تصفّح المجموعة كاملة واختار ٥ عطور تحبّ تجرّبهم — سواء عود فاخر، ورد طائفي، أو مسك نادر." },
                    { n: "٠٢", t: "صندوقك الخاص يوصلك", d: "كل عينة بـ ١٠ مل مخصصة للاستكشاف، في صندوق مخملي أنيق يستحمل ٤–٦ أسابيع من الاستخدام اليومي." },
                    { n: "٠٣", t: "اختار قنينتك الكاملة", d: "بعد ما تكتشف عطرك المثالي، اطلب القنينة الكاملة (٥٠ أو ١٠٠ مل) واستمتع بتجربتك بثقة." },
                  ].map((s, i) => (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-6 border-b border-border/15 pb-6 last:border-0"
                    >
                      <span className="font-display text-2xl text-accent/80 font-light">{s.n}</span>
                      <div>
                        <h3 className="font-display text-xl text-foreground mb-2">{s.t}</h3>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Selection Grid */}
          <section className="px-6 md:px-12 py-16 md:py-20 border-t border-border/20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground font-body mb-4">
                  اختر خمستك
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight">
                  اختار <span className="italic text-accent">{PACK_SIZE}</span> من مجموعتنا
                </h2>
              </div>
              <p className="text-sm text-muted-foreground font-body max-w-sm leading-relaxed">
                اضغط على أي عطر لإضافته للصندوق. متبقّي <span className="text-accent font-medium">{remaining}</span> من أصل {PACK_SIZE}.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-32">
              {products.map((product, i) => {
                const id = String(product.id);
                const isSel = selected.includes(id);
                const idx = selected.indexOf(id) + 1;
                return (
                  <motion.button
                    key={id}
                    type="button"
                    onClick={() => toggle(id)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative text-right transition-all duration-500 ${
                      !isSel && remaining === 0 ? "opacity-40" : ""
                    }`}
                  >
                    <div className={`relative aspect-[3/4] overflow-hidden mb-3 transition-all duration-500 ${
                      isSel ? "ring-2 ring-accent" : "ring-1 ring-border/20 hover:ring-accent/40"
                    }`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-[1.5s] ${
                          isSel ? "scale-105 brightness-110" : "group-hover:scale-105"
                        }`}
                      />
                      <div className={`absolute inset-0 transition-opacity duration-500 ${
                        isSel ? "bg-accent/10" : "bg-background/0 group-hover:bg-background/10"
                      }`} />
                      <div className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                        isSel
                          ? "bg-accent text-accent-foreground"
                          : "bg-background/60 text-foreground/40 group-hover:text-foreground"
                      }`}>
                        {isSel ? (
                          <span className="font-display text-sm font-medium">{idx}</span>
                        ) : (
                          <Plus size={14} strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                    <h3 className="font-display text-sm md:text-base font-normal text-foreground group-hover:text-accent transition-colors duration-300 mb-0.5">
                      {product.name}
                    </h3>
                    <p className="text-[9px] tracking-wide text-muted-foreground font-body">
                      {product.category}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Lifestyle interlude */}
          <section className="relative h-[60vh] overflow-hidden">
            <img src={lifestyleImg} alt="أجواء العود واللمسة الذهبية" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 flex items-end px-6 md:px-12 pb-16">
              <p className="font-display text-3xl md:text-5xl font-light text-foreground italic max-w-2xl leading-tight">
                "كل عطر هو بداية حكاية — ابدأ حكايتك بـ خمسة."
              </p>
            </div>
          </section>

          <Footer />

          {/* Sticky checkout dock */}
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-border/30"
              >
                <div className="px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2 rtl:space-x-reverse">
                      {selectedProducts.slice(0, 5).map((p) => (
                        <div key={p.id} className="w-10 h-10 ring-2 ring-background overflow-hidden">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {Array.from({ length: remaining }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-10 h-10 ring-2 ring-background bg-card/40 flex items-center justify-center">
                          <Plus size={12} className="text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[11px] tracking-wide font-body text-foreground">
                        {selected.length} / {PACK_SIZE} عينات
                      </p>
                      <p className="text-[10px] text-muted-foreground font-body">
                        {isComplete ? "صندوقك جاهز ✦" : `اختر ${remaining} عطور إضافية`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelected([])}
                      className="text-[10px] tracking-wide font-body text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    >
                      <Minus size={12} />
                      مسح الكل
                    </button>
                    <button
                      onClick={addPackToCart}
                      disabled={!isComplete}
                      className={`flex items-center gap-2.5 text-[11px] tracking-wide font-body px-6 py-3.5 transition-all duration-300 ${
                        isComplete
                          ? "bg-accent text-accent-foreground hover:bg-foreground hover:text-background"
                          : "bg-card/60 text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {isComplete ? <Check size={14} strokeWidth={1.5} /> : <ShoppingBag size={14} strokeWidth={1.5} />}
                      {isComplete ? `أضف الصندوق — ${PACK_PRICE_DISPLAY}` : `${PACK_PRICE_DISPLAY}`}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </SmoothScroll>
    </>
  );
};

export default Discovery;
