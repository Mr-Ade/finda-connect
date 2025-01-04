import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ListingsHeader } from "./listings/ListingsHeader";
import { ListingsGrid } from "./listings/ListingsGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

export const RecentListings = () => {
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();

  const { data: businesses, isLoading, error } = useQuery({
    queryKey: ['recentListings'],
    queryFn: async () => {
      console.log('Fetching recent listings...');
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .gte('created_at', oneWeekAgo.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching listings:', error);
        toast({
          title: "Error loading listings",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Fetched listings:', data?.length);
      return data as Business[];
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ListingsHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <ListingsHeader />
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-8">
            <p className="text-red-600">Unable to load listings. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!businesses?.length) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <ListingsHeader />
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 mt-8">
            <p className="text-gray-600">No recent listings found.</p>
          </div>
        </div>
      </section>
    );
  }

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