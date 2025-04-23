
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedLaureates from "@/components/home/FeaturedLaureates";
import EducationalResources from "@/components/home/EducationalResources";
import StatisticsSection from "@/components/home/StatisticsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatisticsSection />
        <Categories />
        <FeaturedLaureates />
        <EducationalResources />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
