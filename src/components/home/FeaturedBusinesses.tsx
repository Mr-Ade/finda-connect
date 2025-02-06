import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Business } from "@/types/business";

export const FeaturedBusinesses = () => {
  const { data: businesses, isLoading } = useQuery({
    queryKey: ['featured-businesses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('status', 'approved')
        .order('rating', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data as Business[];
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[300px] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Featured Businesses</h2>
        <Button variant="outline">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses?.map((business) => (
          <BusinessCard 
            key={business.id} 
            business={business}
          />
        ))}
      </div>
    </section>
  );
};