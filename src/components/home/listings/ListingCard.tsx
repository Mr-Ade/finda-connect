import { Link } from "react-router-dom";
import { Heart, Mail, Star, Wifi, Car, Dog, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Database } from "@/integrations/supabase/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isBusinessOpen } from "@/lib/utils/businessHours";
import { useAuth } from "@/hooks/useAuth";

type BusinessPhoto = {
  id: string;
  photo_url: string;
};

type Business = Database["public"]["Tables"]["businesses"]["Row"] & {
  business_photos?: BusinessPhoto[];
  reviews?: {
    rating: number;
  }[];
};

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
        .maybeSingle(); // Changed from .single() to .maybeSingle()

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
        description: isBookmarked ? "Business removed from your bookmarks" : "Business added to your bookmarks",
      });
    },
    onError: (error) => {
      console.error('Error toggling bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
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
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white"
          onClick={() => {
            if (!user) {
              toast({
                title: "Login required",
                description: "Please login to bookmark businesses",
                variant: "destructive",
              });
              return;
            }
            toggleBookmarkMutation.mutate();
          }}
        >
          <Heart 
            className={`h-5 w-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} 
          />
        </Button>
        
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className={`px-2 py-1 text-xs text-white rounded ${isOpen ? 'bg-green-500' : 'bg-blue-500'}`}>
            {isOpen ? 'Open' : 'Closed'}
          </span>
          {business.status === 'approved' && (
            <span className="bg-primary text-white px-2 py-1 rounded text-sm">
              Featured
            </span>
          )}
        </div>

        <Link to={`/business/${business.id}`}>
          <img 
            src={business.business_photos?.[0]?.photo_url || "/placeholder.svg"}
            alt={business.name}
            className="w-full h-48 object-cover"
          />
        </Link>

        <div className="absolute bottom-3 right-3 bg-white/90 rounded-full p-2 flex items-center gap-2">
          <div className="text-yellow-500 font-bold">{reviewStats?.rating || 0}</div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1">({reviewStats?.count || 0})</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src="/placeholder.svg"
            alt="Author"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex gap-2 text-xs text-gray-500">
              {business.category && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {business.category}
                </span>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">
          <Link to={`/business/${business.id}`} className="hover:text-primary">
            {business.name}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">Facilities:</div>
          <div className="flex gap-3">
            <Wifi className="h-4 w-4 text-gray-400" />
            <Car className="h-4 w-4 text-gray-400" />
            <Dog className="h-4 w-4 text-gray-400" />
            <Wind className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center text-gray-500 text-sm">
            <Mail className="h-4 w-4 mr-1" />
            {business.city}, {business.state}
          </div>
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};