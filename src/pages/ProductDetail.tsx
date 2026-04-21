import { useState, useEffect } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, Share2, Ruler, Truck, RotateCcw, ChevronDown, Gift, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { getRelatedProducts } from "@/data/products";
import { bottleTypes } from "@/data/bottleTypes";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useEssentials } from "@/contexts/EssentialsContext";
import { useJsonLd } from "@/hooks/useJsonLd";
import { resolveImage } from "@/data/products";
import ProductReviewsLive from "@/components/ProductReviewsLive";
import SizeGuideModal from "@/components/SizeGuideModal";

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { isWishlisted: checkWishlisted, toggleWishlist } = useWishlist();
  const { selected: essentialsSelected, clearSelection } = useEssentials();
  const { data: product } = useProduct(slug);
  const relatedProducts = getRelatedProducts(slug || "");
  const isEssentialsMode = !!essentialsSelected;
  const productImage = product?.images?.[0] ? resolveImage(product.images[0]) : undefined;
  usePageSEO({
    title: product?.name || "المنتج",
    description: product?.shortDescription || "عطر فاخر من شذايا — تسوق الآن.",
    ogImage: productImage,
  });
  useJsonLd(
    product
      ? {
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          description: product.shortDescription,
          sku: product.slug,
          category: product.category,
          brand: { "@type": "Brand", name: "شذايا" },
          image: product.images?.map(resolveImage) || [],
          offers: {
            "@type": "Offer",
            url: `https://shathaya.com/product/${product.slug}`,
            priceCurrency: "EGP",
            price: typeof product.price === "number" ? product.price : undefined,
            availability: "https://schema.org/InStock",
          },
        }
      : null
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedBottle, setSelectedBottle] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [addedToBag, setAddedToBag] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const isWishlisted = product ? checkWishlisted(product.id) : false;

  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(null);
    setSelectedBottle(0);
    setQuantity(1);
    setOpenAccordion(0);
    setAddedToBag(false);
  }, [slug]);

  // Reset selected size whenever bottle changes (sizes differ per bottle)
  useEffect(() => {
    setSelectedSize(null);
  }, [selectedBottle]);

  // Sizes available for the currently selected bottle, intersected with product's own sizes
  const availableSizes = (() => {
    const bottleSizes = bottleTypes[selectedBottle]?.sizes || [];
    if (!product) return bottleSizes;
    const productSizes = product.sizes || [];
    const intersection = bottleSizes.filter((s) => productSizes.includes(s));
    return intersection.length > 0 ? intersection : bottleSizes;
  })();

  if (!product) {
    return (
      <>
        <CustomCursor />
        <FilmGrain />
        <SmoothScroll>
          <main className="bg-background min-h-screen md:cursor-none">
            <Navbar />
            <div className="pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center min-h-[60vh]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">المنتج غير موجود</p>
                <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6">
                  هذا العطر غير <span className="italic">متوفر</span>
                </h1>
                <p className="text-sm text-muted-foreground font-body mb-10 max-w-md mx-auto">
                  المنتج الذي تبحث عنه ربما تم حذفه أو لم يعد متوفراً.
                </p>
                <Link
                  to="/shop"
                  className="text-[10px] tracking-wide font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300 inline-block"
                >
                  العودة للمتجر
                </Link>
              </motion.div>
            </div>
            <Footer />
          </main>
        </SmoothScroll>
      </>
    );
  }

  const handleAddToBag = () => {
    if (!product) return;

    // === Essentials mode ===
    if (isEssentialsMode && essentialsSelected) {
      const { pkg, variant } = essentialsSelected;
      const cartProduct = {
        ...product,
        price: `${variant.priceDisplay} ج.م`,
        sizes: [variant.label],
      };
      const packagingLabel = `${pkg.name} (${variant.label})`;
      const minQty = variant.minQty;
      const finalQty = Math.max(quantity, minQty);
      addItem(cartProduct, variant.label, packagingLabel, finalQty);
      setAddedToBag(true);
      setTimeout(() => setAddedToBag(false), 2000);
      return;
    }

    // === Standard luxury bottle mode ===
    if (!selectedSize) return;
    addItem(product, selectedSize, bottleTypes[selectedBottle]?.name || "", quantity);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const titleParts = product.name.split(product.nameItalic);
  const titlePrefix = titleParts[0]?.trim() || "";

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />

          {/* === Essentials Mode Banner === */}
          {isEssentialsMode && essentialsSelected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-20 z-40 bg-gradient-to-r from-accent/95 via-accent to-accent/95 text-background"
              style={{ boxShadow: "0 4px 24px -8px hsla(38,60%,55%,0.5)" }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Gift className="w-4 h-4" strokeWidth={1.6} />
                  <p className="text-[11px] md:text-xs tracking-[0.12em] font-accent">
                    أنت في وضع <span className="font-bold">العبوة الاقتصادية</span> ·
                    {" "}{essentialsSelected.pkg.name} ({essentialsSelected.variant.label}) · {essentialsSelected.variant.priceDisplay} ج.م
                  </p>
                </div>
                <button
                  onClick={clearSelection}
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] bg-background/20 hover:bg-background/30 px-3 py-1.5 transition-colors font-accent"
                >
                  <X className="w-3 h-3" />
                  <span>إلغاء الوضع الاقتصادي</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Breadcrumb */}
          <div className="pt-24 md:pt-28 px-6 md:px-12">
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground"
            >
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-foreground transition-colors">المتجر</Link>
              <span>/</span>
              <Link to={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </motion.nav>
          </div>

          {/* Main product section */}
          <section className="px-6 md:px-12 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              {/* Left — Image gallery */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-12 gap-3">
                  {/* Thumbnails */}
                  <div className="col-span-2 hidden md:flex flex-col gap-3">
                    {product.images.map((img, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                        onClick={() => setSelectedImage(i)}
                        className={`relative aspect-[3/4] overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === i ? "border-accent" : "border-transparent hover:border-foreground/20"
                        }`}
                      >
                        <img src={img} alt={`${product.name} صورة ${i + 1}`} className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </div>

                  {/* Main image */}
                  <div className="col-span-12 md:col-span-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative aspect-[3/4] overflow-hidden group"
                      >
                        <img
                          src={product.images[selectedImage]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 text-[9px] tracking-wide text-foreground/30 font-body bg-background/30 backdrop-blur-md px-3 py-1.5 hidden md:block">
                          مرّر الماوس للتكبير
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            selectedImage === i ? "bg-accent w-6" : "bg-foreground/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Product info */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={`text-[9px] tracking-wide font-body px-3 py-1 inline-block mb-4 ${
                    product.tag === "الأكثر مبيعاً" ? "text-accent bg-accent/10" :
                    product.tag === "محدود" ? "text-destructive bg-destructive/10" :
                    "text-accent bg-accent/10"
                  }`}>
                    {product.tag} — {product.season}
                  </span>

                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-2">
                    {titlePrefix && <>{titlePrefix} </>}<span className="italic">{product.nameItalic}</span>
                  </h1>

                  <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-6">
                    {product.category} — {product.material}
                  </p>

                  {/* Price — overridden in essentials mode */}
                  <div className="flex items-baseline gap-3 mb-8">
                    {isEssentialsMode && essentialsSelected ? (
                      <>
                        <span className="font-display text-2xl md:text-3xl text-accent">{essentialsSelected.variant.priceDisplay} ج.م</span>
                        <span className="text-sm text-muted-foreground line-through font-body">{product.price}</span>
                        <span className="text-[10px] tracking-wide text-accent/80 font-accent">سعر العبوة الاقتصادية</span>
                      </>
                    ) : (
                      <>
                        <span className="font-display text-2xl md:text-3xl text-foreground">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through font-body">{product.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed font-body mb-8 max-w-md">
                    {product.shortDescription}
                  </p>

                  {/* Bottle type selector — hidden in essentials mode */}
                  {!isEssentialsMode && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-wide text-foreground font-body">
                        نوع العبوة — <span className="text-muted-foreground">{bottleTypes[selectedBottle]?.name}</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {bottleTypes.map((bottle, i) => (
                        <button
                          key={bottle.id}
                          onClick={() => setSelectedBottle(i)}
                          title={bottle.name}
                          className={`relative aspect-[3/4] overflow-hidden border-2 transition-all duration-300 bg-secondary/20 ${
                            selectedBottle === i
                              ? "border-accent scale-[1.03]"
                              : "border-border/30 hover:border-foreground/40"
                          }`}
                        >
                          <img
                            src={bottle.image}
                            alt={bottle.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  )}

                  {/* Size selector — fixed to package size in essentials mode */}
                  {isEssentialsMode && essentialsSelected ? (
                    <div className="mb-6">
                      <span className="text-[10px] tracking-wide text-foreground font-body block mb-3">
                        الحجم — <span className="text-accent">{essentialsSelected.variant.label}</span>
                      </span>
                      <div className="border border-accent bg-accent/10 px-4 py-3 text-sm font-body text-foreground text-center">
                        {essentialsSelected.pkg.name} · {essentialsSelected.variant.label}
                      </div>
                    </div>
                  ) : (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-wide text-foreground font-body">
                        الحجم {selectedSize && <span className="text-muted-foreground">— {selectedSize}</span>}
                      </span>
                      <button onClick={() => setShowSizeGuide(true)} className="text-[10px] tracking-wide text-accent font-body flex items-center gap-1 hover:underline">
                        <Ruler size={12} />
                        دليل الأحجام
                      </button>
                    </div>
                    <div className={`grid gap-2 ${availableSizes.length <= 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 text-xs font-body tracking-wide border transition-all duration-300 ${
                            selectedSize === size
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border/40 text-foreground/60 hover:border-foreground/60 hover:text-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {!selectedSize && (
                      <p className="text-[10px] text-accent/70 font-body mt-2">الرجاء اختيار الحجم</p>
                    )}
                  </div>
                  )}

                  {/* Quantity */}
                  <div className="mb-8">
                    <span className="text-[10px] tracking-wide text-foreground font-body mb-3 block">الكمية</span>
                    <div className="flex items-center gap-0 border border-border/40 w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors border-l border-border/40"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="w-14 h-11 flex items-center justify-center text-sm font-body text-foreground">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors border-r border-border/40"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Add to bag + Wishlist */}
                  <div className="flex items-center gap-3 mb-6">
                    <motion.button
                      onClick={handleAddToBag}
                      whileTap={{ scale: 0.97 }}
                      className={`flex-1 py-4 text-[11px] tracking-wide font-body flex items-center justify-center gap-3 transition-all duration-500 ${
                        addedToBag
                          ? "bg-accent text-accent-foreground"
                          : selectedSize
                          ? "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
                          : "bg-foreground/30 text-foreground/40 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      {addedToBag ? "تمت الإضافة ✓" : "أضف للحقيبة"}
                    </motion.button>
                    <button
                      onClick={() => product && toggleWishlist(product)}
                      className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                        isWishlisted ? "border-accent bg-accent/10 text-accent" : "border-border/40 text-foreground/40 hover:border-foreground/60"
                      }`}
                    >
                      <Heart size={18} strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: product.name, text: product.shortDescription, url: window.location.href });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          // Simple feedback
                          const btn = document.activeElement as HTMLElement;
                          btn?.setAttribute("data-copied", "true");
                          setTimeout(() => btn?.removeAttribute("data-copied"), 1500);
                        }
                      }}
                      className="w-14 h-14 border border-border/40 flex items-center justify-center text-foreground/40 hover:border-foreground/60 hover:text-foreground transition-all duration-300"
                      title="مشاركة"
                    >
                      <Share2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center gap-6 py-5 border-y border-border/20 mb-8">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck size={14} strokeWidth={1.5} className="text-accent" />
                      <span className="text-[9px] tracking-wide font-body">شحن متميز</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <RotateCcw size={14} strokeWidth={1.5} className="text-accent" />
                      <span className="text-[9px] tracking-wide font-body">إرجاع خلال ٣٠ يوم</span>
                    </div>
                  </div>

                  {/* Accordion */}
                  <div className="space-y-0">
                    {product.accordion.map((item, i) => (
                      <div key={i} className="border-b border-border/20">
                        <button
                          onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                          className="w-full flex items-center justify-between py-4 group"
                        >
                          <span className="text-[11px] tracking-wide text-foreground font-body group-hover:text-accent transition-colors duration-300">
                            {item.title}
                          </span>
                          <motion.div
                            animate={{ rotate: openAccordion === i ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={14} strokeWidth={1.5} className="text-foreground/40" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {openAccordion === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-muted-foreground leading-relaxed font-body pb-5 pl-8">
                                {item.content}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Customer Reviews */}
          {typeof product.id === "string" && <ProductReviewsLive productId={product.id} />}

          {/* You May Also Like */}
          <section className="px-6 md:px-12 py-16 md:py-24 border-t border-border/20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">أكمل مجموعتك</p>
              <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
                قد يعجبك <span className="italic">أيضاً</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/product/${item.slug}`} className="group cursor-pointer block">
                    <div className="relative overflow-hidden aspect-[3/4] mb-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <span className="w-full text-[9px] tracking-wide text-background bg-foreground py-2 font-body flex items-center justify-center gap-2">
                          <ShoppingBag size={10} strokeWidth={1.5} />
                          إضافة سريعة
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display text-sm text-foreground group-hover:text-accent transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-foreground/60 font-body">{item.price}</span>
                      <span className="text-[9px] text-muted-foreground font-body">— {item.category}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </>
  );
};

export default ProductDetail;
