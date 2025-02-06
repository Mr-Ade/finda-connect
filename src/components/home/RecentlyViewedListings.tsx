import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import type { Business } from "@/types/business";

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

      return data as Business[];
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
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </section>
  );
};