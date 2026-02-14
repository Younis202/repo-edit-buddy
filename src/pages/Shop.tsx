import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import productImg1 from "@/assets/product-detail-1.jpg";
import productImg2 from "@/assets/product-detail-2.jpg";
import productImg3 from "@/assets/product-detail-3.jpg";
import productImg4 from "@/assets/product-detail-4.jpg";
import craftsmanship1 from "@/assets/craftsmanship-1.jpg";

const allProducts = [
  { id: 1, image: collection1, name: "The Overcoat", price: "$2,450", originalPrice: "$2,900", category: "Outerwear", tag: "Best Seller", slug: "the-overcoat", sizes: ["S", "M", "L", "XL"] },
  { id: 2, image: collection2, name: "Ivory Cable Knit", price: "$890", category: "Knitwear", tag: "New", slug: "ivory-cable-knit", sizes: ["XS", "S", "M", "L"] },
  { id: 3, image: collection3, name: "Midnight Suit", price: "$3,200", category: "Tailoring", tag: "Best Seller", slug: "midnight-suit", sizes: ["S", "M", "L"] },
  { id: 4, image: collection4, name: "Chelsea Boots", price: "$1,150", category: "Accessories", tag: "Limited", slug: "chelsea-boots", sizes: ["40", "41", "42", "43", "44"] },
  { id: 5, image: lookbook1, name: "Charcoal Blazer", price: "$1,890", category: "Tailoring", tag: "Trending", slug: "charcoal-blazer", sizes: ["S", "M", "L", "XL"] },
  { id: 6, image: lookbook2, name: "Slim Wool Trousers", price: "$680", category: "Tailoring", tag: "Restocked", slug: "slim-wool-trousers", sizes: ["28", "30", "32", "34", "36"] },
  { id: 7, image: lookbook3, name: "Merino Polo", price: "$420", category: "Knitwear", tag: "New", slug: "merino-polo", sizes: ["S", "M", "L", "XL"] },
  { id: 8, image: productImg1, name: "Double-Breasted Coat", price: "$2,890", category: "Outerwear", tag: "New", slug: "double-breasted-coat", sizes: ["M", "L", "XL"] },
  { id: 9, image: productImg2, name: "Cashmere Scarf", price: "$340", category: "Accessories", tag: "Best Seller", slug: "cashmere-scarf", sizes: ["One Size"] },
  { id: 10, image: productImg3, name: "Linen Shirt", price: "$520", category: "Tailoring", tag: "New", slug: "linen-shirt", sizes: ["S", "M", "L", "XL"] },
  { id: 11, image: productImg4, name: "Suede Loafers", price: "$780", category: "Accessories", tag: "Trending", slug: "suede-loafers", sizes: ["40", "41", "42", "43", "44"] },
  { id: 12, image: craftsmanship1, name: "Heritage Peacoat", price: "$2,100", originalPrice: "$2,600", category: "Outerwear", tag: "Limited", slug: "heritage-peacoat", sizes: ["S", "M", "L"] },
];

const categories = ["All", "Outerwear", "Knitwear", "Tailoring", "Accessories"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Best Sellers"];

const ProductCard = ({ product, index, gridCols }: { product: typeof allProducts[0]; index: number; gridCols: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [isWishlisted, setIsWishlisted] = useState(false);

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
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          {/* Tag */}
          <div className="absolute top-3 left-3">
            <span className={`text-[8px] tracking-editorial uppercase px-2.5 py-1 font-body ${
              product.tag === "Best Seller" ? "bg-accent text-accent-foreground" :
              product.tag === "Limited" ? "bg-destructive text-destructive-foreground" :
              "bg-background/60 backdrop-blur-md text-foreground/70"
            }`}>
              {product.tag}
            </span>
          </div>
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
            className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
              isWishlisted ? "bg-accent/20 text-accent opacity-100" : "bg-background/40 text-foreground/70 opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart size={13} strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          {/* Hover overlay with sizes + quick add */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex items-center gap-1.5 mb-2.5">
              {product.sizes.map((size) => (
                <span key={size} className="w-8 h-7 border border-foreground/20 flex items-center justify-center text-[8px] tracking-wide font-body text-foreground/60 bg-background/60 backdrop-blur-md hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer">
                  {size}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full text-[9px] tracking-ultra uppercase text-background bg-foreground py-2.5 font-body hover:bg-accent hover:text-accent-foreground transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={11} strokeWidth={1.5} />
              Add to Bag
            </button>
          </div>
        </div>
      </Link>
      <Link to={`/product/${product.slug}`} className="block">
        <h3 className="font-display text-sm md:text-base font-normal text-foreground group-hover:text-accent transition-colors duration-300 mb-0.5">
          {product.name}
        </h3>
        <p className="text-[9px] tracking-editorial uppercase text-muted-foreground font-body mb-1.5">{product.category}</p>
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const filteredProducts = activeCategory === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return parseFloat(a.price.replace(/[$,]/g, "")) - parseFloat(b.price.replace(/[$,]/g, ""));
    if (sortBy === "Price: High to Low") return parseFloat(b.price.replace(/[$,]/g, "")) - parseFloat(a.price.replace(/[$,]/g, ""));
    if (sortBy === "Best Sellers") return a.tag === "Best Seller" ? -1 : 1;
    return 0;
  });

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen cursor-none md:cursor-none">
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
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-[10px] tracking-editorial uppercase font-body text-muted-foreground mb-8">
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <span>/</span>
                <span className="text-foreground">Shop All</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-4 font-body">
                    The Collection
                  </p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isHeaderInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                    className="luxury-divider mb-5 origin-left"
                  />
                  <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
                    Shop <span className="italic">All</span>
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground font-body mt-6 md:mt-0 max-w-sm leading-relaxed">
                  Explore our complete range of meticulously crafted pieces — from tailored outerwear to fine accessories.
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
              {/* Categories */}
              <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] tracking-ultra uppercase font-body whitespace-nowrap transition-all duration-300 pb-1 border-b ${
                      activeCategory === cat
                        ? "text-foreground border-accent"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {cat}
                    <span className="ml-1.5 text-muted-foreground">
                      ({cat === "All" ? allProducts.length : allProducts.filter(p => p.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-5">
                {/* Filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-[10px] tracking-ultra uppercase font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SlidersHorizontal size={13} strokeWidth={1.5} />
                  Filters
                </button>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSort(!showSort)}
                    className="flex items-center gap-2 text-[10px] tracking-ultra uppercase font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sort: {sortBy}
                    <ChevronDown size={12} strokeWidth={1.5} className={`transition-transform duration-300 ${showSort ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showSort && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-8 bg-card border border-border/30 backdrop-blur-2xl z-20 min-w-[180px]"
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setSortBy(opt); setShowSort(false); }}
                            className={`block w-full text-left px-4 py-2.5 text-[10px] tracking-editorial uppercase font-body transition-colors ${
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

                {/* Grid toggle (desktop) */}
                <div className="hidden md:flex items-center gap-1 border-l border-border/20 pl-5">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 transition-colors ${gridCols === 3 ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="3 columns"
                  >
                    <LayoutGrid size={15} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 transition-colors ${gridCols === 4 ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="4 columns"
                  >
                    <Grid3X3 size={15} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Results count */}
                <span className="text-[10px] tracking-editorial text-muted-foreground font-body hidden md:block">
                  {sortedProducts.length} pieces
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
                      <p className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-4">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                          <button key={s} className="w-9 h-8 border border-border/30 text-[9px] tracking-wide font-body text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Color filter */}
                    <div>
                      <p className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-4">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: "Black", value: "hsl(40, 5%, 10%)" },
                          { name: "Charcoal", value: "hsl(40, 5%, 25%)" },
                          { name: "Camel", value: "hsl(35, 40%, 55%)" },
                          { name: "Navy", value: "hsl(220, 30%, 20%)" },
                          { name: "Ivory", value: "hsl(40, 30%, 88%)" },
                        ].map((c) => (
                          <button key={c.name} className="w-7 h-7 rounded-full border border-border/30 hover:border-accent transition-colors duration-200" style={{ backgroundColor: c.value }} title={c.name} />
                        ))}
                      </div>
                    </div>
                    {/* Price range */}
                    <div>
                      <p className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-4">Price</p>
                      <div className="flex flex-col gap-2">
                        {["Under $500", "$500 – $1,000", "$1,000 – $2,000", "Over $2,000"].map((r) => (
                          <button key={r} className="text-[10px] text-muted-foreground font-body text-left hover:text-accent transition-colors duration-200">
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Material */}
                    <div>
                      <p className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-4">Material</p>
                      <div className="flex flex-col gap-2">
                        {["Wool", "Cashmere", "Linen", "Leather", "Cotton"].map((m) => (
                          <button key={m} className="text-[10px] text-muted-foreground font-body text-left hover:text-accent transition-colors duration-200">
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

            {/* Load more */}
            {sortedProducts.length >= 12 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mt-16"
              >
                <button className="text-[10px] tracking-ultra uppercase font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-3 group">
                  Load More Pieces
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
