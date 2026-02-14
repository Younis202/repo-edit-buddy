import { useState, useCallback } from "react";
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

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      {!isLoaded && <Preloader onComplete={handleLoadComplete} />}
      <SmoothScroll>
        <main className="bg-background min-h-screen cursor-none md:cursor-none">
          <Navbar />
          <HeroSection />
          <MarqueeBanner />
          <SizeGuideStrip />
          <CollectionGrid />
          <BestSellersStrip />
          <CategoryScroll />
          <ShopTheLook />
          <LookbookSection />
          <CraftsmanshipSection />
          <StatementSection />
          <AboutSection />
          <PressSection />
          <SocialFeedSection />
          <NewsletterSection />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Index;
