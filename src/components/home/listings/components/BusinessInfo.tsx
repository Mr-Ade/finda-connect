import { Link } from "react-router-dom";
import { MapPin, Star, Wifi, Car, Dog, Fan } from "lucide-react";
import type { Business } from "@/types/business";

interface BusinessInfoProps {
  business: Business;
}

export const BusinessInfo = ({ business }: BusinessInfoProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{business.name}</h2>
      <p className="text-gray-600">{business.description}</p>
      <div className="flex items-center mt-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        <span className="ml-1 text-sm text-gray-500">{business.address}, {business.city}, {business.state} {business.zip_code}</span>
      </div>
      <div className="flex items-center mt-2">
        <Star className="w-4 h-4 text-yellow-400" />
        <span className="ml-1 text-sm text-gray-500">{business.reviews?.length || 0} Reviews</span>
      </div>
      <div className="flex items-center mt-2">
        {business.amenities.wifi && <Wifi className="w-5 h-5 text-gray-500" />}
        {business.amenities.parking && <Car className="w-5 h-5 text-gray-500" />}
        {business.amenities.petFriendly && <Dog className="w-5 h-5 text-gray-500" />}
        {business.amenities.airConditioned && <Fan className="w-5 h-5 text-gray-500" />}
      </div>
      <Link to={`/business/${business.id}`} className="mt-4 inline-block text-primary hover:underline">
        View Details
      </Link>
    </div>
  );
};
