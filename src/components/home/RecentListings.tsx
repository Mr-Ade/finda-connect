import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import type { Business } from "@/types/business";

const RecentListings = () => {
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
          )
        `)
        .limit(8)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching recent listings:', error);
        throw error;
      }

      // Transform the data to match our Business type
      const transformedData: Business[] = data.map(business => ({
        ...business,
        business_hours: business.business_hours ? 
          (typeof business.business_hours === 'string' ? 
            JSON.parse(business.business_hours) : 
            business.business_hours) : [],
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
    <section 
      className="w-full bg-gray-50 py-16"
      aria-labelledby="recent-listings-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-gray-600 text-sm font-medium mb-2">
            Recent Listings
          </span>
          <h2 
            id="recent-listings-heading"
            className="text-3xl font-bold text-gray-900 flex items-center gap-2"
          >
            Browse Recent <span className="text-red-500">Listings</span>
          </h2>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="feed"
          aria-label="Recent listings"
        >
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              id={business.id}
              name={business.name}
              image={business.business_photos?.[0]?.photo_url || '/placeholder.svg'}
              category={business.category}
              rating={business.rating || 0}
              reviewCount={business.review_count || 0}
              location={`${business.city}, ${business.state}`}
              description={business.description}
              isFeatured={business.status === 'approved'}
              amenities={business.amenities}
              email={business.email}
              authorId={business.owner_id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;