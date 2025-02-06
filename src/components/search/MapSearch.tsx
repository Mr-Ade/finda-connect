import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import type { Business } from "@/types/business";

export const MapSearch = () => {
  const { data: businesses } = useQuery({
    queryKey: ['businesses'],
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
        `);

      if (error) throw error;
      return data as Business[];
    }
  });

  const renderBusinessResults = (businesses: Business[]) => {
    return (
      <div className="grid grid-cols-1 gap-4">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    );
  };

  if (!businesses) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {renderBusinessResults(businesses)}
    </div>
  );
};
