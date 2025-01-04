import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ListingCard } from "@/components/home/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { MapIcon, List } from "lucide-react";

interface ListingGridProps {
  showMap: boolean;
  onToggleMap: () => void;
}

export const ListingGrid = ({ showMap, onToggleMap }: ListingGridProps) => {
  const { data: businesses, isLoading } = useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos (photo_url),
          reviews (rating)
        `);

      if (error) throw error;
      return data;
    }
  });

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
        <div className="text-center py-8">Loading listings...</div>
      ) : !businesses?.length ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No listings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <ListingCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
};