import { useState, useRef } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, SlidersHorizontal, ChevronDown, Grid3X3, LayoutGrid, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { allProducts as fallbackProducts, categories, sortOptions, type Product } from "@/data/products";
import { bottleShapes, type BottleShapeId } from "@/data/brandedImages";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const ProductCard = ({ product, index, gridCols }: { product: Product; index: number; gridCols: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCart();
  const { isWishlisted: checkWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = checkWishlisted(product.id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % gridCols) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <span className={`text-[8px] tracking-wide px-2.5 py-1 font-body ${
              product.tag === "الأكثر مبيعاً" ? "bg-accent text-accent-foreground" :
              product.tag === "محدود" ? "bg-destructive text-destructive-foreground" :
              "bg-background/60 backdrop-blur-md text-foreground/70"
            }`}>
              {product.tag}
            </span>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`absolute top-3 left-3 w-8 h-8 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
              wishlisted ? "bg-accent/20 text-accent opacity-100" : "bg-background/40 text-foreground/70 opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart size={13} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
             <div className="flex items-center gap-1.5 mb-2.5">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                  className={`w-auto px-2 h-7 border flex items-center justify-center text-[8px] tracking-wide font-body backdrop-blur-md transition-all duration-200 cursor-pointer ${
                    selectedSize === size
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/20 text-foreground/60 bg-background/60 hover:bg-foreground hover:text-background"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                const size = selectedSize || product.sizes[0];
                addItem(product, size, product.colors[0]?.name || "افتراضي");
              }}
              className="w-full text-[9px] tracking-wide text-background bg-foreground py-2.5 font-body hover:bg-accent hover:text-accent-foreground transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={11} strokeWidth={1.5} />
              {selectedSize ? `أضف ${selectedSize} للحقيبة` : "أضف للحقيبة"}
            </button>
          </div>
        </div>
      </Link>
      <Link to={`/product/${product.slug}`} className="block">
        <h3 className="font-display text-sm md:text-base font-normal text-foreground group-hover:text-accent transition-colors duration-300 mb-0.5">
          {product.name}
        </h3>
        <p className="text-[9px] tracking-wide text-muted-foreground font-body mb-1.5">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/70 font-body">{product.price}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through font-body">{product.originalPrice}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const Shop = () => {
  usePageSEO({ title: "المتجر", description: "تصفح مجموعة شذايا الكاملة من العطور الفاخرة — عود، مسك، ورد طائفي، وبخور. اختر عطرك المثالي." });
  const { data: products = fallbackProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [sortBy, setSortBy] = useState("الأحدث");
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedShapes, setSelectedShapes] = useState<BottleShapeId[]>([]);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  };

  const toggleShape = (id: BottleShapeId) => {
    setSelectedShapes((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const getPriceNum = (price: string) => parseFloat(price.replace(/[^\d.]/g, ""));

  let filteredProducts = activeCategory === "الكل"
    ? products
    : products.filter((p) => p.category === activeCategory);

  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
  }

  if (selectedPriceRange) {
    filteredProducts = filteredProducts.filter((p) => {
      const price = getPriceNum(p.price);
      if (selectedPriceRange === "أقل من ٢,٠٠٠ ج.م") return price < 2000;
      if (selectedPriceRange === "٢,٠٠٠ – ٣,٥٠٠ ج.م") return price >= 2000 && price <= 3500;
      if (selectedPriceRange === "٣,٥٠٠ – ٥,٠٠٠ ج.م") return price >= 3500 && price <= 5000;
      if (selectedPriceRange === "أكثر من ٥,٠٠٠ ج.م") return price > 5000;
      return true;
    });
  }

  if (selectedShapes.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      (p.availableBottles || []).some((b) => selectedShapes.includes(b))
      || (p.defaultBottle && selectedShapes.includes(p.defaultBottle))
    );
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "السعر: الأقل للأعلى") return getPriceNum(a.price) - getPriceNum(b.price);
    if (sortBy === "السعر: الأعلى للأقل") return getPriceNum(b.price) - getPriceNum(a.price);
    if (sortBy === "الأكثر مبيعاً") return a.tag === "الأكثر مبيعاً" ? -1 : 1;
    return 0;
  });

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />

          {/* Hero banner */}
          <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-12">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <nav className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-8">
                <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
                <span>/</span>
                <span className="text-foreground">المتجر</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">
                    مجموعة العطور
                  </p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isHeaderInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                    className="luxury-divider mb-5 origin-right"
                  />
                  <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
                    تسوّق <span className="italic">الآن</span>
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground font-body mt-6 md:mt-0 max-w-sm leading-relaxed">
                  اكتشف مجموعتنا الكاملة من العطور المصنوعة بعناية فائقة — من العود الفاخر إلى المسك النادر.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Filter / Sort bar */}
          <section className="px-6 md:px-12 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-y border-border/20 py-4"
            >
              <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] tracking-wide font-body whitespace-nowrap transition-all duration-300 pb-1 border-b ${
                      activeCategory === cat
                        ? "text-foreground border-accent"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {cat}
                    <span className="mr-1.5 text-muted-foreground">
                      ({cat === "الكل" ? products.length : products.filter(p => p.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-5">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SlidersHorizontal size={13} strokeWidth={1.5} />
                  فلترة
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowSort(!showSort)}
                    className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ترتيب: {sortBy}
                    <ChevronDown size={12} strokeWidth={1.5} className={`transition-transform duration-300 ${showSort ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showSort && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-8 bg-card border border-border/30 backdrop-blur-2xl z-20 min-w-[180px]"
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setSortBy(opt); setShowSort(false); }}
                            className={`block w-full text-right px-4 py-2.5 text-[10px] tracking-wide font-body transition-colors ${
                              sortBy === opt ? "text-accent bg-accent/5" : "text-foreground/60 hover:text-foreground hover:bg-muted/30"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden md:flex items-center gap-1 border-r border-border/20 pr-5">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 transition-colors ${gridCols === 3 ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="٣ أعمدة"
                  >
                    <LayoutGrid size={15} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 transition-colors ${gridCols === 4 ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="٤ أعمدة"
                  >
                    <Grid3X3 size={15} strokeWidth={1.5} />
                  </button>
                </div>

                <span className="text-[10px] tracking-wide text-muted-foreground font-body hidden md:block">
                  {sortedProducts.length} عطر
                </span>
              </div>
            </motion.div>

            {/* Expandable filter panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-border/20">
                    {/* Size filter */}
                    <div>
                      <p className="text-[10px] tracking-wide text-foreground font-body mb-4">الحجم</p>
                      <div className="flex flex-wrap gap-2">
                        {["٣٠ مل", "٥٠ مل", "١٠٠ مل", "٣ مل", "٦ مل", "١٢ مل"].map((s) => (
                          <button key={s} onClick={() => toggleSize(s)} className={`px-2 h-8 border text-[9px] tracking-wide font-body transition-all duration-200 ${selectedSizes.includes(s) ? "border-accent text-accent bg-accent/10" : "border-border/30 text-muted-foreground hover:border-accent hover:text-accent"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Bottle shape filter — visual */}
                    <div>
                      <p className="text-[10px] tracking-wide text-foreground font-body mb-4">شكل الزجاجة</p>
                      <div className="grid grid-cols-3 gap-2">
                        {bottleShapes.map((shape) => {
                          const active = selectedShapes.includes(shape.id);
                          return (
                            <button
                              key={shape.id}
                              onClick={() => toggleShape(shape.id)}
                              title={shape.name}
                              className={`relative aspect-[3/4] overflow-hidden border transition-all duration-300 ${
                                active ? "border-accent ring-1 ring-accent/40" : "border-border/30 hover:border-foreground/40 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img src={shape.image} alt={shape.name} className="w-full h-full object-cover" />
                              <span className="absolute bottom-0 inset-x-0 bg-background/85 backdrop-blur-sm text-[8px] font-body text-foreground py-1 text-center">
                                {shape.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* Price range */}
                    <div>
                      <p className="text-[10px] tracking-wide text-foreground font-body mb-4">السعر</p>
                      <div className="flex flex-col gap-2">
                        {["أقل من ٢,٠٠٠ ج.م", "٢,٠٠٠ – ٣,٥٠٠ ج.م", "٣,٥٠٠ – ٥,٠٠٠ ج.م", "أكثر من ٥,٠٠٠ ج.م"].map((r) => (
                          <button key={r} onClick={() => setSelectedPriceRange(selectedPriceRange === r ? null : r)} className={`text-[10px] font-body text-right transition-colors duration-200 ${selectedPriceRange === r ? "text-accent" : "text-muted-foreground hover:text-accent"}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Type */}
                    <div>
                      <p className="text-[10px] tracking-wide text-foreground font-body mb-4">النوع</p>
                      <div className="flex flex-col gap-2">
                        {["أو دو بارفان", "دهن عطري", "بخور سائل", "عطر مركّز", "عطر خفيف"].map((m) => (
                          <button key={m} onClick={() => setSelectedType(selectedType === m ? null : m)} className={`text-[10px] font-body text-right transition-colors duration-200 ${selectedType === m ? "text-accent" : "text-muted-foreground hover:text-accent"}`}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Product Grid */}
          <section className="px-6 md:px-12 pb-16 md:pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + sortBy}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`grid grid-cols-2 gap-4 md:gap-6 ${
                  gridCols === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
                }`}
              >
                {sortedProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} gridCols={gridCols} />
                ))}
              </motion.div>
            </AnimatePresence>

            {sortedProducts.length >= 12 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mt-16"
              >
                <button className="text-[10px] tracking-wide font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-3 group">
                  تحميل المزيد
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </motion.div>
            )}
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Shop;
