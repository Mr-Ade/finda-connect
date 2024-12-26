import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/home/Hero";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { PopularCategories } from "@/components/home/PopularCategories";
import { ListingCTA } from "@/components/home/ListingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FeaturedBusinesses />
      <PopularCategories />
      <ListingCTA />
    </div>
  );
};

export default Index;