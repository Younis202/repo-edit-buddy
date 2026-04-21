// Branded Shazaya product imagery — unified visual identity:
// dark obsidian backdrops, cinematic gold lighting, raw natural ingredients,
// ornate Arabian crystal bottles. Every product slug → its hero image.

import oudRoyal from "@/assets/products/oud-royal-1.jpg";
import wardTaifi from "@/assets/products/ward-taifi-1.jpg";
import miskAswad from "@/assets/products/misk-aswad-1.jpg";
import amberNights from "@/assets/products/amber-nights-1.jpg";
import bukhoorElite from "@/assets/products/bukhoor-elite-1.jpg";
import zaafaranGold from "@/assets/products/zaafaran-gold-1.jpg";
import jasmineBlanc from "@/assets/products/jasmine-blanc-1.jpg";
import oudSupreme from "@/assets/products/oud-supreme-1.jpg";
import miskTahara from "@/assets/products/misk-tahara-1.jpg";
import sandalHind from "@/assets/products/sandal-hind-1.jpg";
import dehnWard from "@/assets/products/dehn-ward-1.jpg";
import layaliSharqiya from "@/assets/products/layali-sharqiya-1.jpg";
import discoverySet from "@/assets/discovery/discovery-pack-hero.jpg";
import discoveryVial from "@/assets/discovery/discovery-vial.jpg";
import discoveryLifestyle from "@/assets/discovery/discovery-lifestyle.jpg";

import lookbookMan1 from "@/assets/lookbook-man-1.jpg";
import lookbookMan2 from "@/assets/lookbook-man-2.jpg";
import heroShazaya from "@/assets/hero-shazaya.jpg";

import categoryOud from "@/assets/category-oud.jpg";
import categoryFloral from "@/assets/collection-3.jpg";
import categoryOriental from "@/assets/category-oriental.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

/** Hero product image keyed by slug. */
export const productHeroImages: Record<string, string> = {
  "oud-royal": oudRoyal,
  "ward-taifi": wardTaifi,
  "misk-aswad": miskAswad,
  "amber-nights": amberNights,
  "bukhoor-elite": bukhoorElite,
  "zaafaran-gold": zaafaranGold,
  "jasmine-blanc": jasmineBlanc,
  "oud-supreme": oudSupreme,
  "misk-tahara": miskTahara,
  "sandal-hind": sandalHind,
  "dehn-ward": dehnWard,
  "layali-sharqiya": layaliSharqiya,
  "discovery-set": discoverySet,
  "discovery-vial": discoveryVial,
  "discovery-lifestyle": discoveryLifestyle,
};

/** Detail/gallery images per slug — uses hero + a curated set of contextual shots. */
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
