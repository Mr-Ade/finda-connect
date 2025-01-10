import { MapPin, Mail } from "lucide-react";
import type { Business } from "@/types/business";

interface BusinessFooterProps {
  business: Business;
}

export const BusinessFooter = ({ business }: BusinessFooterProps) => {
  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center gap-2 text-gray-500">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">
          {business.city}, {business.state}
        </span>
      </div>
      <button className="text-gray-400 hover:text-gray-600 transition-colors">
        <Mail className="w-5 h-5" />
      </button>
    </div>
  );
};