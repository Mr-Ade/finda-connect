import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { LocationSearch } from "@/components/home/LocationSearch";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { AppDownload } from "@/components/home/AppDownload";
import { RoomListings } from "@/components/home/RoomListings";
import { RecentListings } from "@/components/home/RecentListings";
import { RecentActivities } from "@/components/home/RecentActivities";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FeaturedBusinesses />
      <PopularCategories />
      <RoomListings />
      <RecentListings />
      <RecentActivities />
      <LocationSearch />
      <CustomerReviews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;