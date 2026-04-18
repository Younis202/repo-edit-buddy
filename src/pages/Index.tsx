import { useState, useCallback } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { useJsonLd } from "@/hooks/useJsonLd";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import SizeGuideStrip from "@/components/SizeGuideStrip";
import CollectionGrid from "@/components/CollectionGrid";
import BestSellersStrip from "@/components/BestSellersStrip";
import CategoryScroll from "@/components/CategoryScroll";
import ShopTheLook from "@/components/ShopTheLook";
import LookbookSection from "@/components/LookbookSection";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import StatementSection from "@/components/StatementSection";
import AboutSection from "@/components/AboutSection";
import PressSection from "@/components/PressSection";
import SocialFeedSection from "@/components/SocialFeedSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import WaveDivider from "@/components/WaveDivider";

const Index = () => {
  usePageSEO({ title: "", description: "شذايا — براند عطور فاخرة مصري. أجود أنواع العود والمسك والورد الطائفي. تسوق الآن واستمتع بشحن مجاني." });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "شذايا",
    alternateName: "Shazaya",
    url: "https://shathaya.com",
    description: "براند عطور فاخرة مصري — عود، مسك، ورد طائفي وعنبر",
    sameAs: [
      "https://instagram.com/shazaya",
      "https://facebook.com/shazaya",
      "https://tiktok.com/@shazaya",
    ],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      {!isLoaded && <Preloader onComplete={handleLoadComplete} />}
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />
          <HeroSection />
          <MarqueeBanner />
          <SizeGuideStrip />
          <WaveDivider variant="mist" />
          <CollectionGrid />
          <BestSellersStrip />
          <WaveDivider variant="subtle" />
          <CategoryScroll />
          <ShopTheLook />
          <WaveDivider variant="gold" />
          <LookbookSection />
          <CraftsmanshipSection />
          <StatementSection />
          <WaveDivider variant="mist" flip />
          <AboutSection />
          <PressSection />
          <SocialFeedSection />
          <WaveDivider variant="gold" flip />
          <NewsletterSection />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Index;
