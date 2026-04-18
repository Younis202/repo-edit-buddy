import { motion } from "framer-motion";

interface WaveDividerProps {
  variant?: "gold" | "subtle" | "mist";
  flip?: boolean;
  className?: string;
}

const WaveDivider = ({ variant = "gold", flip = false, className = "" }: WaveDividerProps) => {
  const colors = {
    gold: "hsl(38 60% 55% / 0.3)",
    subtle: "hsl(40 20% 92% / 0.06)",
    mist: "hsl(38 60% 55% / 0.08)",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className={`w-full overflow-hidden pointer-events-none select-none ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] lg:h-[120px]"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={colors[variant]}
        />
        <path
          d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,60 1440,80 L1440,120 L0,120 Z"
          fill={colors[variant]}
          opacity="0.5"
        />
      </svg>
    </motion.div>
  );
};

export default WaveDivider;
