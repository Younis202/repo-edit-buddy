import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="px-6 md:px-12 py-16 md:py-24">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          <img
            src={aboutImage}
            alt="Artisan craftsmanship in our atelier"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-ultra uppercase text-muted-foreground mb-6">Our Story</p>
          <div className="luxury-divider mb-8" />
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight mb-8">
            Crafted with
            <br />
            <span className="italic">intention</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-md font-body">
            Founded on the principle that clothing should transcend seasons, MAISON creates 
            pieces that exist at the intersection of art and utility. Each garment is 
            developed over months, with materials sourced from the finest mills in Italy and Japan.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-md font-body">
            We believe in the quiet power of restraint — where every seam, every cut, every 
            fiber serves a purpose.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-4 text-xs tracking-ultra uppercase text-foreground/80 hover:text-accent transition-colors duration-500 group"
          >
            <span>Read More</span>
            <span className="block w-12 h-px bg-foreground/40 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
