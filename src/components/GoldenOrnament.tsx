import { motion } from "framer-motion";

interface GoldenOrnamentProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GoldenOrnament = ({ size = "md", className = "" }: GoldenOrnamentProps) => {
  const sizes = { sm: "w-20", md: "w-32 md:w-40", lg: "w-48 md:w-64" };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`${sizes[size]} mx-auto ${className}`}
    >
      <svg viewBox="0 0 200 30" className="w-full h-auto" fill="none">
        <defs>
          <linearGradient id="ornGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(38 60% 55%)" stopOpacity="0" />
            <stop offset="20%" stopColor="hsl(38 60% 55%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(42 70% 70%)" stopOpacity="1" />
            <stop offset="80%" stopColor="hsl(38 60% 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(38 60% 55%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Center diamond */}
        <path d="M100,5 L105,15 L100,25 L95,15 Z" fill="url(#ornGold)" opacity="0.8" />
        {/* Left flowing line */}
        <path d="M90,15 C75,15 60,8 40,15 C25,20 10,15 0,15" stroke="url(#ornGold)" strokeWidth="0.8" fill="none" />
        <path d="M90,15 C75,15 65,22 45,15 C30,10 15,15 0,15" stroke="url(#ornGold)" strokeWidth="0.4" fill="none" opacity="0.5" />
        {/* Right flowing line */}
        <path d="M110,15 C125,15 140,8 160,15 C175,20 190,15 200,15" stroke="url(#ornGold)" strokeWidth="0.8" fill="none" />
        <path d="M110,15 C125,15 135,22 155,15 C170,10 185,15 200,15" stroke="url(#ornGold)" strokeWidth="0.4" fill="none" opacity="0.5" />
        {/* Dots */}
        <circle cx="70" cy="12" r="1.2" fill="url(#ornGold)" opacity="0.6" />
        <circle cx="130" cy="12" r="1.2" fill="url(#ornGold)" opacity="0.6" />
        <circle cx="50" cy="16" r="0.8" fill="url(#ornGold)" opacity="0.4" />
        <circle cx="150" cy="16" r="0.8" fill="url(#ornGold)" opacity="0.4" />
      </svg>
    </motion.div>
  );
};

export default GoldenOrnament;
