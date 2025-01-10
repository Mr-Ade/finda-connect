import { Star } from "lucide-react";

interface BusinessStatsProps {
  rating: number;
  reviewCount: number;
}

export const BusinessStats = ({ rating, reviewCount }: BusinessStatsProps) => {
  return (
    <div className="flex items-center text-gray-600 mb-2">
      <div className="flex items-center">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
      <span className="text-sm ml-2">({reviewCount} Reviews)</span>
    </div>
  );
};