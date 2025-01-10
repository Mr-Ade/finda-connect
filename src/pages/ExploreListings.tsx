import { useState, useEffect } from "react";
import { Map } from "@/components/Map";
import { SearchFilters } from "@/components/search/SearchFilters";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { CategoryFilters } from "@/components/search/CategoryFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

const ExploreListings = () => {
  const [showMap, setShowMap] = useState(true);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const category = searchParams.get('category');

  // Real-time subscription setup
  useEffect(() => {
    const channel = supabase
      .channel('public:businesses')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'businesses'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          // Invalidate and refetch data
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch businesses with filters
  const { data: businesses, isLoading, error, refetch } = useQuery({
    queryKey: ['businesses', category],
    queryFn: async () => {
      console.log('Fetching businesses with category:', category);
      
      let query = supabase
        .from('businesses')
        .select(`
          *,
          business_photos (
            photo_url
          ),
          reviews (
            rating
          )
        `);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching businesses:', error);
        toast({
          title: "Error loading listings",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data as Business[];
    },
  });

  if (error) {
    console.error('Error in businesses query:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryFilters />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className={`flex ${showMap ? 'flex-row' : 'flex-col'} gap-6 relative min-h-[800px]`}>
            {/* Filters Sidebar */}
            <div className={`${showMap ? 'w-1/4' : 'w-full lg:w-1/4'}`}>
              <SearchFilters />
            </div>

            {/* Main Content Area */}
            <div className={`${showMap ? 'w-3/4' : 'w-full lg:w-3/4'} flex flex-col`}>
              <ListingGrid 
                showMap={showMap} 
                onToggleMap={() => setShowMap(!showMap)}
                isLoading={isLoading}
                businesses={businesses}
              />
            </div>

            {/* Map Section */}
            {showMap && (
              <div className="fixed top-[200px] right-0 w-1/2 bottom-0 z-10">
                <Map 
                  markers={businesses?.map(business => ({
                    lat: Number(business.latitude) || 0,
                    lng: Number(business.longitude) || 0
                  }))}
                  className="h-full rounded-l-xl shadow-xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreListings;