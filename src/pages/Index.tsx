import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/home/Hero";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { PopularCategories } from "@/components/home/PopularCategories";
import { ListingCTA } from "@/components/home/ListingCTA";
import { OffersSection } from "@/components/home/OffersSection";
import { RecentListings } from "@/components/home/RecentListings";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <OffersSection />
      <RecentListings />
      <FeaturedBusinesses />
      <PopularCategories />
      <ListingCTA />
    </div>
  );
};

export default Index;