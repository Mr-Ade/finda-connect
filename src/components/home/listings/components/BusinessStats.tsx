import { Star } from "lucide-react";

interface BusinessStatsProps {
  rating: number;
  reviewCount: number;
}

export const BusinessStats = ({ rating, reviewCount }: BusinessStatsProps) => {
  const getRatingColor = (score: number) => {
    if (score >= 4) return 'bg-green-500';
    if (score >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className={`${getRatingColor(rating)} text-white text-lg font-bold px-2 py-1 rounded`}>
        {rating.toFixed(1)}
      </span>
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 fill-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {reviewCount} Reviews
        </span>
      </div>
    </div>
  );
};