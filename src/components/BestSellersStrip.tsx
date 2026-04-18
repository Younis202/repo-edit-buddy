import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProducts } from "@/hooks/useProducts";
import { productHeroImages } from "@/data/brandedImages";

const bestSellers = [
  { image: productHeroImages["oud-royal"], name: "عود ملكي", price: "٤,٢٥٠ ج.م", originalPrice: "٥,٢٥٠ ج.م", tag: "الأكثر مبيعاً", category: "عود" },
  { image: productHeroImages["bukhoor-elite"], name: "بخور النخبة", price: "٢,٧٥٠ ج.م", tag: "رائج", category: "بخور" },
  { image: productHeroImages["ward-taifi"], name: "ورد طائفي", price: "٣,٢٥٠ ج.م", tag: "جديد", category: "زهري" },
  { image: productHeroImages["zaafaran-gold"], name: "زعفران ذهبي", price: "٢,٤٠٠ ج.م", tag: "عاد للمخزون", category: "شرقي" },
  { image: productHeroImages["misk-aswad"], name: "مسك أسود", price: "٤,٧٥٠ ج.م", tag: "الأكثر مبيعاً", category: "مسك" },
  { image: productHeroImages["amber-nights"], name: "ليالي العنبر", price: "٣,٧٥٠ ج.م", tag: "محدود", category: "شرقي" },
];

const filterCategories = ["الكل", "عود", "زهري", "شرقي", "مسك"];

const BestSellersStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { data: allProducts = [] } = useProducts();
  const [activeFilter, setActiveFilter] = useState("الكل");

  const handleQuickAdd = (item: typeof bestSellers[0]) => {
    const product = allProducts.find((p) => p.name === item.name);
    if (product) {
      addItem(product, product.sizes[0], product.colors[0]?.name || "افتراضي");
    }
  };

  const handleToggleWishlist = (item: typeof bestSellers[0]) => {
    const product = allProducts.find((p) => p.name === item.name);
    if (product) toggleWishlist(product);
  };

  const filtered = activeFilter === "الكل"
    ? bestSellers
    : bestSellers.filter((b) => b.category === activeFilter);

  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14">
        <div>
          <p className="text-[11px] tracking-wide text-muted-foreground mb-4 font-body">مختارات لك</p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-[0.95]">الأكثر <span className="italic">مبيعاً</span></h2>
        </div>
        <div className="flex items-center gap-6 mt-6 md:mt-0">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[11px] tracking-wide font-body transition-colors duration-300 pb-1 border-b ${
                activeFilter === cat
                  ? "text-foreground border-accent"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
        {filtered.map((item, i) => {
          const product = allProducts.find((p) => p.name === item.name);
          const wishlisted = product ? isWishlisted(product.id) : false;

          return (
            <motion.div key={item.name} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="group">
              <Link to={`/product/${product?.slug || ""}`} className="block">
                <div className="relative overflow-hidden aspect-[3/4] mb-3">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  <div className="absolute top-2 right-2">
                    <span className={`text-[9px] tracking-wide px-2 py-1 font-body ${item.tag === "الأكثر مبيعاً" ? "bg-accent text-accent-foreground" : item.tag === "محدود" ? "bg-destructive text-destructive-foreground" : "bg-background/60 backdrop-blur-md text-foreground/70"}`}>{item.tag}</span>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); handleToggleWishlist(item); }}
                    className={`absolute top-2 left-2 w-7 h-7 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
                      wishlisted ? "bg-accent/20 text-accent opacity-100" : "bg-background/40 text-foreground/70 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Heart size={12} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <button onClick={(e) => { e.preventDefault(); handleQuickAdd(item); }} className="w-full text-[10px] tracking-wide text-background bg-foreground py-2 font-body hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2">
                      <ShoppingBag size={10} strokeWidth={1.5} />
                      إضافة سريعة
                    </button>
                  </div>
                </div>
              </Link>
              <Link to={`/product/${product?.slug || ""}`} className="block">
                <h3 className="font-display text-sm font-normal text-foreground group-hover:text-accent transition-colors duration-300 mb-0.5">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground/70 font-body">{item.price}</span>
                  {item.originalPrice && <span className="text-[10px] text-muted-foreground line-through font-body">{item.originalPrice}</span>}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellersStrip;
