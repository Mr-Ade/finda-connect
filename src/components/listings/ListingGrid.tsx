import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ListingCard } from "@/components/home/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { MapIcon, List } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Business } from "@/types/business";

interface ListingGridProps {
  showMap: boolean;
  onToggleMap: () => void;
  isLoading?: boolean;
  businesses?: Business[];
}

export const ListingGrid = ({ showMap, onToggleMap, isLoading, businesses }: ListingGridProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Explore Listings</h2>
        <Button
          variant="outline"
          onClick={onToggleMap}
        >
          {showMap ? (
            <>
              <List className="w-4 h-4 mr-2" />
              Show List
            </>
          ) : (
            <>
              <MapIcon className="w-4 h-4 mr-2" />
              Show Map
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full" />
          ))}
        </div>
      ) : !businesses?.length ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No listings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => {
            // Transform the data to match our Business type
            const transformedBusiness: Business = {
              ...business,
              business_hours: business.business_hours as Business['business_hours'],
              amenities: business.amenities as Business['amenities'],
              faqs: business.faqs as Business['faqs'],
              delivery_info: business.delivery_info as Business['delivery_info'],
              social_links: business.social_links as Business['social_links']
            };
            return <ListingCard key={business.id} business={transformedBusiness} />;
          })}
        </div>
      )}
    </div>
  );
};