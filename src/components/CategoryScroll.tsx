import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import categoryOuterwear from "@/assets/category-outerwear.jpg";
import categoryKnitwear from "@/assets/category-knitwear.jpg";
import categoryTailoring from "@/assets/category-tailoring.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";

const categories = [
  { image: categoryOuterwear, name: "Outerwear", count: "24 Pieces" },
  { image: categoryKnitwear, name: "Knitwear", count: "18 Pieces" },
  { image: categoryTailoring, name: "Tailoring", count: "31 Pieces" },
  { image: categoryAccessories, name: "Accessories", count: "42 Pieces" },
];

const CategoryScroll = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section className="py-16 md:py-24 overflow-hidden" ref={containerRef}>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-12 mb-16"
      >
        <p className="text-xs tracking-ultra uppercase text-muted-foreground mb-4">Categories</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-foreground">
          Shop by <span className="italic">World</span>
        </h2>
      </motion.div>

      <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-12">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[30vw]"
          >
            <div className="relative overflow-hidden aspect-[4/5] mb-6">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors duration-700" />
              
              {/* Hover overlay with category number */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="font-display text-8xl md:text-9xl font-light text-foreground/10">
                  0{i + 1}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-display text-2xl md:text-3xl font-light text-foreground group-hover:text-accent transition-colors duration-500">
                {cat.name}
              </h3>
              <span className="text-xs tracking-editorial uppercase text-muted-foreground">{cat.count}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryScroll;
