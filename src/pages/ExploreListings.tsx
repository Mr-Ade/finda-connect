import { useState } from "react";
import { Map } from "@/components/Map";
import { SearchFilters } from "@/components/search/SearchFilters";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { CategoryFilters } from "@/components/search/CategoryFilters";

const ExploreListings = () => {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Filters */}
      <CategoryFilters />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-1/4">
              <SearchFilters />
            </div>

            {/* Listings Grid */}
            <div className="w-full lg:w-3/4">
              <ListingGrid 
                showMap={showMap} 
                onToggleMap={() => setShowMap(!showMap)} 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreListings;