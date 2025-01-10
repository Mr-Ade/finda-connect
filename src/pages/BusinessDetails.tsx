import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { BusinessGallery } from "@/components/business/BusinessGallery";
import { BusinessMainContent } from "@/components/business/details/BusinessMainContent";
import { BusinessRightSidebar } from "@/components/business/details/BusinessRightSidebar";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import type { Business } from "@/types/business";

const BusinessDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: business, isLoading, refetch } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos(*),
          menu_items(*),
          business_hours(*),
          reviews(
            id,
            rating,
            comment,
            created_at,
            profiles:user_id(username, avatar_url),
            review_responses(id, response_text, created_at),
            review_photos(id, photo_url)
          ),
          owner:owner_id(
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching business:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load business details"
        });
        throw error;
      }
      return data as unknown as Business;
    }
  });

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel('business_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'businesses',
          filter: `id=eq.${id}`
        },
        () => {
          console.log('Business details changed, refreshing...');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, refetch]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 w-full" />
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <div className="h-32 bg-gray-200 rounded-lg mb-4" />
              <div className="h-64 bg-gray-200 rounded-lg" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-96 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Business Not Found</h2>
        <p className="text-gray-600">The business you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div>
      <BusinessHeader 
        business={{
          name: business.name,
          description: business.description || "",
          category: business.category,
          reviews_count: business.reviews?.length,
          rating: business.reviews?.reduce((acc, review) => acc + review.rating, 0) / (business.reviews?.length || 1),
          is_claimed: true,
          is_open: true
        }}
      />
      <BusinessGallery photos={business.business_photos || []} />

      <section className="gray py-5 position-relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <BusinessMainContent business={business} />
            </div>
            <div className="lg:col-span-4 relative z-10">
              <BusinessRightSidebar business={business} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDetails;