import { Star } from "lucide-react";

interface BusinessStatsProps {
  rating: number;
  reviewCount: number;
}

export const BusinessStats = ({ rating, reviewCount }: BusinessStatsProps) => {
  return (
    <div className="absolute bottom-3 right-3 bg-white/90 rounded-full p-2 flex items-center gap-2">
      <div className="text-yellow-500 font-bold">{rating}</div>
      <div className="flex items-center">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        <span className="text-sm ml-1">({reviewCount})</span>
      </div>
    </div>
  );
};