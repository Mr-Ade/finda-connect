import { Card } from "@/components/ui/card";
import { Star, Check, MapPin } from "lucide-react";

interface BusinessHeaderProps {
  business: {
    name: string;
    description: string;
    category: string;
    reviews_count?: number;
    rating?: number;
    is_claimed?: boolean;
    is_open?: boolean;
    opening_time?: string;
    closing_time?: string;
  };
}

export const BusinessHeader = ({ business }: BusinessHeaderProps) => {
  return (
    <div className="featured_text_wrapper">
      <div className="container">
        <div className="featured_text_info">
          <div className="featured_text_description">
            <div className="left_featured_text">
              <h1 className="text-3xl font-bold text-white mb-2">{business.name}</h1>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < (business.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
                <span className="text-white">{business.reviews_count || 0} Reviews</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                {business.is_claimed && (
                  <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    <Check className="w-4 h-4 inline-block mr-1" />
                    Claimed
                  </span>
                )}
                <span className="text-white">{business.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-sm ${business.is_open ? 'text-green-400' : 'text-red-400'}`}>
                  {business.is_open ? 'Open' : 'Closed'}
                </span>
                {(business.opening_time && business.closing_time) && (
                  <span className="text-white text-sm">
                    {business.opening_time} - {business.closing_time}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};