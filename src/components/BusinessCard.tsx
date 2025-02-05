import { MapPin } from "lucide-react";
import type { Business } from "@/types/business";

export interface BusinessCardProps {
  business: Business;
  id?: string;
  name?: string;
  image?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  isOpen?: boolean;
  isFeatured?: boolean;
  description?: string;
}

export const BusinessCard = ({ 
  business,
  id,
  name,
  image,
  category,
  rating,
  reviewCount,
  location,
  latitude,
  longitude,
  isOpen,
  isFeatured,
  description
}: BusinessCardProps) => {
  // Use either passed props or business object properties
  const displayName = name || business?.name;
  const displayDescription = description || business?.description;
  const displayLocation = location || (business ? `${business.city}, ${business.state}` : '');

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{displayName}</h2>
      <p className="text-gray-600">{displayDescription}</p>
      <div className="flex items-center gap-2 text-gray-500 mt-2">
        <MapPin className="w-4 h-4" />
        <span>{displayLocation}</span>
      </div>
    </div>
  );
};