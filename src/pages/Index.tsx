import { Hero } from "@/components/home/Hero";
import { LocationSearch } from "@/components/home/LocationSearch";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { RecentListings } from "@/components/home/RecentListings";
import { RoomListings } from "@/components/home/RoomListings";
import { TopLocations } from "@/components/home/TopLocations";
import { AppDownload } from "@/components/home/AppDownload";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Roadmap } from "@/components/home/Roadmap";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <LocationSearch />
      <PopularCategories />
      <FeaturedBusinesses />
      <CustomerReviews />
      <RecentListings />
      <RoomListings />
      <TopLocations />
      <Roadmap />
      <AppDownload />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;