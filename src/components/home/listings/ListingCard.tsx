import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isBusinessOpen } from "@/lib/utils/businessHours";
import { useAuth } from "@/hooks/useAuth";
import { BusinessHeader } from "./components/BusinessHeader";
import { BusinessStats } from "./components/BusinessStats";
import { BusinessInfo } from "./components/BusinessInfo";
import { BusinessFooter } from "./components/BusinessFooter";
import type { Business } from "@/types/business";

interface ListingCardProps {
  business: Business;
}

export const ListingCard = ({ business }: ListingCardProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch business hours
  const { data: hours, refetch: refetchHours } = useQuery({
    queryKey: ['business-hours', business.id],
    queryFn: async () => {
      console.log('Fetching business hours for:', business.id);
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('business_id', business.id)
        .order('day_of_week');

      if (error) {
        console.error('Error fetching business hours:', error);
        throw error;
      }
      return data;
    }
  });

  // Fetch reviews count and average rating
  const { data: reviewStats, refetch: refetchReviews } = useQuery({
    queryKey: ['business-reviews', business.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('business_id', business.id);

      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }

      const avgRating = data.reduce((acc, review) => acc + review.rating, 0) / (data.length || 1);
      return {
        count: data.length,
        rating: Number(avgRating.toFixed(1))
      };
    }
  });

  // Fetch bookmark status
  const { data: isBookmarked, refetch: refetchBookmark } = useQuery({
    queryKey: ['bookmark', business.id, user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('business_id', business.id)
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching bookmark:', error);
        throw error;
      }

      return !!data;
    }
  });

  // Toggle bookmark mutation
  const toggleBookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('Must be logged in to bookmark');
      }

      if (isBookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('business_id', business.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert([{ business_id: business.id, user_id: user.id }]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', business.id, user?.id] });
      toast({
        title: isBookmarked ? "Bookmark removed" : "Business bookmarked",
        description: isBookmarked ? "Business removed from your bookmarks" : "Business added to your bookmarks"
      });
    },
    onError: (error) => {
      console.error('Error toggling bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive"
      });
    }
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
          table: 'business_hours',
          filter: `business_id=eq.${business.id}`
        },
        () => {
          console.log('Business hours changed, refreshing...');
          refetchHours();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews',
          filter: `business_id=eq.${business.id}`
        },
        () => {
          console.log('Reviews changed, refreshing...');
          refetchReviews();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `business_id=eq.${business.id}`
        },
        () => {
          console.log('Bookmarks changed, refreshing...');
          refetchBookmark();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [business.id, refetchHours, refetchReviews, refetchBookmark]);

  const isOpen = isBusinessOpen(hours || null);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <BusinessHeader
        business={business}
        isOpen={isOpen}
        isBookmarked={isBookmarked || false}
        onToggleBookmark={() => toggleBookmarkMutation.mutate()}
      />
      <BusinessStats
        rating={reviewStats?.rating || 0}
        reviewCount={reviewStats?.count || 0}
      />
      <div className="p-4">
        <BusinessInfo business={business} />
        <BusinessFooter business={business} />
      </div>
    </div>
  );
};