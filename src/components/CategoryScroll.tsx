import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import categoryOud from "@/assets/category-oud.jpg";
import categoryFloral from "@/assets/category-floral.jpg";
import categoryOriental from "@/assets/category-oriental.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

const categories = [
  { image: categoryOud, name: "عود", count: "٣ عطور", filter: "عود" },
  { image: categoryFloral, name: "زهري", count: "٣ عطور", filter: "زهري" },
  { image: categoryOriental, name: "شرقي", count: "٣ عطور", filter: "شرقي" },
  { image: categoryGifts, name: "هدايا", count: "مجموعات فاخرة", filter: "" },
];

const CategoryScroll = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section className="py-16 md:py-24 overflow-hidden" ref={containerRef}>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-12 mb-16"
      >
        <p className="text-xs tracking-wide text-muted-foreground mb-4">
          التصنيفات
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-foreground">
          تسوّق حسب <span className="italic">العالم</span>
        </h2>
      </motion.div>
      <motion.div style={{ x }} className="flex gap-6 pr-6 md:pr-12">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group cursor-pointer flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[30vw]"
          >
            <Link
              to={cat.filter ? `/shop?category=${cat.filter}` : "/collections"}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors duration-700" />
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
                <span className="text-xs tracking-wide text-muted-foreground">
                  {cat.count}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryScroll;
