import { useState } from "react";
import { Star, ThumbsUp, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewResponse } from "./ReviewResponse";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReviewItemProps {
  review: {
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
    review_photos?: Array<{
      id: string;
      photo_url: string;
    }>;
  };
  businessId: string;
  isOwner: boolean;
  onUpdate: () => void;
}

export const ReviewItem = ({ review, businessId, isOwner, onUpdate }: ReviewItemProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { toast } = useToast();

  const handleVote = async () => {
    setIsVoting(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to vote on reviews",
      });
      setIsVoting(false);
      return;
    }

    const { error } = await supabase
      .from("review_votes")
      .insert({
        review_id: review.id,
        user_id: user.id,
        is_helpful: true
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          description: "You have already voted on this review",
        });
      } else {
        console.error("Vote submission error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit vote. Please try again.",
        });
      }
    } else {
      toast({
        description: "Vote submitted successfully",
      });
      onUpdate();
    }
    setIsVoting(false);
  };

  return (
    <div className="border-b pb-6 last:border-0">
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

      {review.review_photos && review.review_photos.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.review_photos.map((photo) => (
            <div
              key={photo.id}
              className="relative cursor-pointer"
              onClick={() => setSelectedPhoto(photo.photo_url)}
            >
              <img
                src={photo.photo_url}
                alt="Review photo"
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-3xl max-h-[90vh] p-4">
            <img
              src={selectedPhoto}
              alt="Review photo"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleVote}
        disabled={isVoting}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ThumbsUp className="w-4 h-4" />
        Helpful
      </Button>

      {review.review_responses?.map((response) => (
        <ReviewResponse
          key={response.id}
          reviewId={review.id}
          businessId={businessId}
          existingResponse={response}
          onResponseSubmitted={onUpdate}
        />
      ))}

      {isOwner && !review.review_responses?.length && (
        <ReviewResponse
          reviewId={review.id}
          businessId={businessId}
          onResponseSubmitted={onUpdate}
        />
      )}
    </div>
  );
};