import { Clock, MapPin, Star, Wifi, Car, PawPrint, Wind } from "lucide-react";
import type { Business } from "@/types/business";
import type { Json } from "@/integrations/supabase/types";

interface BusinessInfoProps {
  business: Business;
}

export const BusinessInfo = ({ business }: BusinessInfoProps) => {
  const getAmenityValue = (amenities: { [key: string]: boolean } | Json, key: string): boolean => {
    if (typeof amenities === 'string') {
      try {
        const parsed = JSON.parse(amenities);
        return parsed[key] || false;
      } catch {
        return false;
      }
    }
    if (typeof amenities === 'object' && amenities !== null) {
      return (amenities as { [key: string]: boolean })[key] || false;
    }
    return false;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">
          {business.address}, {business.city}, {business.state}
        </span>
      </div>

      {business.is_open !== undefined && (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className={`text-sm ${business.is_open ? 'text-green-600' : 'text-red-600'}`}>
            {business.is_open ? 'Open' : 'Closed'}
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {getAmenityValue(business.amenities, 'wifi') && (
          <Wifi className="w-4 h-4 text-gray-600" />
        )}
        {getAmenityValue(business.amenities, 'parking') && (
          <Car className="w-4 h-4 text-gray-600" />
        )}
        {getAmenityValue(business.amenities, 'petFriendly') && (
          <PawPrint className="w-4 h-4 text-gray-600" />
        )}
        {getAmenityValue(business.amenities, 'airConditioned') && (
          <Wind className="w-4 h-4 text-gray-600" />
        )}
      </div>
    </div>
  );
};