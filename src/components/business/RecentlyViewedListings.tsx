import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"] & {
  business_photos?: {
    photo_url: string;
  }[];
};

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
            photo_url
          )
        `)
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching recent listings:', error);
        throw error;
      }

      return data as Business[];
    }
  });

  if (isLoading || !businesses) {
    return null;
  }

  return (
    <section className="w-full bg-gray-50 py-16">
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