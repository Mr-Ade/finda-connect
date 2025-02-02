import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHero } from "@/components/business/BusinessHero";
import { MainContent } from "@/components/business/MainContent";
import { SidebarWrapper } from "@/components/business/SidebarWrapper";
import { RecentlyViewedListings } from "@/components/home/RecentlyViewedListings";
import type { Business, BusinessHour } from "@/types/business";

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
          business_reviews (
            id,
            rating,
            review_text,
            created_at,
            helpful_votes,
            reply_text,
            reply_date,
            user_id,
            profiles (
              username,
              avatar_url,
              full_name
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

      // Transform the data to match our Business type
      const transformedData: Business = {
        ...data,
        business_hours: data.business_hours as BusinessHour[],
        amenities: data.amenities ? 
          (typeof data.amenities === 'string' ? 
            JSON.parse(data.amenities) : 
            data.amenities) : {},
        faqs: data.faqs ? 
          (typeof data.faqs === 'string' ? 
            JSON.parse(data.faqs) : 
            data.faqs) : [],
        delivery_info: data.delivery_info ? 
          (typeof data.delivery_info === 'string' ? 
            JSON.parse(data.delivery_info) : 
            data.delivery_info) : undefined,
        social_links: data.social_links ? 
          (typeof data.social_links === 'string' ? 
            JSON.parse(data.social_links) : 
            data.social_links) : {},
        reviews: data.business_reviews ? data.business_reviews.map(review => ({
          id: review.id,
          rating: review.rating,
          comment: review.review_text,
          created_at: review.created_at,
          helpful_count: review.helpful_votes || 0,
          reply_count: 0,
          user_id: review.user_id,
          profiles: review.profiles,
          review_photos: [],
          review_responses: {
            id: '',
            response_text: review.reply_text || '',
            created_at: review.reply_date || ''
          }
        })) : [],
        is_open: data.is_open || false,
        price_range: data.price_range || null
      };

      return transformedData;
    }
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