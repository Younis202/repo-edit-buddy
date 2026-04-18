import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
import { productHeroImages } from "@/data/brandedImages";

const collections = [
  { image: productHeroImages["oud-royal"], title: "عود ملكي", category: "عود", price: "٤,٢٥٠ ج.م", material: "عود كمبودي", size: "tall" as const, slug: "oud-royal" },
  { image: productHeroImages["ward-taifi"], title: "ورد طائفي", category: "زهري", price: "٣,٢٥٠ ج.م", material: "ورد طائفي", size: "normal" as const, slug: "ward-taifi" },
  { image: productHeroImages["misk-aswad"], title: "مسك أسود", category: "مسك", price: "٤,٧٥٠ ج.م", material: "مسك نادر", size: "normal" as const, slug: "misk-aswad" },
  { image: productHeroImages["amber-nights"], title: "ليالي العنبر", category: "شرقي", price: "٣,٧٥٠ ج.م", material: "عنبر طبيعي", size: "tall" as const, slug: "amber-nights" },
];

const CollectionItem = ({ item, index }: { item: typeof collections[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 100 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }} className={`group cursor-pointer ${item.size === "tall" ? "row-span-2" : ""}`}>
      <Link to={`/product/${item.slug}`}>
        <div className={`relative overflow-hidden mb-6 ${item.size === "tall" ? "aspect-[2/3]" : "aspect-[4/5]"}`}>
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-4 right-4">
            <span className="text-[10px] tracking-wide text-foreground/70 bg-background/50 backdrop-blur-md px-3 py-1.5 font-body">جديد</span>
          </div>
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] tracking-wide text-foreground/50 bg-background/50 backdrop-blur-md px-3 py-1.5 font-body">{item.material}</span>
          </div>
        </div>
        <div className="flex justify-between items-start px-1">
          <div>
            <h3 className="font-display text-base md:text-lg font-normal text-foreground group-hover:text-accent transition-colors duration-500">{item.title}</h3>
            <p className="text-[11px] tracking-wide text-muted-foreground mt-1.5 font-body">{item.category}</p>
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
      <motion.div ref={headerRef} initial={{ opacity: 0, y: 50 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
        <div>
          <p className="text-[11px] tracking-wide text-muted-foreground mb-5 font-body">قطع مميزة</p>
          <motion.div initial={{ scaleX: 0 }} animate={isHeaderInView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }} className="luxury-divider mb-6 origin-right" />
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
            وصل <span className="italic">حديثاً</span>
          </h2>
        </div>
        <Link to="/shop" className="mt-8 md:mt-0 inline-flex items-center gap-3 text-[11px] tracking-wide text-foreground/50 hover:text-accent transition-colors duration-500 nav-link pb-1 font-body group">
          <span>عرض جميع العطور</span>
          <ArrowUpLeft size={12} className="group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-auto">
        {collections.map((item, index) => (
          <CollectionItem key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
