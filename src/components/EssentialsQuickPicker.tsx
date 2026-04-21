// EssentialsQuickPicker — modal/drawer سريع لاختيار العبوة الاقتصادية + العطر
// بيتفتح من شنطة الهدية أو من أي مكان عبر useEssentials().openPicker()
// 3 خطوات: اختر عبوة → اختر حجم → اختر عطر → أضف للسلة
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { X, Check, Search, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useEssentials } from "@/contexts/EssentialsContext";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";
import {
  essentialsPackages,
  type EssentialsPackage,
  type PackageVariant,
} from "@/data/essentialsPackages";
import type { Product } from "@/data/products";
import { resolveImage } from "@/data/products";
import { toast } from "sonner";

const toArabic = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

type Step = 1 | 2 | 3;

const EssentialsQuickPicker = () => {
  const { isPickerOpen, closePicker, setSelection } = useEssentials();
  const { addItem } = useCart();
  const { data: products = [], isLoading } = useProducts();

  const [step, setStep] = useState<Step>(1);
  const [pkg, setPkg] = useState<EssentialsPackage | null>(null);
  const [variant, setVariant] = useState<PackageVariant | null>(null);
  const [perfume, setPerfume] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [search, setSearch] = useState("");

  // Reset on open/close
  useEffect(() => {
    if (isPickerOpen) {
      setStep(1);
      setPkg(null);
      setVariant(null);
      setPerfume(null);
      setQty(1);
      setSearch("");
    }
  }, [isPickerOpen]);

  // Auto-advance step when selection completes
  const handlePickPackage = (p: EssentialsPackage) => {
    setPkg(p);
    setVariant(null);
    setStep(2);
  };

  const handlePickVariant = (v: PackageVariant) => {
    setVariant(v);
    setQty(v.minQty);
    setStep(3);
  };

  const filteredPerfumes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q)
    );
  }, [products, search]);

  const totalPrice = variant && perfume ? variant.price * qty : 0;

  const handleConfirm = () => {
    if (!pkg || !variant || !perfume) return;

    const cartProduct: Product = {
      ...perfume,
      price: `${variant.priceDisplay} ج.م`,
      sizes: [variant.label],
    };
    const packagingLabel = `${pkg.name} (${variant.label})`;
    addItem(cartProduct, variant.label, packagingLabel, qty);

    setSelection({ packageId: pkg.id, variantId: variant.id });

    toast.success("تمت الإضافة للسلة", {
      description: `${perfume.name} · ${packagingLabel}`,
    });

    // addItem auto-opens CartDrawer; just close picker
    closePicker();
  };

  return (
    <AnimatePresence>
      {isPickerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closePicker}
            className="fixed inset-0 z-[110] bg-background/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 bottom-0 z-[120] w-full sm:max-w-xl bg-card border-r border-accent/20 flex flex-col"
            style={{ boxShadow: "0 0 80px hsla(38,60%,55%,0.2)" }}
            role="dialog"
            aria-modal="true"
            aria-label="اختر عبوتك الاقتصادية"
          >
            {/* Header */}
            <div className="relative px-6 md:px-8 py-5 border-b border-border/30 flex items-center justify-between gap-4 flex-shrink-0">
              <div className="text-right">
                <p className="text-[9px] tracking-[0.32em] text-accent/80 font-accent mb-1">
                  ✦ ESSENTIALS · هدية شذايا
                </p>
                <h2 className="font-display text-xl text-foreground">
                  أسعار <span className="text-gold-gradient italic">في المتناول</span>
                </h2>
              </div>
              <button
                onClick={closePicker}
                className="w-9 h-9 flex items-center justify-center text-foreground/40 hover:text-accent transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Stepper */}
            <div className="px-6 md:px-8 py-4 border-b border-border/20 flex items-center justify-center gap-3 flex-shrink-0">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      // allow going back, not forward
                      if (s < step) setStep(s as Step);
                    }}
                    disabled={s > step}
                    className={`relative w-7 h-7 flex items-center justify-center text-[10px] font-accent border transition-all duration-300 ${
                      s === step
                        ? "border-accent bg-accent text-background"
                        : s < step
                        ? "border-accent/60 text-accent hover:bg-accent/10 cursor-pointer"
                        : "border-border/40 text-muted-foreground/50"
                    }`}
                  >
                    {s < step ? <Check className="w-3 h-3" strokeWidth={2} /> : toArabic(s)}
                  </button>
                  {s < 3 && (
                    <span className={`w-8 h-px transition-colors ${s < step ? "bg-accent/60" : "bg-border/40"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              {/* === Step 1: Pick Package === */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="text-right mb-5">
                    <p className="text-[10px] tracking-[0.28em] text-accent/80 font-accent mb-2">
                      الخطوة ١
                    </p>
                    <h3 className="font-display text-2xl text-foreground">اختر <span className="italic text-gold-gradient">عبوتك</span></h3>
                  </div>
                  <div className="space-y-3">
                    {essentialsPackages.map((p, i) => (
                      <motion.button
                        key={p.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        onClick={() => handlePickPackage(p)}
                        className="group w-full flex items-stretch gap-4 border border-border/40 hover:border-accent transition-all duration-400 text-right bg-background/40 hover:bg-background/80"
                      >
                        <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex-shrink-0 overflow-hidden bg-secondary/30">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                          />
                          <div className="absolute top-2 right-2 bg-foreground text-background px-1.5 py-0.5 text-[8px] tracking-[0.2em] font-accent">
                            {p.tag}
                          </div>
                        </div>
                        <div className="flex-1 py-3 pr-4 pl-3 flex flex-col justify-between">
                          <div>
                            <p className="text-[9px] tracking-[0.28em] text-accent/70 font-accent mb-1">
                              {p.italic}
                            </p>
                            <h4 className="font-display text-lg text-foreground leading-tight mb-1">
                              {p.name}
                            </h4>
                            <p className="text-[11px] text-muted-foreground/75 font-body line-clamp-2 leading-relaxed">
                              {p.desc}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-border/30">
                            <span className="text-[9px] tracking-[0.2em] text-accent font-accent inline-flex items-center gap-1.5 group-hover:translate-x-[-3px] transition-transform">
                              اختر
                              <ArrowLeft className="w-2.5 h-2.5" />
                            </span>
                            <span className="text-[10px] text-muted-foreground/70 font-accent">
                              من {p.variants[0].priceDisplay} ج.م
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* === Step 2: Pick Variant === */}
              {step === 2 && pkg && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="text-right mb-5">
                    <p className="text-[10px] tracking-[0.28em] text-accent/80 font-accent mb-2">
                      الخطوة ٢
                    </p>
                    <h3 className="font-display text-2xl text-foreground">
                      اختر <span className="italic text-gold-gradient">الحجم</span>
                    </h3>
                    <p className="text-xs text-muted-foreground font-body mt-2">
                      {pkg.name} · {pkg.italic}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {pkg.variants.map((v, i) => (
                      <motion.button
                        key={v.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handlePickVariant(v)}
                        className="flex items-center justify-between gap-4 border border-border/40 hover:border-accent transition-all duration-300 px-5 py-4 text-right group bg-background/40"
                      >
                        <span className="text-[9px] tracking-[0.2em] text-accent font-accent inline-flex items-center gap-1.5">
                          اختر
                          <ArrowLeft className="w-2.5 h-2.5 group-hover:-translate-x-1 transition-transform" />
                        </span>
                        <div className="flex-1 text-right">
                          <p className="font-display text-lg text-foreground">{v.label}</p>
                          {v.minQty > 1 && (
                            <p className="text-[10px] text-accent/70 font-accent mt-0.5">
                              الحد الأدنى: {toArabic(v.minQty)} قطع
                            </p>
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-display text-xl text-accent">{v.priceDisplay}</p>
                          <p className="text-[9px] tracking-[0.2em] text-muted-foreground/70 font-accent">
                            ج.م / للقطعة
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors font-accent"
                  >
                    <ArrowRight className="w-3 h-3" />
                    تغيير العبوة
                  </button>
                </motion.div>
              )}

              {/* === Step 3: Pick Perfume === */}
              {step === 3 && pkg && variant && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-right mb-5">
                    <p className="text-[10px] tracking-[0.28em] text-accent/80 font-accent mb-2">
                      الخطوة ٣
                    </p>
                    <h3 className="font-display text-2xl text-foreground">
                      اختر <span className="italic text-gold-gradient">عطرك</span>
                    </h3>
                    <p className="text-xs text-muted-foreground font-body mt-2">
                      {pkg.name} · {variant.label} · {variant.priceDisplay} ج.م
                    </p>
                  </div>

                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="ابحث عن عطر…"
                      className="w-full bg-transparent border border-border/50 px-10 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors text-right"
                    />
                  </div>

                  {/* Perfume grid */}
                  {isLoading ? (
                    <div className="text-center py-10 text-muted-foreground font-body text-sm">
                      <Sparkles className="w-5 h-5 mx-auto mb-3 text-accent/60 animate-pulse" />
                      جاري تحميل العطور…
                    </div>
                  ) : filteredPerfumes.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground font-body text-sm">
                      لم نجد عطر بهذا الاسم.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                      {filteredPerfumes.map((p) => {
                        const img = p.images?.[0] ? resolveImage(p.images[0]) : "";
                        const active = perfume?.id === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPerfume(p)}
                            className={`relative text-right border transition-all duration-300 overflow-hidden group ${
                              active
                                ? "border-accent shadow-[0_6px_20px_-6px_hsla(38,60%,55%,0.4)]"
                                : "border-border/40 hover:border-accent/60"
                            }`}
                          >
                            <div className="aspect-square overflow-hidden bg-secondary/20">
                              {img && (
                                <img
                                  src={img}
                                  alt={p.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                            </div>
                            <div className="p-2">
                              <p className="font-display text-xs text-foreground leading-tight truncate">
                                {p.name}
                              </p>
                              <p className="text-[8px] tracking-[0.18em] text-muted-foreground/70 font-accent mt-0.5 truncate">
                                {p.category}
                              </p>
                            </div>
                            {active && (
                              <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-accent text-background rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3" strokeWidth={2.5} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors font-accent"
                  >
                    <ArrowRight className="w-3 h-3" />
                    تغيير الحجم
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer — quantity + confirm (only on step 3) */}
            {step === 3 && pkg && variant && (
              <div className="border-t border-border/30 bg-background/60 px-6 md:px-8 py-5 flex-shrink-0">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center border border-border/60">
                    <button
                      onClick={() => setQty(Math.max(variant.minQty, qty - 1))}
                      disabled={qty <= variant.minQty}
                      className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-accent disabled:opacity-30 transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-display text-base text-foreground w-10 text-center tabular-nums">
                      {toArabic(qty)}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-accent transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] tracking-[0.2em] text-muted-foreground/70 font-accent mb-0.5">
                      المجموع
                    </p>
                    <p className="font-display text-xl text-accent">
                      {(variant.price * qty).toLocaleString("ar-EG")} ج.م
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={!perfume}
                  className="w-full inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.22em] text-background bg-accent px-6 py-4 hover:bg-foreground transition-colors duration-400 font-accent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{perfume ? "أضف للسلة" : "اختر عطر أولاً"}</span>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default EssentialsQuickPicker;
