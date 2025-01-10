import { Link } from "react-router-dom";
import { Wifi, Car, Dog, Fan } from "lucide-react";
import type { Business } from "@/types/business";

interface BusinessInfoProps {
  business: Business;
}

export const BusinessInfo = ({ business }: BusinessInfoProps) => {
  const tags = business.category ? business.category.split(',') : [];

  return (
    <>
      <Link 
        to={`/business/${business.id}`}
        className="block mb-2"
      >
        <h3 className="text-lg font-semibold hover:text-primary transition-colors">
          {business.name}
        </h3>
      </Link>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      {business.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>
      )}

      <div className="flex gap-4 mb-4">
        <Wifi className="w-5 h-5 text-gray-400" />
        <Car className="w-5 h-5 text-gray-400" />
        <Dog className="w-5 h-5 text-gray-400" />
        <Fan className="w-5 h-5 text-gray-400" />
      </div>
    </>
  );
};