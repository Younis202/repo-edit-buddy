// Shazaya signature bottle collection — customers choose the bottle they want.
import squareGold from "@/assets/bottles/bottle-square-gold.png";
import cylinderBlack from "@/assets/bottles/bottle-cylinder-black.png";
import domeBlack from "@/assets/bottles/bottle-dome-black.png";
import teardropBlue from "@/assets/bottles/bottle-teardrop-blue.jpg";
import slimGold from "@/assets/bottles/bottle-slim-gold.png";

export interface BottleType {
  id: string;
  name: string;
  image: string;
}

export const bottleTypes: BottleType[] = [
  { id: "square-gold", name: "كلاسيك ذهبي", image: squareGold },
  { id: "cylinder-black", name: "أسطواني أسود", image: cylinderBlack },
  { id: "dome-black", name: "قبّة سوداء", image: domeBlack },
  { id: "teardrop-blue", name: "دمعة كريستال", image: teardropBlue },
  { id: "slim-gold", name: "نحيل ذهبي", image: slimGold },
];

export const getBottleByName = (name: string): BottleType | undefined =>
  bottleTypes.find((b) => b.name === name);
