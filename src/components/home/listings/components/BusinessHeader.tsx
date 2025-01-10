import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Business } from "@/types/business";

interface BusinessHeaderProps {
  business: Business;
  isOpen: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const BusinessHeader = ({ 
  business, 
  isOpen, 
  isBookmarked, 
  onToggleBookmark 
}: BusinessHeaderProps) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleBookmarkClick = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to bookmark businesses",
        variant: "destructive",
      });
      return;
    }
    onToggleBookmark();
  };

  return (
    <div className="relative">
      <Link to={`/business/${business.id}`}>
        <img
          src={business.business_photos?.[0]?.photo_url || "/placeholder.svg"}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
      </Link>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg"
        onClick={handleBookmarkClick}
      >
        <Heart 
          className={`h-5 w-5 transition-colors ${isBookmarked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
        />
      </Button>

      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <span 
          className={`px-2 py-1 text-xs font-medium text-white rounded ${
            isOpen ? 'bg-green-500' : 'bg-blue-500'
          } uppercase`}
        >
          {isOpen ? 'Open' : 'Closed'}
        </span>
        {business.status === 'approved' && (
          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium uppercase">
            Featured
          </span>
        )}
      </div>
    </div>
  );
};