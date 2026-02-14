import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";

const collections = [
  { image: collection1, title: "The Overcoat", category: "Outerwear", price: "$2,450", material: "Italian Wool", size: "tall", slug: "the-overcoat" },
  { image: collection2, title: "Ivory Knit", category: "Knitwear", price: "$890", material: "Mongolian Cashmere", size: "normal", slug: "ivory-cable-knit" },
  { image: collection3, title: "Midnight Suit", category: "Tailoring", price: "$3,200", material: "Super 150s Wool", size: "normal", slug: "midnight-suit" },
  { image: collection4, title: "Heritage Boots", category: "Accessories", price: "$1,150", material: "Full-Grain Leather", size: "tall", slug: "chelsea-boots" },
];

const CollectionItem = ({ item, index }: { item: typeof collections[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`group cursor-pointer ${item.size === "tall" ? "row-span-2" : ""}`}
    >
      <Link to={`/product/${item.slug}`}>
      <div className={`relative overflow-hidden mb-6 ${item.size === "tall" ? "aspect-[2/3]" : "aspect-[4/5]"}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <span key={size} className="w-8 h-8 border border-foreground/30 flex items-center justify-center text-[9px] tracking-wide font-body text-foreground/70 hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer">
                  {size}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button className="text-[10px] tracking-ultra uppercase text-background bg-foreground px-5 py-2.5 font-body hover:bg-accent hover:text-accent-foreground transition-colors duration-300">
                Add to Bag
              </button>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 border border-foreground/40 flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-500">
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-ultra uppercase text-foreground/70 bg-background/50 backdrop-blur-md px-3 py-1.5 font-body">
            New
          </span>
        </div>

        {/* Material tag */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[9px] tracking-editorial uppercase text-foreground/50 bg-background/50 backdrop-blur-md px-3 py-1.5 font-body">
            {item.material}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="font-display text-base md:text-lg font-normal text-foreground group-hover:text-accent transition-colors duration-500">
            {item.title}
          </h3>
          <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mt-1.5 font-body">
            {item.category}
          </p>
        </div>
        <span className="text-xs text-foreground/50 font-body mt-1">{item.price}</span>
      </div>
    </Link>
    </motion.div>
  );
};

const CollectionGrid = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="collection" className="px-6 md:px-12 py-16 md:py-24">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24"
      >
        <div>
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-5 font-body">Featured Pieces</p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            className="luxury-divider mb-6 origin-left"
          />
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
            New <span className="italic">Arrivals</span>
          </h2>
        </div>
        <Link
          to="/shop"
          className="mt-8 md:mt-0 inline-flex items-center gap-3 text-[10px] tracking-ultra uppercase text-foreground/50 hover:text-accent transition-colors duration-500 nav-link pb-1 font-body group"
        >
          <span>View All Pieces</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </motion.div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-auto">
        {collections.map((item, index) => (
          <CollectionItem key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
