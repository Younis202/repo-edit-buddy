import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";

const bestSellers = [
  { image: collection1, name: "The Overcoat", price: "$2,450", originalPrice: "$2,900", tag: "Best Seller" },
  { image: lookbook1, name: "Charcoal Blazer", price: "$1,890", tag: "Trending" },
  { image: collection2, name: "Ivory Cable Knit", price: "$890", tag: "New" },
  { image: lookbook2, name: "Slim Wool Trousers", price: "$680", tag: "Restocked" },
  { image: collection3, name: "Midnight Suit", price: "$3,200", tag: "Best Seller" },
  { image: collection4, name: "Chelsea Boots", price: "$1,150", tag: "Limited" },
];

const BestSellersStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14"
      >
        <div>
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-4 font-body">Curated for You</p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-[0.95]">
            Best <span className="italic">Sellers</span>
          </h2>
        </div>
        <div className="flex items-center gap-6 mt-6 md:mt-0">
          {["All", "Outerwear", "Knitwear", "Tailoring", "Shoes"].map((cat, i) => (
            <button
              key={cat}
              className={`text-[10px] tracking-ultra uppercase font-body transition-colors duration-300 pb-1 border-b ${
                i === 0 ? "text-foreground border-accent" : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
        {bestSellers.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[3/4] mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              {/* Tag */}
              <div className="absolute top-2 left-2">
                <span className={`text-[8px] tracking-editorial uppercase px-2 py-1 font-body ${
                  item.tag === "Best Seller" ? "bg-accent text-accent-foreground" :
                  item.tag === "Limited" ? "bg-destructive text-destructive-foreground" :
                  "bg-background/60 backdrop-blur-md text-foreground/70"
                }`}>
                  {item.tag}
                </span>
              </div>
              {/* Wishlist */}
              <button className="absolute top-2 right-2 w-7 h-7 bg-background/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart size={12} strokeWidth={1.5} className="text-foreground/70 hover:text-accent transition-colors" />
              </button>
              {/* Quick add */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <button className="w-full text-[9px] tracking-ultra uppercase text-background bg-foreground py-2 font-body hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2">
                  <ShoppingBag size={10} strokeWidth={1.5} />
                  Quick Add
                </button>
              </div>
            </div>
            <h3 className="font-display text-sm font-normal text-foreground group-hover:text-accent transition-colors duration-300 mb-0.5">
              {item.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/70 font-body">{item.price}</span>
              {item.originalPrice && (
                <span className="text-[10px] text-muted-foreground line-through font-body">{item.originalPrice}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSellersStrip;
