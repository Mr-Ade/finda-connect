import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReviewResponseProps {
  reviewId: string;
  businessId: string;
  existingResponse?: {
    id: string;
    response_text: string;
    created_at: string;
  };
  onResponseSubmitted: () => void;
}

export const ReviewResponse = ({ 
  reviewId, 
  businessId, 
  existingResponse,
  onResponseSubmitted 
}: ReviewResponseProps) => {
  const [responseText, setResponseText] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const { toast } = useToast();

  const handleSubmitResponse = async () => {
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
      setIsResponding(false);
      onResponseSubmitted();
    }
  };

  if (existingResponse) {
    return (
      <div className="ml-8 mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium text-sm text-gray-600 mb-2">Business Owner Response:</p>
        <p className="text-gray-700">{existingResponse.response_text}</p>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(existingResponse.created_at).toLocaleDateString()}
        </p>
      </div>
    );
  }

  if (!isResponding) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsResponding(true)}
        className="mt-4"
      >
        Respond to Review
      </Button>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      <Textarea
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        placeholder="Write your response..."
        className="mb-2"
      />
      <div className="flex gap-2">
        <Button
          onClick={handleSubmitResponse}
          disabled={!responseText.trim()}
        >
          Submit Response
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setIsResponding(false);
            setResponseText("");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};