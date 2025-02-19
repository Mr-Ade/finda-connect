import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ReviewForm } from "./ReviewForm";
import { ReviewItem } from "./ReviewItem";
import { ReviewStats } from "./ReviewStats";
import { supabase } from "@/integrations/supabase/client";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

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
  const [sortBy, setSortBy] = useState<string>("recent");
  const [filterRating, setFilterRating] = useState<number | null>(null);

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

  const sortedAndFilteredReviews = [...reviews]
    .filter(review => !filterRating || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "helpful":
          return (b.helpful_count || 0) - (a.helpful_count || 0);
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        default: // "recent"
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-8">
      <ReviewStats reviews={reviews} />
      
      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filterRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterRating(filterRating === rating ? null : rating)}
              className="flex items-center gap-1"
            >
              {rating} <Star className="w-4 h-4" />
            </Button>
          ))}
        </div>
        <Select
          value={sortBy}
          onValueChange={setSortBy}
          options={[
            { value: "recent", label: "Most Recent" },
            { value: "helpful", label: "Most Helpful" },
            { value: "rating-high", label: "Highest Rating" },
            { value: "rating-low", label: "Lowest Rating" },
          ]}
        />
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {sortedAndFilteredReviews.length > 0 ? (
          sortedAndFilteredReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              businessId={businessId}
              isOwner={isOwner}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            {filterRating
              ? `No ${filterRating}-star reviews yet`
              : "No reviews yet"}
          </p>
        )}
      </div>

      {/* Review Form */}
      <ReviewForm businessId={businessId} onReviewSubmitted={handleUpdate} />
    </div>
  );
};