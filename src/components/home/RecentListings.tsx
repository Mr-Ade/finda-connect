import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

export const RecentListings = () => {
  const { data: businesses, isLoading, error } = useQuery({
    queryKey: ['recentListings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data as Business[];
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings</div>;
  if (!businesses?.length) return <div>No listings found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {businesses.map((business) => (
        <Link 
          key={business.id}
          to={`/business/${business.id}`} 
          className="block p-4 border rounded-lg hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">{business.name}</h3>
          <p className="text-gray-600">{business.description}</p>
          <p className="text-gray-500">{business.city}, {business.state}</p>
        </Link>
      ))}
    </div>
  );
};