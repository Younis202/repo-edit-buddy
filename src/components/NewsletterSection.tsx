import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="px-6 md:px-12 py-20 md:py-32 relative overflow-hidden">
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-stroke font-display text-[20vw] font-light leading-none whitespace-nowrap">
          MAISON
        </span>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-6 font-body">
          Join the Inner Circle
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
          className="luxury-divider mx-auto mb-10 origin-center"
        />
        <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-5 leading-tight">
          Be the <span className="italic">First</span>
          <br />
          to Know
        </h2>
        <p className="text-sm text-muted-foreground mb-14 font-body max-w-md mx-auto leading-relaxed">
          Early access to new collections, private events, and stories from behind the atelier doors.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="relative max-w-lg mx-auto">
          <div
            className={`flex border-b transition-all duration-500 ${
              isFocused ? "border-accent" : "border-border/50"
            }`}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 py-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-body tracking-wide"
            />
            <button
              type="submit"
              className="pl-4 py-4 text-foreground/40 hover:text-accent transition-colors duration-500 group"
            >
              <ArrowRight
                size={20}
                strokeWidth={1.5}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </button>
          </div>
          <p className="mt-4 text-[10px] text-muted-foreground/30 font-body">
            By subscribing you agree to our privacy policy. Unsubscribe at any time.
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
