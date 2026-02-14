import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, ArrowLeft, Share2, Ruler, Truck, RotateCcw, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import productImg1 from "@/assets/product-detail-1.jpg";
import productImg2 from "@/assets/product-detail-2.jpg";
import productImg3 from "@/assets/product-detail-3.jpg";
import productImg4 from "@/assets/product-detail-4.jpg";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";

const productImages = [productImg1, productImg2, productImg3, productImg4];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Charcoal", value: "hsl(40, 5%, 15%)" },
  { name: "Camel", value: "hsl(35, 40%, 55%)" },
  { name: "Navy", value: "hsl(220, 30%, 20%)" },
  { name: "Ivory", value: "hsl(40, 30%, 88%)" },
];

const accordionData = [
  {
    title: "Description",
    content: "The Overcoat is the cornerstone of the MAISON wardrobe. Cut from double-faced Italian wool sourced from Loro Piana mills, this piece is engineered for both warmth and movement. The relaxed silhouette drapes naturally, while the half-canvas construction ensures the coat maintains its shape season after season. A single back vent allows ease of stride, and the notch lapel sits perfectly without pressing.",
  },
  {
    title: "Materials & Composition",
    content: "Outer: 100% Italian Virgin Wool (Loro Piana) • Lining: 100% Cupro Bemberg • Buttons: Natural Horn • Weight: 650g/m² • Origin: Handcrafted in Florence, Italy • Each garment is individually numbered.",
  },
  {
    title: "Size & Fit",
    content: "Relaxed fit — we recommend ordering your usual size. Model is 6'1\" / 186cm and wears size M. Shoulder: 46cm (M) • Chest: 112cm (M) • Length: 105cm (M) • Sleeve: 66cm (M). For a more tailored look, consider sizing down.",
  },
  {
    title: "Care Instructions",
    content: "Dry clean only • Store on a wide wooden hanger • Use a garment bag for travel • Steam rather than iron • Allow 24 hours between wears for the fibers to recover their shape. Complimentary alterations available at any MAISON boutique.",
  },
  {
    title: "Shipping & Returns",
    content: "Complimentary express shipping on all orders • Signature packaging with dust bag included • 30-day return policy — items must be unworn with tags attached • Free pickup for returns • International duties & taxes included in price.",
  },
];

const relatedProducts = [
  { image: collection1, name: "The Overcoat", price: "$2,450", category: "Outerwear", slug: "the-overcoat" },
  { image: collection2, name: "Ivory Cable Knit", price: "$890", category: "Knitwear", slug: "ivory-cable-knit" },
  { image: collection3, name: "Midnight Suit", price: "$3,200", category: "Tailoring", slug: "midnight-suit" },
  { image: collection4, name: "Chelsea Boots", price: "$1,150", category: "Accessories", slug: "chelsea-boots" },
];

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

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
              <Link to="/" className="hover:text-foreground transition-colors">Outerwear</Link>
              <span>/</span>
              <span className="text-foreground">The Overcoat</span>
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
                    {productImages.map((img, i) => (
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
                        <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
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
                          src={productImages[selectedImage]}
                          alt="The Overcoat"
                          className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        {/* Zoom hint */}
                        <div className="absolute bottom-4 right-4 text-[9px] tracking-ultra uppercase text-foreground/30 font-body bg-background/30 backdrop-blur-md px-3 py-1.5">
                          Hover to zoom
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Mobile thumbnail dots */}
                    <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
                      {productImages.map((_, i) => (
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
                  <span className="text-[9px] tracking-ultra uppercase text-accent font-body bg-accent/10 px-3 py-1 inline-block mb-4">
                    New — SS26
                  </span>

                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-2">
                    The <span className="italic">Overcoat</span>
                  </h1>

                  <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body mb-6">
                    Outerwear — Italian Wool
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="font-display text-2xl md:text-3xl text-foreground">$2,450</span>
                    <span className="text-sm text-muted-foreground line-through font-body">$2,900</span>
                    <span className="text-[9px] tracking-editorial uppercase text-accent font-body bg-accent/10 px-2 py-0.5">Save 15%</span>
                  </div>

                  {/* Short description */}
                  <p className="text-sm text-muted-foreground leading-relaxed font-body mb-8 max-w-md">
                    Impeccably tailored from double-faced Loro Piana wool, this signature overcoat is the
                    quiet centerpiece of every wardrobe. Built to last generations.
                  </p>

                  {/* Color selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-ultra uppercase text-foreground font-body">
                        Color — <span className="text-muted-foreground">{colors[selectedColor].name}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {colors.map((color, i) => (
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
                    <div className="grid grid-cols-6 gap-2">
                      {sizes.map((size) => (
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
                    {accordionData.map((item, i) => (
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
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/product/${item.slug}`} className="group cursor-pointer block">
                    <div className="relative overflow-hidden aspect-[3/4] mb-3">
                      <img
                        src={item.image}
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
