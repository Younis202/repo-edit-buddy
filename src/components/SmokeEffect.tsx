import { motion } from "framer-motion";

const SmokeEffect = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{
          opacity: [0, 0.06, 0.03, 0],
          y: [100, -200],
          scale: [0.8, 1.5, 2],
          x: [0, (i - 1) * 80],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Infinity,
          delay: i * 3,
          ease: "easeOut",
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(38 60% 55% / 0.15) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
    ))}
  </div>
);

export default SmokeEffect;
