
import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const BusinessReviews = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: reviews } = useQuery({
    queryKey: ['business-reviews'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('business_reviews')
        .select('*, profiles(name)')
        .eq('business_owner_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleReply = async (reviewId: string, reply: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('business_reviews')
        .update({ owner_reply: reply })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: "Reply Posted",
        description: "Your reply has been successfully posted."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BusinessOwnerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
            <p className="text-muted-foreground mt-2">
              View and respond to customer reviews here.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {reviews?.map((review) => (
            <Card key={review.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm font-medium">{review.profiles.name}</CardTitle>
                  <div className="flex items-center mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{review.content}</p>
                {review.owner_reply && (
                  <div className="mt-4 pl-4 border-l-2">
                    <p className="text-sm font-medium">Your Reply:</p>
                    <p className="text-sm text-muted-foreground">{review.owner_reply}</p>
                  </div>
                )}
                {!review.owner_reply && (
                  <Button 
                    className="mt-4" 
                    variant="outline"
                    size="sm"
                    onClick={() => handleReply(review.id, 'Thank you for your feedback!')}
                    disabled={isLoading}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Reply to Review
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BusinessOwnerLayout>
  );
};
