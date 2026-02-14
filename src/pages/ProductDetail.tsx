import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, Share2, Ruler, Truck, RotateCcw, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const product = getProductBySlug(slug || "");
  const relatedProducts = getRelatedProducts(slug || "");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  // Reset state when slug changes
  useState(() => {
    setSelectedImage(0);
    setSelectedSize(null);
    setSelectedColor(0);
    setQuantity(1);
    setOpenAccordion(0);
    setIsWishlisted(false);
    setAddedToBag(false);
  });

  if (!product) {
    return (
      <>
        <CustomCursor />
        <FilmGrain />
        <SmoothScroll>
          <main className="bg-background min-h-screen cursor-none md:cursor-none">
            <Navbar />
            <div className="pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center min-h-[60vh]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-4 font-body">Product Not Found</p>
                <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6">
                  This piece doesn't <span className="italic">exist</span>
                </h1>
                <p className="text-sm text-muted-foreground font-body mb-10 max-w-md mx-auto">
                  The product you're looking for may have been removed or is no longer available.
                </p>
                <Link
                  to="/shop"
                  className="text-[10px] tracking-ultra uppercase font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300 inline-block"
                >
                  Return to Shop
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
    if (!selectedSize || !product) return;
    addItem(product, selectedSize, product.colors[selectedColor]?.name || "", quantity);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  // Build display title: "The" before italic word, or split name
  const titleParts = product.name.split(product.nameItalic);
  const titlePrefix = titleParts[0]?.trim() || "";

  const savePercent = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice.replace(/[$,]/g, "")) -
          parseFloat(product.price.replace(/[$,]/g, ""))) /
          parseFloat(product.originalPrice.replace(/[$,]/g, ""))) *
          100
      )
    : null;

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen cursor-none md:cursor-none">
          <Navbar />

          {/* Breadcrumb */}
          <div className="pt-24 md:pt-28 px-6 md:px-12">
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-[10px] tracking-editorial uppercase font-body text-muted-foreground"
            >
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                        onClick={() => setSelectedImage(i)}
                        className={`relative aspect-[3/4] overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === i ? "border-accent" : "border-transparent hover:border-foreground/20"
                        }`}
                      >
                        <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
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
                        <div className="absolute bottom-4 right-4 text-[9px] tracking-ultra uppercase text-foreground/30 font-body bg-background/30 backdrop-blur-md px-3 py-1.5">
                          Hover to zoom
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Mobile thumbnail dots */}
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
                  {/* Tag */}
                  <span className={`text-[9px] tracking-ultra uppercase font-body px-3 py-1 inline-block mb-4 ${
                    product.tag === "Best Seller" ? "text-accent bg-accent/10" :
                    product.tag === "Limited" ? "text-destructive bg-destructive/10" :
                    "text-accent bg-accent/10"
                  }`}>
                    {product.tag} — {product.season}
                  </span>

                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-2">
                    {titlePrefix && <>{titlePrefix} </>}<span className="italic">{product.nameItalic}</span>
                  </h1>

                  <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body mb-6">
                    {product.category} — {product.material}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="font-display text-2xl md:text-3xl text-foreground">{product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-muted-foreground line-through font-body">{product.originalPrice}</span>
                        {savePercent && (
                          <span className="text-[9px] tracking-editorial uppercase text-accent font-body bg-accent/10 px-2 py-0.5">
                            Save {savePercent}%
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Short description */}
                  <p className="text-sm text-muted-foreground leading-relaxed font-body mb-8 max-w-md">
                    {product.shortDescription}
                  </p>

                  {/* Color selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-ultra uppercase text-foreground font-body">
                        Color — <span className="text-muted-foreground">{product.colors[selectedColor]?.name}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {product.colors.map((color, i) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(i)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                            selectedColor === i ? "border-accent scale-110" : "border-transparent hover:border-foreground/30"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-ultra uppercase text-foreground font-body">
                        Size {selectedSize && <span className="text-muted-foreground">— {selectedSize}</span>}
                      </span>
                      <button className="text-[10px] tracking-editorial uppercase text-accent font-body flex items-center gap-1 hover:underline">
                        <Ruler size={12} />
                        Size Guide
                      </button>
                    </div>
                    <div className={`grid gap-2 ${product.sizes.length <= 6 ? "grid-cols-6" : "grid-cols-5"}`}>
                      {product.sizes.map((size) => (
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
                      <p className="text-[10px] text-accent/70 font-body mt-2">Please select a size</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="mb-8">
                    <span className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-3 block">Quantity</span>
                    <div className="flex items-center gap-0 border border-border/40 w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors border-r border-border/40"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="w-14 h-11 flex items-center justify-center text-sm font-body text-foreground">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors border-l border-border/40"
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
                      className={`flex-1 py-4 text-[11px] tracking-ultra uppercase font-body flex items-center justify-center gap-3 transition-all duration-500 ${
                        addedToBag
                          ? "bg-accent text-accent-foreground"
                          : selectedSize
                          ? "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
                          : "bg-foreground/30 text-foreground/40 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      {addedToBag ? "Added to Bag ✓" : "Add to Bag"}
                    </motion.button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                        isWishlisted ? "border-accent bg-accent/10 text-accent" : "border-border/40 text-foreground/40 hover:border-foreground/60"
                      }`}
                    >
                      <Heart size={18} strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button className="w-14 h-14 border border-border/40 flex items-center justify-center text-foreground/40 hover:border-foreground/60 hover:text-foreground transition-all duration-300">
                      <Share2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center gap-6 py-5 border-y border-border/20 mb-8">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck size={14} strokeWidth={1.5} className="text-accent" />
                      <span className="text-[9px] tracking-editorial uppercase font-body">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <RotateCcw size={14} strokeWidth={1.5} className="text-accent" />
                      <span className="text-[9px] tracking-editorial uppercase font-body">30-Day Returns</span>
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
                          <span className="text-[11px] tracking-editorial uppercase text-foreground font-body group-hover:text-accent transition-colors duration-300">
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
                              <p className="text-sm text-muted-foreground leading-relaxed font-body pb-5 pr-8">
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

          {/* You May Also Like */}
          <section className="px-6 md:px-12 py-16 md:py-24 border-t border-border/20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-4 font-body">Complete Your Wardrobe</p>
              <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
                You May Also <span className="italic">Like</span>
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
                        <span className="w-full text-[9px] tracking-ultra uppercase text-background bg-foreground py-2 font-body flex items-center justify-center gap-2">
                          <ShoppingBag size={10} strokeWidth={1.5} />
                          Quick Add
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
    </>
  );
};

export default ProductDetail;
