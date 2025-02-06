import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import type { Business } from "@/types/business";

export const FeaturedBusinesses = () => {
  const { data: businesses } = useQuery({
    queryKey: ['featuredBusinesses'],
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
        .eq('status', 'approved')
        .limit(8);

      if (error) throw error;
      return data as Business[];
    }
  });

  if (!businesses?.length) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Businesses</h2>
          <p className="mt-4 text-gray-600">Discover our top-rated local businesses</p>
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