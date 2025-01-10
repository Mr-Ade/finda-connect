import { Link } from "react-router-dom";
import { Wifi, Car, Dog, Wind } from "lucide-react";
import type { Business } from "@/types/business";

interface BusinessInfoProps {
  business: Business;
}

export const BusinessInfo = ({ business }: BusinessInfoProps) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <img
          src="/placeholder.svg"
          alt="Author"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex gap-2 text-xs text-gray-500">
            {business.category && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {business.category}
              </span>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">
        <Link to={`/business/${business.id}`} className="hover:text-primary">
          {business.name}
        </Link>
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {business.description}
      </p>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">Facilities:</div>
        <div className="flex gap-3">
          <Wifi className="h-4 w-4 text-gray-400" />
          <Car className="h-4 w-4 text-gray-400" />
          <Dog className="h-4 w-4 text-gray-400" />
          <Wind className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </>
  );
};