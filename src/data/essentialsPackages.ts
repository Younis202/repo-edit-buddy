// العبوات الاقتصادية — packaging options (NOT products).
// العميل يختار نوع العبوة هنا ثم يختار العطر اللي يتحط فيها من أي منتج في المتجر.
import productPocketOil from "@/assets/essentials/product-pocket-oil.jpg";
import productSprayClassic from "@/assets/essentials/product-spray-classic.jpg";
import productSpraySignature from "@/assets/essentials/product-spray-signature.jpg";

export interface PackageVariant {
  /** معرف فريد للحجم (مستخدم للسلة) */
  id: string;
  /** الحجم بالعربي مع الوحدة — مثلاً "٤ جرام" */
  label: string;
  /** السعر بالأرقام */
  price: number;
  /** السعر للعرض بالعربي */
  priceDisplay: string;
  /** الحد الأدنى للكمية اللي يلزم العميل يطلبها */
  minQty: number;
}

export interface EssentialsPackage {
  /** معرف فريد للعبوة */
  id: "pocket-oil" | "spray-classic" | "spray-signature";
  /** اسم العبوة بالعربي */
  name: string;
  /** اسم بالإنجليزي للعرض */
  italic: string;
  /** نوع العبوة */
  type: "oil" | "spray";
  /** وصف قصير */
  desc: string;
  /** قصة العبوة */
  story: string;
  /** صورة العبوة */
  image: string;
  /** tag بسيط للعرض */
  tag: string;
  /** الأحجام المتاحة */
  variants: PackageVariant[];
  /** فوائد العبوة */
  benefits: string[];
}

export const essentialsPackages: EssentialsPackage[] = [
  {
    id: "pocket-oil",
    name: "بلية الزيت الخام",
    italic: "Pocket Oil",
    type: "oil",
    tag: "الأكثر طلباً",
    desc: "بلية زيت عطري خام مركّز بدون كحول — قطرة واحدة تكفي ليوم كامل.",
    story:
      "الزيت الخام هو روح العطر في أنقى صوره. بدون كحول، بدون إضافات — فقط زيت عطري عالي التركيز يدوم على بشرتك من ٨ إلى ١٢ ساعة.",
    image: productPocketOil,
    variants: [
      { id: "oil-4g", label: "٤ جرام", price: 199, priceDisplay: "١٩٩", minQty: 4 },
      { id: "oil-6g", label: "٦ جرام", price: 279, priceDisplay: "٢٧٩", minQty: 3 },
      { id: "oil-8g", label: "٨ جرام", price: 349, priceDisplay: "٣٤٩", minQty: 2 },
    ],
    benefits: ["بدون كحول", "تركيز ١٠٠٪", "ثبات ١٢ ساعة"],
  },
  {
    id: "spray-classic",
    name: "الرشاش الكلاسيكي",
    italic: "Classic Spray",
    type: "spray",
    tag: "الأكثر مبيعاً",
    desc: "عبوة رشاش بتصميم نحيف أنيق — توزيع متجانس ولمسة فاخرة في كل رشة.",
    story:
      "تصميم نحيف يحمل قوة شذايا. عبوة كلاسيكية بنوزل دقيق لتوزيع متساوٍ، تناسب الاستخدام اليومي والمناسبات الخاصة.",
    image: productSprayClassic,
    variants: [
      { id: "classic-50", label: "٥٠ مل", price: 299, priceDisplay: "٢٩٩", minQty: 1 },
      { id: "classic-100", label: "١٠٠ مل", price: 499, priceDisplay: "٤٩٩", minQty: 1 },
    ],
    benefits: ["ثبات ٨ ساعات", "نوزل دقيق", "تركيبة كحولية"],
  },
  {
    id: "spray-signature",
    name: "رشاش التوقيع",
    italic: "Signature Spray",
    type: "spray",
    tag: "توقيع شذايا",
    desc: "عبوة رشاش بتصميم عريض راقي — يجمع بين القوة البصرية والأناقة.",
    story:
      "التوقيع الكامل لشذايا في عبوة عريضة فاخرة. تركيبة شرقية أصيلة تترك أثراً لا يُنسى.",
    image: productSpraySignature,
    variants: [
      { id: "signature-50", label: "٥٠ مل", price: 329, priceDisplay: "٣٢٩", minQty: 1 },
      { id: "signature-100", label: "١٠٠ مل", price: 549, priceDisplay: "٥٤٩", minQty: 1 },
    ],
    benefits: ["ثبات ١٠ ساعات", "أنف شرقي", "هدية مثالية"],
  },
];

export const getPackageById = (id: string): EssentialsPackage | undefined =>
  essentialsPackages.find((p) => p.id === id);

export const getPackageVariant = (
  packageId: string,
  variantId: string
): { pkg: EssentialsPackage; variant: PackageVariant } | undefined => {
  const pkg = getPackageById(packageId);
  if (!pkg) return undefined;
  const variant = pkg.variants.find((v) => v.id === variantId);
  if (!variant) return undefined;
  return { pkg, variant };
};
