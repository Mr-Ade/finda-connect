import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { BusinessSearch } from "@/components/search/BusinessSearch";
import { LocationSearch } from "@/components/home/LocationSearch";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { AppDownload } from "@/components/home/AppDownload";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <BusinessSearch />
        </div>
      </section>
      <PopularCategories />
      <LocationSearch />
      <CustomerReviews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;