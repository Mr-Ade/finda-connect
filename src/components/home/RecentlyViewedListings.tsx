import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Business } from "@/types/supabase/business";

const RecentlyViewedListings = () => {
  const { data: businesses, isLoading, error } = useQuery({
    queryKey: ['recently-viewed-businesses'],
    queryFn: async () => {
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
        .order('last_viewed', { ascending: false })
        .limit(5);

      if (error) {
        throw new Error(error.message);
      }

      return data as unknown as Business[];
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Recently Viewed Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses?.map((business) => (
          <div key={business.id} className="border rounded-lg p-4">
            <h3 className="text-lg font-bold">{business.name}</h3>
            <p>{business.description}</p>
            <p>{business.city}, {business.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedListings;