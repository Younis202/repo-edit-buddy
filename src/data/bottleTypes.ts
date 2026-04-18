// Shazaya signature bottle collection — customers choose the bottle they want.
// Each bottle has its own available sizes to keep pricing/inventory consistent.
import squareGold from "@/assets/bottles/bottle-square-gold.png";
import cylinderBlack from "@/assets/bottles/bottle-cylinder-black.png";
import domeBlack from "@/assets/bottles/bottle-dome-black.png";
import teardropBlue from "@/assets/bottles/bottle-teardrop-blue.jpg";

export interface BottleType {
  id: string;
  name: string;
  image: string;
  sizes: string[];
}

export const bottleTypes: BottleType[] = [
  { id: "square-gold", name: "كلاسيك ذهبي", image: squareGold, sizes: ["٥٠ مل", "١٠٠ مل"] },
  { id: "cylinder-black", name: "أسطواني أسود", image: cylinderBlack, sizes: ["٥٠ مل", "١٠٠ مل"] },
  { id: "dome-black", name: "قبّة سوداء", image: domeBlack, sizes: ["٥٠ مل", "١٠٠ مل"] },
  { id: "teardrop-blue", name: "دمعة كريستال", image: teardropBlue, sizes: ["٣٠ مل"] },
];

export const getBottleByName = (name: string): BottleType | undefined =>
  bottleTypes.find((b) => b.name === name);
