import { cn } from "@/lib/utils";

/**
 * Shazaya brand wordmark — rendered as text using Aref Ruqaa calligraphic
 * font so the Arabic spelling stays perfectly correct (AI image gen mangles
 * Arabic letters). Uses the brand olive-gold color.
 */
interface BrandLogoProps {
  className?: string;
  variant?: "gold" | "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

const colorMap = {
  gold: "text-[#9B8B5C]",
  light: "text-foreground",
  dark: "text-background",
};

const BrandLogo = ({ className, variant = "gold", size = "md" }: BrandLogoProps) => {
  return (
    <span
      dir="rtl"
      lang="ar"
      className={cn(
        "inline-block leading-none select-none tracking-tight",
        sizeMap[size],
        colorMap[variant],
        className,
      )}
      style={{
        fontFamily: '"Aref Ruqaa", "Reem Kufi", "Amiri", serif',
        fontWeight: 700,
        letterSpacing: "-0.02em",
      }}
      aria-label="شذايا"
    >
      شذايا
    </span>
  );
};

export default BrandLogo;
