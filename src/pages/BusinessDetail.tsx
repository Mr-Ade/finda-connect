import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHero } from "@/components/business/BusinessHero";
import { MainContent } from "@/components/business/MainContent";
import { SidebarWrapper } from "@/components/business/SidebarWrapper";
import { RecentlyViewedListings } from "@/components/home/RecentlyViewedListings";
import type { Business } from "@/types/business";

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      if (!id) throw new Error('Business ID is required');
      
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos (
            id,
            photo_url,
            caption,
            order_index
          ),
          business_hours (
            id,
            day_of_week,
            open_time,
            close_time,
            is_closed
          ),
          menu_items (
            id,
            name,
            description,
            price,
            category,
            image_url,
            business_id,
            created_at,
            updated_at
          ),
          reviews (
            id,
            rating,
            comment,
            created_at,
            helpful_count,
            reply_count,
            user_id,
            profiles (
              username,
              avatar_url,
              full_name
            ),
            review_photos (
              id,
              photo_url
            ),
            review_responses (
              id,
              response_text,
              created_at
            )
          ),
          owner:profiles!businesses_owner_id_fkey (
            id,
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Transform amenities from JSON if needed
      if (data.amenities && typeof data.amenities === 'string') {
        data.amenities = JSON.parse(data.amenities);
      }

      // Ensure reviews array exists and review_responses is always an array
      if (data.reviews) {
        data.reviews = data.reviews.map(review => ({
          ...review,
          review_responses: Array.isArray(review.review_responses) 
            ? review.review_responses 
            : review.review_responses 
              ? [review.review_responses]
              : []
        }));
      }
      
      return data as Business;
    },
    enabled: !!id
  });

  if (!id) {
    return <div>Business not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHero businessId={id} />
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          <MainContent 
            business={business} 
            isOwner={business.owner?.id === business.owner_id} 
          />
          <SidebarWrapper business={business} />
        </div>

        {/* Recently Viewed Listings */}
        <div className="mt-16">
          <RecentlyViewedListings />
        </div>
      </div>
    </div>
  );
}