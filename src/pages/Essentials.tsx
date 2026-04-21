// صفحة /essentials — flow احترافي: اختر العبوة → اختر العطر → أضف للسلة
// العبوات هي packaging options (مش منتجات). كل عطور المتجر تتحط في أي عبوة.
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Shield,
  Truck,
  Gift,
  Sparkles,
  Plus,
  Minus,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import GoldenOrnament from "@/components/GoldenOrnament";
import WaveDivider from "@/components/WaveDivider";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useCart } from "@/contexts/CartContext";
import { useEssentials } from "@/contexts/EssentialsContext";
import {
  essentialsPackages,
  type EssentialsPackage,
  type PackageVariant,
} from "@/data/essentialsPackages";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/data/products";
import { resolveImage } from "@/data/products";
import { toast } from "sonner";
import essentialsBanner from "@/assets/essentials/essentials-banner.jpg";

const toArabicDigits = (n: number) =>
  String(n).padStart(2, "0").replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

// ============= Hero =============
const EssentialsHero = ({ onShop }: { onShop: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100vh] w-full overflow-hidden bg-background">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <img src={essentialsBanner} alt="مجموعة الأساسيات — شذايا" className="w-full h-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(40,20%,5%,0.55) 0%, hsla(40,20%,5%,0.35) 40%, hsla(40,20%,5%,0.96) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity, y: titleY }}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[11px] tracking-[0.4em] text-accent mb-6 font-accent"
        >
          ✦ ESSENTIALS · ٢٠٢٦ ✦
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="luxury-divider mx-auto mb-8"
        />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-foreground leading-[0.9] mb-8"
        >
          أسعار
          <br />
          <span className="text-gold-gradient italic">في المتناول</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-base md:text-lg text-muted-foreground/85 max-w-xl font-body leading-relaxed mb-10"
        >
          اختر عبوتك الاقتصادية، ثم اختر عطرك المفضل من تشكيلة شذايا الكاملة.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onShop}
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.2em] text-background bg-accent px-10 py-4 hover:bg-foreground transition-colors duration-500 font-accent"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ابدأ الاختيار</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============= Trust Strip =============
const TrustStrip = () => (
  <section className="relative py-14 px-6 md:px-12 border-y border-border/30 bg-secondary/10">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
      {[
        { icon: Truck, title: "شحن لكل مصر", desc: "خلال ٢-٤ أيام عمل" },
        { icon: Shield, title: "ضمان الأصالة", desc: "زيوت أصلية ١٠٠٪" },
        { icon: Gift, title: "تغليف فاخر", desc: "صندوق ذهبي بهوية شذايا" },
      ].map((t, i) => (
        <motion.div
          key={t.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.7 }}
          className="flex flex-col items-center gap-3"
        >
          <t.icon className="w-6 h-6 text-accent/80" strokeWidth={1.4} />
          <p className="font-display text-lg text-foreground">{t.title}</p>
          <p className="text-xs text-muted-foreground/70 font-body tracking-wide">{t.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// ============= Step 1: Package Card =============
const PackageCard = ({
  pkg,
  i,
  selectedVariantId,
  onSelectVariant,
  isSelected,
}: {
  pkg: EssentialsPackage;
  i: number;
  selectedVariantId: string | null;
  onSelectVariant: (variantId: string) => void;
  isSelected: boolean;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col bg-card border transition-all duration-500 ${
        isSelected ? "border-accent shadow-[0_20px_60px_-20px_hsla(38,60%,55%,0.4)]" : "border-border/40"
      }`}
    >
      {isSelected && (
        <div className="absolute -top-px -left-px -right-px h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      )}

      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-secondary/40 to-background">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05]"
        />
        <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
        <div className="absolute top-4 right-4 bg-foreground text-background px-3 py-1.5">
          <span className="text-[9px] tracking-[0.2em] font-accent">{pkg.tag}</span>
        </div>
      </div>

      <div className="p-6 md:p-7 text-right flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.3em] text-accent/70 font-accent mb-3">✦ {pkg.italic}</p>
        <h3 className="font-display text-2xl md:text-3xl text-foreground leading-[0.95] mb-3">
          {pkg.name.split(" ")[0]}{" "}
          <span className="text-gold-gradient italic">{pkg.name.split(" ").slice(1).join(" ")}</span>
        </h3>
        <p className="text-sm text-muted-foreground/80 leading-relaxed font-body mb-4">{pkg.desc}</p>

        <div className="flex flex-wrap gap-3 justify-end mb-5">
          {pkg.benefits.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 text-[10px] text-accent/80 font-accent">
              <Check className="w-3 h-3" />
              {b}
            </span>
          ))}
        </div>

        <div className="border-t border-border/40 pt-5 mt-auto">
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground/70 font-accent mb-3 text-right">
            اختر الحجم
          </p>
          <div className="flex flex-wrap gap-2 justify-end">
            {pkg.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => onSelectVariant(v.id)}
                className={`px-4 py-2.5 text-[11px] tracking-[0.15em] font-accent transition-all duration-300 ${
                  selectedVariantId === v.id
                    ? "bg-foreground text-background border border-foreground"
                    : "bg-transparent text-foreground/70 border border-border hover:border-accent hover:text-accent"
                }`}
              >
                {v.label} · {v.priceDisplay} ج.م
              </button>
            ))}
          </div>
          {pkg.type === "oil" && selectedVariantId && (
            <p className="text-[10px] text-accent/70 mt-3 text-right font-accent tracking-wide">
              ✦ الحد الأدنى: {pkg.variants.find((v) => v.id === selectedVariantId)?.minQty} قطع
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ============= Step 2: Perfume Picker =============
const PerfumePicker = ({
  pkg,
  variant,
  onConfirm,
  onCancel,
}: {
  pkg: EssentialsPackage;
  variant: PackageVariant;
  onConfirm: (product: Product, qty: number) => void;
  onCancel: () => void;
}) => {
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [qty, setQty] = useState(variant.minQty);

  useEffect(() => {
    setQty(variant.minQty);
  }, [variant.minQty]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q)
    );
  }, [products, search]);

  const totalPrice = variant.price * qty;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card border border-accent/30 p-6 md:p-10"
      style={{ boxShadow: "0 20px 60px -20px hsla(38,60%,55%,0.3)" }}
    >
      {/* Step header */}
      <div className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-border/40">
        <div className="text-right">
          <p className="text-[10px] tracking-[0.3em] text-accent font-accent mb-2">
            ✦ الخطوة ٢ من ٢
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
            اختر <span className="text-gold-gradient italic">العطر</span>
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            <span className="text-foreground">{pkg.name}</span> · {variant.label} · ×{qty} = {totalPrice.toLocaleString("ar-EG")} ج.م
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-[10px] tracking-[0.2em] text-muted-foreground/70 hover:text-accent transition-colors font-accent border border-border/50 px-4 py-2"
        >
          تغيير العبوة
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن عطر… (عود، مسك، ورد…)"
          className="w-full bg-transparent border border-border/50 px-12 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors text-right"
        />
      </div>

      {/* Perfume grid */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground font-body text-sm">جاري تحميل العطور…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground font-body text-sm">
          لم نجد عطر بهذا الاسم. جرّب كلمة أخرى.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-1 mb-6">
          {filtered.map((p) => {
            const img = p.images?.[0] ? resolveImage(p.images[0]) : "";
            const isActive = selected?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`group relative text-right border transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "border-accent shadow-[0_8px_24px_-8px_hsla(38,60%,55%,0.4)]"
                    : "border-border/40 hover:border-accent/60"
                }`}
              >
                <div className="aspect-square overflow-hidden bg-secondary/20">
                  {img && (
                    <img
                      src={img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-3">
                  <p className="font-display text-sm text-foreground leading-tight mb-1 truncate">{p.name}</p>
                  <p className="text-[9px] tracking-[0.18em] text-muted-foreground/70 font-accent">
                    {p.category}
                  </p>
                </div>
                {isActive && (
                  <div className="absolute top-2 left-2 w-6 h-6 bg-accent text-background rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Quantity + Confirm */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-border/40">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground font-accent">الكمية</span>
          <div className="flex items-center border border-border/60">
            <button
              onClick={() => setQty(Math.max(variant.minQty, qty - 1))}
              disabled={qty <= variant.minQty}
              className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-accent disabled:opacity-30 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-display text-lg text-foreground w-12 text-center tabular-nums">
              {toArabicDigits(qty)}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-accent transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          {variant.minQty > 1 && (
            <span className="text-[10px] text-accent/70 font-accent">
              الحد الأدنى: {variant.minQty}
            </span>
          )}
        </div>

        <button
          onClick={() => selected && onConfirm(selected, qty)}
          disabled={!selected}
          className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.2em] text-background bg-accent px-8 py-4 hover:bg-foreground transition-colors duration-500 font-accent disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>
            {selected ? `أضف للسلة · ${totalPrice.toLocaleString("ar-EG")} ج.م` : "اختر عطر أولاً"}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

// ============= Main Page =============
const EssentialsPage = () => {
  usePageSEO({
    title: "أسعار في المتناول — العبوات الاقتصادية",
    description:
      "اختر عبوتك الاقتصادية من شذايا (بلية، رشاش كلاسيكي، رشاش توقيع) ثم اختر العطر اللي يناسبك من تشكيلة شذايا الكاملة. تبدأ من ١٩٩ ج.م.",
  });

  const navigate = useNavigate();
  const { addItem } = useCart();
  const { setSelection } = useEssentials();
  const [selectedPkgId, setSelectedPkgId] = useState<EssentialsPackage["id"] | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [showPerfumePicker, setShowPerfumePicker] = useState(false);

  const selectedPkg = selectedPkgId ? essentialsPackages.find((p) => p.id === selectedPkgId) : null;
  const selectedVariant = selectedPkg && selectedVariantId
    ? selectedPkg.variants.find((v) => v.id === selectedVariantId) ?? null
    : null;

  const scrollToProducts = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectVariant = (pkgId: EssentialsPackage["id"], variantId: string) => {
    setSelectedPkgId(pkgId);
    setSelectedVariantId(variantId);
    setShowPerfumePicker(true);
    // Wait for AnimatePresence + DOM to mount the picker, then scroll
    setTimeout(() => {
      const el = document.getElementById("perfume-picker");
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 450);
  };

  const handleConfirmAdd = (product: Product, qty: number) => {
    if (!selectedPkg || !selectedVariant) return;

    // Build a synthetic cart product that combines perfume + package
    const cartProduct: Product = {
      ...product,
      // Override price with package price (since this is the economic flow)
      price: `${selectedVariant.priceDisplay} ج.م`,
      // Use package size as the size dimension
      sizes: [selectedVariant.label],
    };

    // Use color slot to encode package metadata for display in cart
    const packagingLabel = `${selectedPkg.name} (${selectedVariant.label})`;
    addItem(cartProduct, selectedVariant.label, packagingLabel, qty);

    toast.success("تمت الإضافة للسلة", {
      description: `${product.name} · ${packagingLabel} · ${(selectedVariant.price * qty).toLocaleString("ar-EG")} ج.م`,
    });

    // Persist selection so subsequent /product/* visits know the user is in essentials mode
    setSelection({ packageId: selectedPkg.id, variantId: selectedVariant.id });

    // Reset
    setShowPerfumePicker(false);
    setSelectedPkgId(null);
    setSelectedVariantId(null);
  };

  const handleCancelPicker = () => {
    setShowPerfumePicker(false);
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen">
          <Navbar />
          <EssentialsHero onShop={scrollToProducts} />

          {/* Story bar */}
          <section className="py-20 px-6 md:px-12 text-center bg-secondary/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl mx-auto"
            >
              <Sparkles className="w-5 h-5 text-accent mx-auto mb-5" strokeWidth={1.4} />
              <p className="text-[10px] tracking-[0.32em] text-accent/80 font-accent mb-4">
                ✦ كيف يعمل
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
                خطوتان فقط.{" "}
                <span className="text-gold-gradient italic">هكذا تعمل العبوات الاقتصادية.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-right">
                {[
                  { num: "١", title: "اختر عبوتك", desc: "بلية للزيت الخام أو رشاش بحجم وسعر يناسبك." },
                  { num: "٢", title: "اختر عطرك", desc: "أي عطر من تشكيلة شذايا الكاملة بنفس السعر الاقتصادي." },
                ].map((s) => (
                  <div key={s.num} className="flex items-start gap-4 border border-border/30 p-5 bg-card/40">
                    <span className="font-display text-4xl text-gold-gradient leading-none flex-shrink-0">{s.num}</span>
                    <div>
                      <p className="font-display text-lg text-foreground mb-1">{s.title}</p>
                      <p className="text-sm text-muted-foreground/80 font-body leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <TrustStrip />

          {/* Step 1 — Packages */}
          <section id="packages" className="relative py-24 md:py-32 px-6 md:px-12">
            <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16 md:mb-20"
              >
                <p className="text-[10px] tracking-[0.32em] text-accent font-accent mb-5">
                  ✦ الخطوة ١ من ٢
                </p>
                <div className="luxury-divider mx-auto mb-6" />
                <h2 className="font-display text-4xl md:text-6xl font-light text-foreground leading-[1] mb-5">
                  اختر <span className="text-gold-gradient italic">عبوتك</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto font-body leading-relaxed">
                  ثلاث عبوات اقتصادية. اختر النوع والحجم اللي يناسبك.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {essentialsPackages.map((pkg, i) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    i={i}
                    selectedVariantId={selectedPkgId === pkg.id ? selectedVariantId : null}
                    onSelectVariant={(variantId) => handleSelectVariant(pkg.id, variantId)}
                    isSelected={selectedPkgId === pkg.id}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Step 2 — Perfume Picker */}
          <AnimatePresence>
            {showPerfumePicker && selectedPkg && selectedVariant && (
              <section id="perfume-picker" className="px-6 md:px-12 pb-24">
                <div className="max-w-5xl mx-auto">
                  <PerfumePicker
                    pkg={selectedPkg}
                    variant={selectedVariant}
                    onConfirm={handleConfirmAdd}
                    onCancel={handleCancelPicker}
                  />
                </div>
              </section>
            )}
          </AnimatePresence>

          <WaveDivider variant="gold" />

          {/* Closing CTA */}
          <section className="py-24 md:py-32 px-6 md:px-12 text-center bg-gradient-to-b from-background to-secondary/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-2xl mx-auto"
            >
              <GoldenOrnament size="md" />
              <h3 className="font-display text-3xl md:text-5xl text-foreground leading-tight mt-8 mb-5">
                تحب تشوف العبوات الفاخرة؟
              </h3>
              <p className="text-base text-muted-foreground/80 leading-relaxed font-body mb-10">
                اكتشف تشكيلة شذايا الكاملة بعبواتها الفاخرة الأصلية.
              </p>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-4 text-[11px] tracking-[0.2em] text-background bg-foreground px-10 py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-500 font-accent"
              >
                <span>تصفّح كل المنتجات</span>
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default EssentialsPage;
