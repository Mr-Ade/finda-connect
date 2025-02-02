import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHero } from "@/components/business/BusinessHero";
import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import { BusinessHours } from "@/components/business/BusinessHours";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { FAQ } from "@/components/business/FAQ";
import { ReviewSection } from "@/components/business/ReviewSection";
import { RecentlyViewedListings } from "@/components/home/RecentlyViewedListings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhotoGallery } from "@/components/business/PhotoGallery";
import { MenuItem } from "@/types/business";

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
            full_name,
            city,
            state,
            address,
            mobile,
            bio,
            business_owner,
            created_at,
            updated_at,
            location_data,
            preferred_currency,
            preferred_language,
            timezone,
            is_admin,
            last_seen,
            super_admin,
            zip_code,
            website,
            role,
            is_active,
            businesses:businesses(count),
            followers:follows!follows_following_id_fkey(count),
            email:mobile,
            phone:mobile
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Ensure review_responses is always an array
      if (data && data.reviews) {
        data.reviews = data.reviews.map(review => ({
          ...review,
          review_responses: Array.isArray(review.review_responses) 
            ? review.review_responses 
            : review.review_responses 
              ? [review.review_responses]
              : []
        }));
      }
      
      return data;
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

  // Transform amenities from JSON to array format
  const amenitiesList = business.amenities ? 
    (typeof business.amenities === 'string' ? 
      JSON.parse(business.amenities) : 
      Object.entries(business.amenities || {}).map(([name, available]) => ({
        name,
        available: !!available
      }))
    ) : [];

  // Transform FAQs from JSON to array format with proper typing
  const questionsList = business.faqs ? 
    (typeof business.faqs === 'string' ? 
      JSON.parse(business.faqs) : 
      business.faqs
    ) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHero businessId={id} />
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">About {business.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{business.description}</p>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <MenuItems businessId={id} menuItems={business.menu_items || []} />

            {/* Photo Gallery */}
            <PhotoGallery 
              businessId={id} 
              isOwner={business.owner?.id === business.owner_id} 
            />

            {/* Amenities */}
            <Amenities amenities={amenitiesList} />

            {/* FAQs */}
            <FAQ businessId={id} questions={questionsList} />

            {/* Reviews */}
            <ReviewSection 
              businessId={id} 
              reviews={business.reviews || []} 
              isOwner={false}
            />

            {/* Business Hours */}
            <BusinessHours businessId={id} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <BusinessSidebar business={{
              id: business.id,
              name: business.name,
              description: business.description || '',
              address: business.address,
              city: business.city,
              state: business.state,
              zip_code: business.zip_code,
              phone: business.phone || '',
              email: business.email || '',
              category: business.category,
              owner: business.owner ? {
                username: business.owner.username,
                avatar_url: business.owner.avatar_url,
                full_name: business.owner.full_name
              } : undefined
            }} />
          </div>
        </div>

        {/* Recently Viewed Listings */}
        <div className="mt-16">
          <RecentlyViewedListings />
        </div>
      </div>
    </div>
  );
}