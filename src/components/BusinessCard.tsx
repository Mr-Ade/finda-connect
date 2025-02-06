import { MapPin } from "lucide-react";
import type { Business } from "@/types/business";

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{business.name}</h2>
      <p className="text-gray-600">{business.description}</p>
      <div className="flex items-center gap-2 text-gray-500 mt-2">
        <MapPin className="w-4 h-4" />
        <span>{business.city}, {business.state}</span>
      </div>
    </div>
  );
};
