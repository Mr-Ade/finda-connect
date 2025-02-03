import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import type { Business, BusinessHour } from "@/types/business";

export const RecentlyViewedListings = () => {
  const { data: businesses, isLoading } = useQuery({
    queryKey: ['recentListings'],
    queryFn: async () => {
      console.log('Fetching recent listings...');
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
          )
        `)
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching recent listings:', error);
        throw error;
      }

      // Transform the data to match Business type
      const transformedData: Business[] = data.map(business => ({
        ...business,
        business_hours: business.business_hours as BusinessHour[],
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
        reviews: [],
        is_open: business.is_open || false,
        price_range: business.price_range || null
      }));

      return transformedData;
    }
  });

  if (isLoading || !businesses) {
    return null;
  }

  return (
    <section className="w-full bg-gray-50 py-16 -mx-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">
            Related Listing
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Recently Viewed Listing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              id={business.id}
              name={business.name}
              image={business.business_photos?.[0]?.photo_url || '/placeholder.svg'}
              category={business.category}
              rating={4.5} // TODO: Calculate from reviews
              reviewCount={30} // TODO: Get from reviews count
              location={`${business.city}, ${business.state}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};