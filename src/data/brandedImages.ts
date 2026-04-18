// Shazaya signature bottles — the visual DNA of the brand.
// Six master bottle silhouettes, each photographed with cinematic lighting
// against deep obsidian. The Shazaya logo is engraved (frosted) on the glass.

import bottle01 from "@/assets/bottles/bottle-01-square-gold.jpg";
import bottle02 from "@/assets/bottles/bottle-02-cylinder-black.jpg";
import bottle03 from "@/assets/bottles/bottle-03-dome-black.jpg";
import bottle04 from "@/assets/bottles/bottle-04-cube-rosegold.jpg";
import bottle05 from "@/assets/bottles/bottle-05-teardrop-blue.jpg";
import bottle06 from "@/assets/bottles/bottle-06-slim-gold.jpg";

import lookbookMan1 from "@/assets/lookbook-man-1.jpg";
import lookbookMan2 from "@/assets/lookbook-man-2.jpg";
import heroShazaya from "@/assets/hero-shazaya.jpg";

import categoryOud from "@/assets/category-oud.jpg";
import categoryFloral from "@/assets/collection-3.jpg";
import categoryOriental from "@/assets/category-oriental.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

/** Bottle shape identifier — the brand's six master silhouettes. */
export type BottleShapeId =
  | "square-gold"
  | "cylinder-black"
  | "dome-black"
  | "cube-rosegold"
  | "teardrop-blue"
  | "slim-gold";

export interface BottleShape {
  id: BottleShapeId;
  name: string;          // Arabic display name
  description: string;   // short tagline
  image: string;
  availableSizes: string[]; // sizes this physical bottle is offered in
}

/** The six signature Shazaya bottles — every product ships in one of these. */
export const bottleShapes: BottleShape[] = [
  {
    id: "square-gold",
    name: "الكلاسيك الذهبي",
    description: "زجاج مربع فاخر بقمة كريستال ذهبية مزخرفة",
    image: bottle01,
    availableSizes: ["٥٠ مل", "١٠٠ مل"],
  },
  {
    id: "cylinder-black",
    name: "الأسطوانة السوداء",
    description: "أسطوانة كلاسيكية بغطاء أسود لامع",
    image: bottle02,
    availableSizes: ["٥٠ مل", "١٠٠ مل"],
  },
  {
    id: "dome-black",
    name: "القبة الأنيقة",
    description: "تصميم قبّة مدمجة بغطاء أسود مزدوج",
    image: bottle03,
    availableSizes: ["٣٠ مل", "٥٠ مل"],
  },
  {
    id: "cube-rosegold",
    name: "المكعّب الوردي",
    description: "زجاج مكعّب بكرة ذهبية وردية لامعة",
    image: bottle04,
    availableSizes: ["٥٠ مل"],
  },
  {
    id: "teardrop-blue",
    name: "اللؤلؤة الزرقاء",
    description: "زجاج كوبالت أزرق بغطاء كريستال متعدد الأوجه",
    image: bottle05,
    availableSizes: ["٣٠ مل"],
  },
  {
    id: "slim-gold",
    name: "السفير الذهبي",
    description: "زجاج رفيع للسفر بغطاء ذهبي مرآة",
    image: bottle06,
    availableSizes: ["١٠ مل", "١٢ مل"],
  },
];

/** Quick lookup: shape id → image. */
export const bottleImageByShape: Record<BottleShapeId, string> =
  Object.fromEntries(bottleShapes.map((b) => [b.id, b.image])) as Record<BottleShapeId, string>;

/** Quick lookup: shape id → full BottleShape. */
export const getBottleShape = (id: BottleShapeId): BottleShape | undefined =>
  bottleShapes.find((b) => b.id === id);

/**
 * Hero product image keyed by slug.
 * Each product now points to one of the six master bottles —
 * this is the brand identity. The fragrance changes; the vessel is iconic.
 */
export const productHeroImages: Record<string, string> = {
  "oud-royal": bottle01,        // square gold — flagship
  "ward-taifi": bottle04,       // rose-gold cube — feminine floral
  "misk-aswad": bottle02,       // black cylinder — bold musk
  "amber-nights": bottle01,     // square gold — oriental amber
  "bukhoor-elite": bottle03,    // black dome — incense
  "zaafaran-gold": bottle04,    // rose-gold cube — saffron
  "jasmine-blanc": bottle05,    // blue teardrop — white jasmine
  "oud-supreme": bottle01,      // square gold — supreme oud
  "misk-tahara": bottle03,      // black dome — pure musk
  "sandal-hind": bottle02,      // black cylinder — sandalwood
  "dehn-ward": bottle06,        // slim gold — concentrated rose oil
  "layali-sharqiya": bottle05,  // blue teardrop — oriental nights
};

/** Map each product slug to its default bottle shape. */
export const productDefaultShape: Record<string, BottleShapeId> = {
  "oud-royal": "square-gold",
  "ward-taifi": "cube-rosegold",
  "misk-aswad": "cylinder-black",
  "amber-nights": "square-gold",
  "bukhoor-elite": "dome-black",
  "zaafaran-gold": "cube-rosegold",
  "jasmine-blanc": "teardrop-blue",
  "oud-supreme": "square-gold",
  "misk-tahara": "dome-black",
  "sandal-hind": "cylinder-black",
  "dehn-ward": "slim-gold",
  "layali-sharqiya": "teardrop-blue",
};

/**
 * Detail/gallery images per slug — the bottle hero plus contextual lookbook shots.
 * The first image is always the bottle itself.
 */
export const productGalleryImages: Record<string, string[]> = Object.fromEntries(
  Object.entries(productHeroImages).map(([slug, hero]) => [
    slug,
    [hero, lookbookMan1, lookbookMan2, hero],
  ])
);

export const brandLookbook = {
  man1: lookbookMan1,
  man2: lookbookMan2,
  hero: heroShazaya,
};

export const brandCategories = {
  oud: categoryOud,
  floral: categoryFloral,
  oriental: categoryOriental,
  gifts: categoryGifts,
};
