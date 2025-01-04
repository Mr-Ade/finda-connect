import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ListingsHeader } from "./listings/ListingsHeader";
import { ListingsGrid } from "./listings/ListingsGrid";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

export const RecentListings = () => {
  const [showAll, setShowAll] = useState(false);

  const { data: businesses, isLoading, error } = useQuery({
    queryKey: ['recentListings'],
    queryFn: async () => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .gte('created_at', oneWeekAgo.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Business[];
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings</div>;
  if (!businesses?.length) return <div>No listings found</div>;

  const hasMore = businesses.length > 8;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ListingsHeader />
        
        <ListingsGrid 
          businesses={businesses} 
          showAll={showAll} 
        />

        {hasMore && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
            >
              {showAll ? 'Show Less' : 'See More'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};