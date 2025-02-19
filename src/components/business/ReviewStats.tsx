import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReviewStatsProps {
  reviews: Array<{
    rating: number;
  }>;
}

export const ReviewStats = ({ reviews }: ReviewStatsProps) => {
  const totalReviews = reviews.length;
  if (totalReviews === 0) return null;

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  
  // Calculate rating distribution
  const ratingCounts = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i;
    return {
      rating,
      count: reviews.filter(review => review.rating === rating).length,
      percentage: (reviews.filter(review => review.rating === rating).length / totalReviews) * 100
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-lg shadow">
      {/* Average Rating Display */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-4xl font-bold text-primary">{averageRating.toFixed(1)}</div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-3">
        {ratingCounts.map(({ rating, count, percentage }) => (
          <div key={rating} className="flex items-center gap-2">
            <div className="w-12 text-sm">{rating} stars</div>
            <Progress value={percentage} className="h-2" />
            <div className="w-12 text-sm text-muted-foreground">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};