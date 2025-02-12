
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { useLocation } from "@/contexts/LocationContext";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const LocationRecommendations = () => {
  const { coordinates, city, state } = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['location-recommendations', coordinates, city, state],
    queryFn: async () => {
      console.log('Fetching location-based recommendations:', { coordinates, city, state });
      
      let query = supabase
        .from('businesses')
        .select(`
          *,
          business_photos (photo_url),
          reviews (rating)
        `)
        .limit(4);

      if (city) {
        query = query.eq('city', city);
      }

      if (state) {
        query = query.eq('state', state);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
      }

      return data.map(business => ({
        id: business.id,
        name: business.name,
        image: business.business_photos?.[0]?.photo_url || "/placeholder.svg",
        category: business.category,
        rating: business.reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (business.reviews?.length || 1) || 0,
        reviewCount: business.reviews?.length || 0,
        location: `${business.city}, ${business.state}`,
        isOpen: true,
      }));
    },
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('business_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'businesses',
          filter: city ? `city=eq.${city}` : undefined
        },
        (payload) => {
          console.log('Business update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['location-recommendations'] });
          
          toast({
            title: "Update Available",
            description: "New business information is available.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [city, queryClient, toast]);

  if (isLoading) {
    return <div className="text-center py-4">Loading recommendations...</div>;
  }

  if (!recommendations?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recommended Nearby</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((business) => (
          <BusinessCard key={business.id} {...business} />
        ))}
      </div>
    </div>
  );
};
