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
import { productHeroImages, productGalleryImages } from "./brandedImages";

const brandedKeyMap: Record<string, string> = Object.fromEntries(
  Object.entries(productHeroImages).map(([slug, src]) => [`branded:${slug}`, src])
);

export const imageMap: Record<string, string> = {
  "collection-1": collection1,
  "collection-2": collection2,
  "collection-3": collection3,
  "collection-4": collection4,
  "lookbook-1": lookbook1,
  "lookbook-2": lookbook2,
  "lookbook-3": lookbook3,
  "product-detail-1": productImg1,
  "product-detail-2": productImg2,
  "product-detail-3": productImg3,
  "product-detail-4": productImg4,
  "craftsmanship-1": craftsmanship1,
  ...brandedKeyMap,
};

export const resolveImage = (img: string): string => {
  if (img.startsWith("http") || img.startsWith("/")) return img;
  return imageMap[img] || img;
};

/** Returns branded gallery for a product slug, or undefined if not branded yet. */
export const getBrandedGallery = (slug: string): string[] | undefined =>
  productGalleryImages[slug];

export type ProductGender = "men" | "women" | "unisex";

export interface Product {
  id: string | number;
  slug: string;
  name: string;
  nameItalic: string;
  price: string;
  originalPrice?: string;
  category: string;
  gender: ProductGender;
  tag: string;
  sizes: string[];
  images: string[];
  colors: { name: string; value: string }[];
  shortDescription: string;
  material: string;
  season: string;
  accordion: { title: string; content: string }[];
}

export const genderLabels: Record<ProductGender, string> = {
  men: "رجالي",
  women: "حريمي",
  unisex: "للجميع",
};

export const categories = ["الكل", "عود", "زهري", "مسك", "شرقي", "بخور", "خشبي"];
export const sortOptions = ["الأحدث", "السعر: الأقل للأعلى", "السعر: الأعلى للأقل", "الأكثر مبيعاً"];

// Fallback static products (used only if DB fetch fails)
const defaultColors = [
  { name: "عنبر", value: "hsl(35, 40%, 35%)" },
  { name: "ذهبي", value: "hsl(42, 60%, 55%)" },
  { name: "أسود", value: "hsl(40, 5%, 8%)" },
  { name: "كريستال", value: "hsl(0, 0%, 90%)" },
];

const defaultAccordion = (productName: string, ingredients: string, origin: string) => [
  { title: "الوصف", content: `${productName} هو تحفة فنية من عالم العطور الفاخرة. مُركّب من أجود ${ingredients}، هذا العطر يأخذك في رحلة حسية فريدة من نوعها.` },
  { title: "المكونات والتركيبة", content: `المكونات الرئيسية: ${ingredients} • التركيز: أو دو بارفان • المنشأ: ${origin} • كل زجاجة مرقمة بشكل فردي.` },
  { title: "الحجم والسعة", content: `متوفر بأحجام متعددة لتناسب احتياجاتك. العطر مركّز بدرجة عالية — بضع رشات كافية ليوم كامل.` },
  { title: "نصائح الاستخدام", content: `يُحفظ في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة • رشّ على نقاط النبض • تجنب فرك العطر بعد الرش.` },
  { title: "الشحن والإرجاع", content: `شحن مجاني سريع على جميع الطلبات فوق ١,٠٠٠ ج.م • تغليف فاخر مع حقيبة مخملية • سياسة إرجاع خلال ٣٠ يوماً.` },
];

export const allProducts: Product[] = [
  { id: 1, slug: "oud-royal", name: "عود ملكي", nameItalic: "ملكي", price: "٤,٢٥٠ ج.م", originalPrice: "٥,٢٥٠ ج.م", category: "عود", gender: "men", tag: "الأكثر مبيعاً", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["oud-royal"], colors: defaultColors, shortDescription: "عود ملكي فاخر مستخلص من أجود أنواع خشب العود الكمبودي.", material: "عود كمبودي طبيعي", season: "٢٠٢٦", accordion: defaultAccordion("عود ملكي", "خشب العود الكمبودي", "القاهرة") },
  { id: 2, slug: "ward-taifi", name: "ورد طائفي", nameItalic: "طائفي", price: "٣,٢٥٠ ج.م", category: "زهري", gender: "women", tag: "جديد", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["ward-taifi"], colors: [{ name: "وردي", value: "hsl(340, 40%, 65%)" }, { name: "ذهبي", value: "hsl(42, 60%, 55%)" }], shortDescription: "عطر ورد طائفي أصيل.", material: "ورد طائفي طبيعي", season: "٢٠٢٦", accordion: defaultAccordion("ورد طائفي", "ورد طائفي أصيل", "القاهرة") },
  { id: 3, slug: "misk-aswad", name: "مسك أسود", nameItalic: "أسود", price: "٤,٧٥٠ ج.م", category: "مسك", gender: "unisex", tag: "الأكثر مبيعاً", sizes: ["٣٠ مل", "٥٠ مل"], images: productGalleryImages["misk-aswad"], colors: [{ name: "أسود", value: "hsl(40, 5%, 8%)" }], shortDescription: "مسك أسود نادر.", material: "مسك أسود نادر", season: "٢٠٢٦", accordion: defaultAccordion("مسك أسود", "مسك أسود", "القاهرة") },
  { id: 4, slug: "amber-nights", name: "ليالي العنبر", nameItalic: "العنبر", price: "٣,٧٥٠ ج.م", category: "شرقي", gender: "unisex", tag: "محدود", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["amber-nights"], colors: [{ name: "عنبر", value: "hsl(35, 40%, 35%)" }], shortDescription: "عطر شرقي فاخر.", material: "عنبر طبيعي", season: "٢٠٢٦", accordion: defaultAccordion("ليالي العنبر", "العنبر الطبيعي", "القاهرة") },
  { id: 5, slug: "bukhoor-elite", name: "بخور النخبة", nameItalic: "النخبة", price: "٢,٧٥٠ ج.م", category: "بخور", gender: "unisex", tag: "رائج", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["bukhoor-elite"], colors: defaultColors, shortDescription: "بخور سائل فاخر.", material: "خلطة بخور فاخرة", season: "٢٠٢٦", accordion: defaultAccordion("بخور النخبة", "خلطة بخور", "القاهرة") },
  { id: 6, slug: "zaafaran-gold", name: "زعفران ذهبي", nameItalic: "ذهبي", price: "٢,٤٠٠ ج.م", category: "شرقي", gender: "men", tag: "عاد للمخزون", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["zaafaran-gold"], colors: [{ name: "ذهبي", value: "hsl(42, 60%, 55%)" }], shortDescription: "عطر بنفحات الزعفران.", material: "زعفران إيراني", season: "٢٠٢٦", accordion: defaultAccordion("زعفران ذهبي", "زعفران إيراني", "القاهرة") },
  { id: 7, slug: "jasmine-blanc", name: "ياسمين أبيض", nameItalic: "أبيض", price: "٢,١٠٠ ج.م", category: "زهري", gender: "women", tag: "جديد", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["jasmine-blanc"], colors: [{ name: "أبيض", value: "hsl(0, 0%, 95%)" }], shortDescription: "ياسمين أبيض نقي.", material: "ياسمين دمشقي", season: "٢٠٢٦", accordion: defaultAccordion("ياسمين أبيض", "ياسمين دمشقي", "القاهرة") },
  { id: 8, slug: "oud-supreme", name: "عود سوبريم", nameItalic: "سوبريم", price: "٦,٠٠٠ ج.م", category: "عود", gender: "men", tag: "جديد", sizes: ["٣٠ مل", "٥٠ مل"], images: productGalleryImages["oud-supreme"], colors: defaultColors, shortDescription: "أفخم أنواع العود المعتّق.", material: "عود هندي معتّق", season: "٢٠٢٦", accordion: defaultAccordion("عود سوبريم", "عود هندي معتّق", "القاهرة") },
  { id: 9, slug: "misk-tahara", name: "مسك الطهارة", nameItalic: "الطهارة", price: "١,٦٠٠ ج.م", category: "مسك", gender: "women", tag: "الأكثر مبيعاً", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["misk-tahara"], colors: [{ name: "أبيض", value: "hsl(0, 0%, 95%)" }], shortDescription: "مسك الطهارة الأصيل.", material: "مسك طبيعي نقي", season: "٢٠٢٦", accordion: defaultAccordion("مسك الطهارة", "مسك أبيض", "القاهرة") },
  { id: 10, slug: "sandal-hind", name: "صندل هندي", nameItalic: "هندي", price: "٢,٩٠٠ ج.م", category: "خشبي", gender: "men", tag: "جديد", sizes: ["٣٠ مل", "٥٠ مل", "١٠٠ مل"], images: productGalleryImages["sandal-hind"], colors: [{ name: "بيج", value: "hsl(35, 30%, 70%)" }], shortDescription: "خشب الصندل الهندي الأصيل.", material: "صندل هندي ميسوري", season: "٢٠٢٦", accordion: defaultAccordion("صندل هندي", "خشب الصندل", "القاهرة") },
  { id: 11, slug: "dehn-ward", name: "دهن ورد", nameItalic: "ورد", price: "٣,٩٠٠ ج.م", category: "زهري", gender: "women", tag: "رائج", sizes: ["٣ مل", "٦ مل", "١٢ مل"], images: productGalleryImages["dehn-ward"], colors: [{ name: "وردي غامق", value: "hsl(340, 50%, 40%)" }], shortDescription: "دهن ورد طائفي مركّز.", material: "دهن ورد طائفي", season: "٢٠٢٦", accordion: defaultAccordion("دهن ورد", "دهن ورد", "القاهرة") },
  { id: 12, slug: "layali-sharqiya", name: "ليالي شرقية", nameItalic: "شرقية", price: "٤,٤٥٠ ج.م", originalPrice: "٥,٥٠٠ ج.م", category: "شرقي", gender: "unisex", tag: "محدود", sizes: ["٣٠ مل", "٥٠ مل"], images: productGalleryImages["layali-sharqiya"], colors: [{ name: "بنفسجي", value: "hsl(280, 30%, 25%)" }], shortDescription: "ليالي شرقية الحصري.", material: "تركيبة شرقية", season: "٢٠٢٦", accordion: defaultAccordion("ليالي شرقية", "العود مع العنبر", "القاهرة") },
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return allProducts.slice(0, limit);
  const sameCategory = allProducts.filter((p) => p.slug !== currentSlug && p.category === current.category);
  const others = allProducts.filter((p) => p.slug !== currentSlug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
