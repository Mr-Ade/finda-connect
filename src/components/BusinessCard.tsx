import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BusinessCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
}

export const BusinessCard = ({
  id,
  name,
  image,
  category,
  rating,
  reviewCount,
  location,
}: BusinessCardProps) => {
  return (
    <Link to={`/business/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "fill-current" : "fill-none"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({reviewCount})</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>{category}</p>
            <p>{location}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};