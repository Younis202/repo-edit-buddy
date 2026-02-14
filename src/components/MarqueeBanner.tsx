import { motion } from "framer-motion";

const MarqueeBanner = () => {
  const items = [
    "New Collection SS26",
    "✦",
    "Free Shipping Over $200",
    "✦",
    "Easy Returns Within 30 Days",
    "✦",
    "Size Guide Available",
    "✦",
    "Secure Checkout",
    "✦",
    "Pay in 4 Installments",
    "✦",
  ];

  const text = items.join("   ") + "   ";

  return (
    <div className="py-5 border-y border-border/50 overflow-hidden bg-secondary/20 relative">
      {/* Forward scroll */}
      <motion.div
        animate={{ x: [0, -1500] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="whitespace-nowrap flex"
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body inline-block"
          >
            {text}
          </span>
        ))}
      </motion.div>
      {/* Reverse scroll — subtle second layer */}
      <motion.div
        animate={{ x: [-1500, 0] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        className="whitespace-nowrap flex mt-2 opacity-30"
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body inline-block"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
