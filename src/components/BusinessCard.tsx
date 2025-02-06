import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Business } from "@/types/business";

export interface BusinessCardProps {
  business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
  if (!business) {
    return null;
  }

  const heroImage = business.hero_image || 
    (business.business_photos && business.business_photos[0]?.photo_url) || 
    '/placeholder.svg';

  return (
    <Link to={`/business/${business.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <img
            src={heroImage}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          {business.is_open !== undefined && (
            <Badge 
              variant={business.is_open ? "default" : "secondary"}
              className="absolute top-2 right-2"
            >
              {business.is_open ? "Open" : "Closed"}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{business.name}</h3>
          <div className="flex items-center gap-1 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (business.rating || 0)
                    ? "fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600 text-sm ml-1">
              ({business.review_count || 0})
            </span>
          </div>
          <div className="text-gray-600">
            {business.category}
          </div>
          <div className="text-gray-500 text-sm">
            {business.city}, {business.state}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};