import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { LocationSearch } from "@/components/home/LocationSearch";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { AppDownload } from "@/components/home/AppDownload";
import { RoomListings } from "@/components/home/RoomListings";
import { RecentListings } from "@/components/home/RecentListings";
import { RecentActivities } from "@/components/home/RecentActivities";
import { MainLayout } from "@/components/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedBusinesses />
      <PopularCategories />
      <RoomListings />
      <LocationSearch />
      <CustomerReviews />
      <RecentListings />
      <RecentActivities />
      <AppDownload />
    </MainLayout>
  );
};

export default Index;