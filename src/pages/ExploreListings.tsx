import { useState, useEffect } from "react";
import { Map } from "@/components/Map";
import { SearchFilters } from "@/components/search/SearchFilters";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { CategoryFilters } from "@/components/search/CategoryFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { Business } from "@/types/business";

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
            id,
            photo_url,
            caption,
            order_index
          ),
          reviews:business_reviews (
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

      // Transform the data to match our Business type
      const transformedData: Business[] = data.map(business => ({
        ...business,
        business_hours: business.business_hours ? 
          (typeof business.business_hours === 'string' ? 
            JSON.parse(business.business_hours) : 
            business.business_hours) as BusinessHour[],
        amenities: business.amenities ? 
          (typeof business.amenities === 'string' ? 
            JSON.parse(business.amenities) : 
            business.amenities) : {},
        faqs: business.faqs ? 
          (typeof business.faqs === 'string' ? 
            JSON.parse(business.faqs) : 
            business.faqs) : [],
        delivery_info: business.delivery_info ? 
          (typeof business.delivery_info === 'string' ? 
            JSON.parse(business.delivery_info) : 
            business.delivery_info) : undefined,
        social_links: business.social_links ? 
          (typeof business.social_links === 'string' ? 
            JSON.parse(business.social_links) : 
            business.social_links) : {},
        business_photos: business.business_photos || [],
        reviews: business.reviews?.map(review => ({
          id: '',
          rating: review.rating,
          review_text: '',
          created_at: new Date().toISOString(),
          helpful_votes: 0,
          reply_count: 0,
          user_id: '',
          profiles: {
            username: '',
            avatar_url: '',
            full_name: ''
          }
        })) || [],
        is_open: business.is_open || false,
        price_range: business.price_range || null
      }));

      return transformedData;
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
                isLoading={isLoading}
                businesses={businesses}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreListings;
