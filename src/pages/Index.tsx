import { Hero } from "@/components/home/Hero";
import { OffersSection } from "@/components/home/OffersSection";
import { RecentListings } from "@/components/home/RecentListings";
import { PopularCategories } from "@/components/home/PopularCategories";
import { LocationSearch } from "@/components/home/LocationSearch";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { AiChat } from "@/components/AiChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <AiChat />
      <OffersSection />
      <RecentListings />
      <PopularCategories />
      <LocationSearch />
      <CustomerReviews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;