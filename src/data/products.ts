import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import productImg1 from "@/assets/product-detail-1.jpg";
import productImg2 from "@/assets/product-detail-2.jpg";
import productImg3 from "@/assets/product-detail-3.jpg";
import productImg4 from "@/assets/product-detail-4.jpg";
import craftsmanship1 from "@/assets/craftsmanship-1.jpg";

export interface Product {
  id: number;
  slug: string;
  name: string;
  nameItalic: string; // the italic word in the display title
  price: string;
  originalPrice?: string;
  category: string;
  tag: string;
  sizes: string[];
  images: string[];
  colors: { name: string; value: string }[];
  shortDescription: string;
  material: string;
  season: string;
  accordion: { title: string; content: string }[];
}

const defaultColors = [
  { name: "Charcoal", value: "hsl(40, 5%, 15%)" },
  { name: "Camel", value: "hsl(35, 40%, 55%)" },
  { name: "Navy", value: "hsl(220, 30%, 20%)" },
  { name: "Ivory", value: "hsl(40, 30%, 88%)" },
];

const defaultAccordion = (productName: string, material: string, origin: string) => [
  {
    title: "Description",
    content: `The ${productName} is a cornerstone of the MAISON wardrobe. Crafted from the finest ${material}, this piece is engineered for both comfort and refined style. The silhouette drapes naturally, while the construction ensures the piece maintains its shape season after season.`,
  },
  {
    title: "Materials & Composition",
    content: `Primary: ${material} • Lining: 100% Cupro Bemberg • Hardware: Brushed antique finish • Origin: ${origin} • Each garment is individually numbered.`,
  },
  {
    title: "Size & Fit",
    content: `Regular fit — we recommend ordering your usual size. Model is 6'1\" / 186cm and wears size M. For a more tailored look, consider sizing down. Complimentary alterations available at any MAISON boutique.`,
  },
  {
    title: "Care Instructions",
    content: `Dry clean recommended • Store properly when not in use • Steam rather than iron • Allow garments to rest between wears. Complimentary care services available at any MAISON boutique.`,
  },
  {
    title: "Shipping & Returns",
    content: `Complimentary express shipping on all orders • Signature packaging with dust bag included • 30-day return policy — items must be unworn with tags attached • Free pickup for returns • International duties & taxes included in price.`,
  },
];

export const allProducts: Product[] = [
  {
    id: 1,
    slug: "the-overcoat",
    name: "The Overcoat",
    nameItalic: "Overcoat",
    price: "$2,450",
    originalPrice: "$2,900",
    category: "Outerwear",
    tag: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    images: [collection1, productImg2, productImg3, productImg4],
    colors: defaultColors,
    shortDescription: "Impeccably tailored from double-faced Loro Piana wool, this signature overcoat is the quiet centerpiece of every wardrobe. Built to last generations.",
    material: "Italian Virgin Wool",
    season: "SS26",
    accordion: defaultAccordion("Overcoat", "double-faced Italian virgin wool sourced from Loro Piana mills", "Handcrafted in Florence, Italy"),
  },
  {
    id: 2,
    slug: "ivory-cable-knit",
    name: "Ivory Cable Knit",
    nameItalic: "Cable Knit",
    price: "$890",
    category: "Knitwear",
    tag: "New",
    sizes: ["XS", "S", "M", "L"],
    images: [collection2, productImg1, productImg3, craftsmanship1],
    colors: [
      { name: "Ivory", value: "hsl(40, 30%, 88%)" },
      { name: "Charcoal", value: "hsl(40, 5%, 15%)" },
      { name: "Oatmeal", value: "hsl(35, 25%, 70%)" },
    ],
    shortDescription: "Hand-knitted from Mongolian cashmere with a heritage cable pattern. Unrivaled softness that only improves with each wear.",
    material: "Mongolian Cashmere",
    season: "AW25",
    accordion: defaultAccordion("Ivory Cable Knit", "100% grade-A Mongolian cashmere, hand-knitted", "Handcrafted in Scotland"),
  },
  {
    id: 3,
    slug: "midnight-suit",
    name: "Midnight Suit",
    nameItalic: "Suit",
    price: "$3,200",
    category: "Tailoring",
    tag: "Best Seller",
    sizes: ["S", "M", "L"],
    images: [collection3, productImg2, lookbook1, productImg4],
    colors: [
      { name: "Midnight", value: "hsl(220, 30%, 12%)" },
      { name: "Charcoal", value: "hsl(40, 5%, 15%)" },
      { name: "Navy", value: "hsl(220, 30%, 20%)" },
    ],
    shortDescription: "Cut from Super 150s wool with a half-canvas construction. The definitive evening suit — sharp, silent, commanding.",
    material: "Super 150s Wool",
    season: "SS26",
    accordion: defaultAccordion("Midnight Suit", "Super 150s Italian wool with full Bemberg lining", "Handcrafted in Naples, Italy"),
  },
  {
    id: 4,
    slug: "chelsea-boots",
    name: "Chelsea Boots",
    nameItalic: "Boots",
    price: "$1,150",
    category: "Accessories",
    tag: "Limited",
    sizes: ["40", "41", "42", "43", "44"],
    images: [collection4, craftsmanship1, productImg3, productImg1],
    colors: [
      { name: "Black", value: "hsl(40, 5%, 8%)" },
      { name: "Cognac", value: "hsl(25, 50%, 35%)" },
      { name: "Dark Brown", value: "hsl(25, 30%, 20%)" },
    ],
    shortDescription: "Full-grain calfskin leather with a Goodyear-welted sole. A timeless silhouette refined over three decades of cobbling tradition.",
    material: "Full-Grain Calfskin",
    season: "AW25",
    accordion: defaultAccordion("Chelsea Boots", "full-grain calfskin leather with leather sole", "Handcrafted in Northampton, England"),
  },
  {
    id: 5,
    slug: "charcoal-blazer",
    name: "Charcoal Blazer",
    nameItalic: "Blazer",
    price: "$1,890",
    category: "Tailoring",
    tag: "Trending",
    sizes: ["S", "M", "L", "XL"],
    images: [lookbook1, collection3, productImg2, productImg4],
    colors: defaultColors,
    shortDescription: "A modern take on the classic blazer. Half-lined for breathability, with a natural shoulder and slim patch pockets.",
    material: "Wool-Silk Blend",
    season: "SS26",
    accordion: defaultAccordion("Charcoal Blazer", "wool-silk blend with half lining", "Handcrafted in Milan, Italy"),
  },
  {
    id: 6,
    slug: "slim-wool-trousers",
    name: "Slim Wool Trousers",
    nameItalic: "Trousers",
    price: "$680",
    category: "Tailoring",
    tag: "Restocked",
    sizes: ["28", "30", "32", "34", "36"],
    images: [lookbook2, productImg1, collection3, productImg3],
    colors: [
      { name: "Charcoal", value: "hsl(40, 5%, 15%)" },
      { name: "Navy", value: "hsl(220, 30%, 20%)" },
      { name: "Stone", value: "hsl(40, 15%, 60%)" },
    ],
    shortDescription: "Slim-cut trousers in worsted wool with a permanent crease. The foundation of every considered outfit.",
    material: "Worsted Wool",
    season: "SS26",
    accordion: defaultAccordion("Slim Wool Trousers", "worsted wool with curtain waistband", "Handcrafted in Portugal"),
  },
  {
    id: 7,
    slug: "merino-polo",
    name: "Merino Polo",
    nameItalic: "Polo",
    price: "$420",
    category: "Knitwear",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
    images: [lookbook3, collection2, productImg1, craftsmanship1],
    colors: [
      { name: "Black", value: "hsl(40, 5%, 8%)" },
      { name: "Ivory", value: "hsl(40, 30%, 88%)" },
      { name: "Forest", value: "hsl(150, 20%, 20%)" },
      { name: "Burgundy", value: "hsl(345, 40%, 25%)" },
    ],
    shortDescription: "Extra-fine merino with a Johnny collar and ribbed hem. Effortless layering for every season.",
    material: "Extra-Fine Merino",
    season: "SS26",
    accordion: defaultAccordion("Merino Polo", "100% extra-fine merino wool, 18.5 micron", "Knitted in Biella, Italy"),
  },
  {
    id: 8,
    slug: "double-breasted-coat",
    name: "Double-Breasted Coat",
    nameItalic: "Coat",
    price: "$2,890",
    category: "Outerwear",
    tag: "New",
    sizes: ["M", "L", "XL"],
    images: [productImg1, collection1, productImg3, productImg4],
    colors: defaultColors,
    shortDescription: "A commanding double-breasted silhouette in heavyweight wool. Peak lapels, horn buttons, and a belted back for dramatic flair.",
    material: "Heavyweight Italian Wool",
    season: "AW25",
    accordion: defaultAccordion("Double-Breasted Coat", "heavyweight Italian wool with satin lining", "Handcrafted in Florence, Italy"),
  },
  {
    id: 9,
    slug: "cashmere-scarf",
    name: "Cashmere Scarf",
    nameItalic: "Scarf",
    price: "$340",
    category: "Accessories",
    tag: "Best Seller",
    sizes: ["One Size"],
    images: [productImg2, craftsmanship1, collection2, lookbook3],
    colors: [
      { name: "Camel", value: "hsl(35, 40%, 55%)" },
      { name: "Charcoal", value: "hsl(40, 5%, 15%)" },
      { name: "Ivory", value: "hsl(40, 30%, 88%)" },
      { name: "Burgundy", value: "hsl(345, 40%, 25%)" },
    ],
    shortDescription: "Woven from the finest Inner Mongolian cashmere. Featherlight warmth with hand-rolled edges and a subtle tonal monogram.",
    material: "Inner Mongolian Cashmere",
    season: "AW25",
    accordion: defaultAccordion("Cashmere Scarf", "100% Inner Mongolian cashmere, hand-finished", "Handcrafted in Como, Italy"),
  },
  {
    id: 10,
    slug: "linen-shirt",
    name: "Linen Shirt",
    nameItalic: "Shirt",
    price: "$520",
    category: "Tailoring",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
    images: [productImg3, lookbook2, collection3, productImg1],
    colors: [
      { name: "White", value: "hsl(0, 0%, 95%)" },
      { name: "Sky", value: "hsl(200, 30%, 75%)" },
      { name: "Sand", value: "hsl(35, 30%, 70%)" },
    ],
    shortDescription: "Washed Belgian linen with mother-of-pearl buttons. The perfect warm-weather shirt — crisp yet relaxed.",
    material: "Belgian Linen",
    season: "SS26",
    accordion: defaultAccordion("Linen Shirt", "100% Belgian linen with mother-of-pearl buttons", "Handcrafted in Portugal"),
  },
  {
    id: 11,
    slug: "suede-loafers",
    name: "Suede Loafers",
    nameItalic: "Loafers",
    price: "$780",
    category: "Accessories",
    tag: "Trending",
    sizes: ["40", "41", "42", "43", "44"],
    images: [productImg4, collection4, craftsmanship1, productImg2],
    colors: [
      { name: "Tobacco", value: "hsl(30, 40%, 35%)" },
      { name: "Navy", value: "hsl(220, 30%, 20%)" },
      { name: "Black", value: "hsl(40, 5%, 8%)" },
    ],
    shortDescription: "Unlined suede loafers with a Blake-stitched leather sole. Italian craftsmanship at its most understated.",
    material: "Italian Suede",
    season: "SS26",
    accordion: defaultAccordion("Suede Loafers", "Italian suede with Blake-stitched leather sole", "Handcrafted in Tuscany, Italy"),
  },
  {
    id: 12,
    slug: "heritage-peacoat",
    name: "Heritage Peacoat",
    nameItalic: "Peacoat",
    price: "$2,100",
    originalPrice: "$2,600",
    category: "Outerwear",
    tag: "Limited",
    sizes: ["S", "M", "L"],
    images: [craftsmanship1, collection1, productImg1, productImg4],
    colors: [
      { name: "Navy", value: "hsl(220, 30%, 15%)" },
      { name: "Charcoal", value: "hsl(40, 5%, 15%)" },
    ],
    shortDescription: "A reinterpretation of the classic naval peacoat. Melton wool, anchor-embossed buttons, and a storm flap for heritage appeal.",
    material: "Melton Wool",
    season: "AW25",
    accordion: defaultAccordion("Heritage Peacoat", "Melton wool with quilted lining", "Handcrafted in London, England"),
  },
];

export const categories = ["All", "Outerwear", "Knitwear", "Tailoring", "Accessories"];
export const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Best Sellers"];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return allProducts.slice(0, limit);
  
  // Prioritize same category, then others
  const sameCategory = allProducts.filter((p) => p.slug !== currentSlug && p.category === current.category);
  const others = allProducts.filter((p) => p.slug !== currentSlug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
