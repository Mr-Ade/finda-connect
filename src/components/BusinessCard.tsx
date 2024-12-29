import { Heart, MapPin, Mail, Star, Wifi, Car, Dog, Fan } from "lucide-react";
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
  isOpen?: boolean;
  isFeatured?: boolean;
}

export const BusinessCard = ({
  id,
  name,
  image,
  category,
  rating,
  reviewCount,
  location,
  isOpen,
  isFeatured,
}: BusinessCardProps) => {
  return (
    <Link to={`/business/${id}`}>
      <Card className="overflow-hidden group">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <div className="absolute top-3 left-3 flex gap-2">
            {isOpen !== undefined && (
              <span className={`px-2 py-1 text-xs text-white rounded ${isOpen ? 'bg-green-500' : 'bg-blue-500'}`}>
                {isOpen ? 'OPEN' : 'CLOSED'}
              </span>
            )}
            {isFeatured && (
              <span className="px-2 py-1 text-xs bg-red-500 text-white rounded">
                FEATURED
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-sm">({reviewCount} Reviews)</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex gap-3 mb-4">
            <Wifi className="w-4 h-4 text-gray-400" />
            <Car className="w-4 h-4 text-gray-400" />
            <Dog className="w-4 h-4 text-gray-400" />
            <Fan className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{category}</span>
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </Card>
    </Link>
  );
};