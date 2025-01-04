import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { BusinessSearch } from "@/components/search/BusinessSearch";
import { LocationSearch } from "@/components/home/LocationSearch";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { AppDownload } from "@/components/home/AppDownload";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import Map from "@/components/Map";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapIcon, ListFilter } from "lucide-react";

const Index = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      {/* Search Section with Map Toggle */}
      <section className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Explore Businesses</h2>
            <Button
              variant="outline"
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2"
            >
              {showMap ? (
                <>
                  <ListFilter className="w-4 h-4" />
                  Show List
                </>
              ) : (
                <>
                  <MapIcon className="w-4 h-4" />
                  Show Map
                </>
              )}
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className={`${showMap ? 'lg:w-1/2' : 'w-full'}`}>
              <BusinessSearch />
            </div>
            
            {showMap && (
              <div className="lg:w-1/2 h-[600px] rounded-lg overflow-hidden shadow-lg">
                <Map />
              </div>
            )}
          </div>
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