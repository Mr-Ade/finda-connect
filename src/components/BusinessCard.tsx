import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Business } from "@/types/business";

export interface BusinessCardProps {
  business: Business;
  className?: string;
}

export const BusinessCard = ({ business, className = "" }: BusinessCardProps) => {
  if (!business) {
    return null; // Return null if business is undefined
  }

  return (
    <Link to={`/business/${business.id}`}>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
        <div className="relative aspect-[4/3]">
          <img
            src={business.hero_image || "/placeholder.svg"}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          {business.is_open !== undefined && (
            <div className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
              business.is_open ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {business.is_open ? 'Open' : 'Closed'}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{business.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">{business.rating || 0}</span>
            <span className="text-gray-500 text-sm">({business.review_count || 0} reviews)</span>
          </div>
          <div className="text-sm text-gray-500">
            <p>{business.category}</p>
            <p>{[business.city, business.state].filter(Boolean).join(', ')}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};