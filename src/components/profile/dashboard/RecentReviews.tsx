import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export const RecentReviews = () => {
  const { data: reviews } = useQuery({
    queryKey: ['userRecentReviews'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          businesses (
            id,
            name
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews?.map((review) => (
            <div key={review.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Link 
                  to={`/business/${review.business_id}`}
                  className="font-medium hover:underline"
                >
                  {review.businesses?.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {(!reviews || reviews.length === 0) && (
            <p className="text-gray-500">No reviews yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};