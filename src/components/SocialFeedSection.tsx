import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import social1 from "@/assets/social-1.jpg";
import social2 from "@/assets/social-2.jpg";
import social3 from "@/assets/social-3.jpg";
import social4 from "@/assets/social-4.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import craftsmanship1 from "@/assets/craftsmanship-1.jpg";

const images = [
  { src: social1, span: "" },
  { src: social2, span: "" },
  { src: social3, span: "row-span-2" },
  { src: social4, span: "" },
  { src: lookbook3, span: "" },
  { src: craftsmanship1, span: "" },
];

const SocialFeedSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-12 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Instagram size={16} strokeWidth={1.5} className="text-accent" />
            <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body">@maison</p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground leading-[0.95]">
            Follow the <span className="italic">Journey</span>
          </h2>
        </div>
        <a
          href="#"
          className="mt-6 md:mt-0 inline-flex items-center gap-3 text-[10px] tracking-ultra uppercase text-foreground/50 hover:text-accent transition-colors duration-500 font-body group"
        >
          <span>Follow Us</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-1.5">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group cursor-pointer relative overflow-hidden aspect-square ${img.span}`}
          >
            <img
              src={img.src}
              alt={`MAISON social ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-500 flex items-center justify-center">
              <Instagram
                size={24}
                strokeWidth={1.5}
                className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-2 group-hover:translate-y-0"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialFeedSection;
