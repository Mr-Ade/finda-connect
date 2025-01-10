import { useParams } from "react-router-dom";
import { BusinessHero } from "@/components/business/BusinessHero";
import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import { BusinessHours } from "@/components/business/BusinessHours";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { FAQ } from "@/components/business/FAQ";
import { ReviewSection } from "@/components/business/ReviewSection";
import { RecentlyViewedListings } from "@/components/home/RecentlyViewedListings";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            image_url
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
              avatar_url
            )
          ),
          owner:profiles (
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
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

  const amenities = business.amenities || [
    { name: "Free WiFi", available: true },
    { name: "Parking", available: true },
    { name: "Pet Friendly", available: false },
    { name: "Air Conditioning", available: true },
    { name: "Outdoor Seating", available: true },
    { name: "Delivery", available: false },
  ];

  const faqs = business.faqs || [
    {
      question: "What are your opening hours?",
      answer: "We are open Monday to Friday 9am-6pm, Saturday 10am-4pm, and closed on Sundays."
    },
    {
      question: "Do you accept credit cards?",
      answer: "Yes, we accept all major credit cards including Visa, Mastercard, and American Express."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHero businessId={id} />
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About {business.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{business.description}</p>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <MenuItems businessId={id} />

            {/* Amenities */}
            <Amenities amenities={amenities} />

            {/* FAQs */}
            <FAQ faqs={faqs} />

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
          <div className="lg:col-span-1">
            <BusinessSidebar business={business} />
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