import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ReviewPhotoUpload } from "./ReviewPhotoUpload";

interface ReviewFormProps {
  businessId: string;
  onReviewSubmitted: () => void;
}

export const ReviewForm = ({ businessId, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const { toast } = useToast();

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

    if (!rating) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a rating",
      });
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        business_id: businessId,
        rating,
        comment,
        user_id: user.id
      })
      .select()
      .single();

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
      setReviewId(data.id);
      setRating(0);
      setName("");
      setEmail("");
      setComment("");
      onReviewSubmitted();
    }

    setIsSubmitting(false);
  };

  const handlePhotoUploaded = () => {
    setReviewId(null);
    onReviewSubmitted();
  };

  return (
    <form onSubmit={handleSubmitReview} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Choose Rate</label>
        <div className="flex gap-1">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Review</label>
        <Textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[150px]"
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting || rating === 0}
        className="w-full bg-red-500 hover:bg-red-600"
      >
        Submit Review
      </Button>

      {reviewId && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Add photos to your review</h3>
          <ReviewPhotoUpload
            reviewId={reviewId}
            onPhotoUploaded={handlePhotoUploaded}
          />
        </div>
      )}
    </form>
  );
};