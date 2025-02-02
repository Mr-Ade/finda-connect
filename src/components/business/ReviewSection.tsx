import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ReviewForm } from "./ReviewForm";
import { ReviewItem } from "./ReviewItem";
import { supabase } from "@/integrations/supabase/client";

interface ReviewSectionProps {
  businessId: string;
  isOwner?: boolean;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    helpful_count?: number;
    reply_count?: number;
    user_id?: string;
    profiles: {
      username: string;
      avatar_url: string;
      full_name?: string;
    };
    review_responses?: Array<{
      id: string;
      response_text: string;
      created_at: string;
    }>;
    review_photos?: Array<{
      id: string;
      photo_url: string;
    }>;
  }>;
}

export const ReviewSection = ({ businessId, isOwner = false, reviews }: ReviewSectionProps) => {
  const queryClient = useQueryClient();

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["business", businessId] });
  };

  useEffect(() => {
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews',
          filter: `business_id=eq.${businessId}`
        },
        () => {
          console.log('Review change detected - refreshing data');
          handleUpdate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [businessId]);

  return (
    <div className="space-y-8">
      {/* Submit Review Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Drop Your Review</h2>
        <ReviewForm 
          businessId={businessId}
          onReviewSubmitted={handleUpdate}
        />
      </div>

      {/* Recommended Reviews Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Recommended Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              businessId={businessId}
              isOwner={isOwner}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};