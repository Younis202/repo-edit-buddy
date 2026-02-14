import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, ShoppingBag } from "lucide-react";
import lookbook1 from "@/assets/lookbook-1.jpg";

const hotspots = [
  { x: 30, y: 20, name: "Wool Overcoat", price: "$2,450", size: "S-XXL" },
  { x: 45, y: 50, name: "Cashmere Sweater", price: "$890", size: "XS-XL" },
  { x: 50, y: 75, name: "Slim Trousers", price: "$680", size: "28-38" },
  { x: 42, y: 90, name: "Chelsea Boots", price: "$1,150", size: "39-46" },
];

const ShopTheLook = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeSpot, setActiveSpot] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-4 font-body">Complete the Look</p>
        <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-[0.95]">
          Shop the <span className="italic">Look</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive image with hotspots */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="lg:col-span-7 relative aspect-[3/4] overflow-hidden"
        >
          <img src={lookbook1} alt="Shop the complete look" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />

          {/* Hotspot dots */}
          {hotspots.map((spot, i) => (
            <motion.button
              key={i}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 300 }}
              onClick={() => setActiveSpot(activeSpot === i ? null : i)}
              className="absolute z-10"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <span className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-foreground/10 animate-ping" />
                <span className="relative w-6 h-6 rounded-full bg-foreground/80 backdrop-blur-md flex items-center justify-center hover:bg-accent transition-colors duration-300">
                  <Plus size={10} strokeWidth={2} className="text-background" />
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Product list */}
        <div className="lg:col-span-5 space-y-0">
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-6 font-body">4 items in this look</p>
          {hotspots.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveSpot(i)}
              onMouseLeave={() => setActiveSpot(null)}
              className={`group flex items-center justify-between py-5 border-b border-border/30 cursor-pointer transition-colors duration-300 ${
                activeSpot === i ? "bg-secondary/30 px-4 -mx-4" : ""
              }`}
            >
              <div>
                <h4 className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                  {item.name}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-foreground/60 font-body">{item.price}</span>
                  <span className="text-[9px] text-muted-foreground font-body">Sizes: {item.size}</span>
                </div>
              </div>
              <button className="w-9 h-9 border border-border/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <ShoppingBag size={14} strokeWidth={1.5} />
              </button>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="pt-6 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body">Complete look total</p>
              <p className="font-display text-2xl text-foreground mt-1">$5,170</p>
            </div>
            <button className="text-[10px] tracking-ultra uppercase text-background bg-foreground px-6 py-3 font-body hover:bg-accent hover:text-accent-foreground transition-colors duration-300 flex items-center gap-2">
              <ShoppingBag size={12} strokeWidth={1.5} />
              Add All to Bag
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopTheLook;
