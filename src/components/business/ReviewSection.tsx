import { useQueryClient } from "@tanstack/react-query";
import { ReviewForm } from "./ReviewForm";
import { ReviewItem } from "./ReviewItem";

interface ReviewSectionProps {
  businessId: string;
  isOwner?: boolean;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    profiles: {
      username: string;
      avatar_url: string;
    };
    review_responses?: Array<{
      id: string;
      response_text: string;
      created_at: string;
    }>;
  }>;
}

export const ReviewSection = ({ businessId, isOwner = false, reviews }: ReviewSectionProps) => {
  const queryClient = useQueryClient();

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["business", businessId] });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
      
      <ReviewForm 
        businessId={businessId}
        onReviewSubmitted={handleUpdate}
      />

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
  );
};