import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [responseText, setResponseText] = useState("");
  const [respondingToReviewId, setRespondingToReviewId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to submit a review",
      });
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .insert({
        business_id: businessId,
        rating,
        comment,
        user_id: user.id
      });

    if (error) {
      console.error("Review submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit review. Please try again.",
      });
    } else {
      toast({
        title: "Success",
        description: "Your review has been submitted.",
      });
      setRating(0);
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    }

    setIsSubmitting(false);
  };

  const handleSubmitResponse = async (reviewId: string) => {
    if (!responseText.trim()) return;

    const { error } = await supabase
      .from("review_responses")
      .insert({
        review_id: reviewId,
        business_id: businessId,
        response_text: responseText
      });

    if (error) {
      console.error("Response submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit response. Please try again.",
      });
    } else {
      toast({
        title: "Success",
        description: "Your response has been submitted.",
      });
      setResponseText("");
      setRespondingToReviewId(null);
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
      
      <form onSubmit={handleSubmitReview} className="mb-8">
        <div className="mb-4">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    value <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="mb-2"
            required
          />
          <Button type="submit" disabled={isSubmitting || rating === 0}>
            Submit Review
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-center mb-2">
              <img
                src={review.profiles.avatar_url || "/placeholder.svg"}
                alt={review.profiles.username}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{review.profiles.username}</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.comment}</p>

            {review.review_responses?.map((response) => (
              <div key={response.id} className="ml-8 mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm text-gray-600 mb-2">Business Owner Response:</p>
                <p className="text-gray-700">{response.response_text}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(response.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}

            {isOwner && !review.review_responses?.length && (
              <div className="mt-4">
                {respondingToReviewId === review.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write your response..."
                      className="mb-2"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSubmitResponse(review.id)}
                        disabled={!responseText.trim()}
                      >
                        Submit Response
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setRespondingToReviewId(null);
                          setResponseText("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setRespondingToReviewId(review.id)}
                  >
                    Respond to Review
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};