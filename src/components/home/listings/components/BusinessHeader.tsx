import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white"
        onClick={handleBookmarkClick}
      >
        <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
      </Button>

      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <span className={`px-2 py-1 text-xs text-white rounded ${isOpen ? 'bg-green-500' : 'bg-blue-500'}`}>
          {isOpen ? 'Open' : 'Closed'}
        </span>
        {business.status === 'approved' && (
          <span className="bg-primary text-white px-2 py-1 rounded text-sm">
            Featured
          </span>
        )}
      </div>

      <Link to={`/business/${business.id}`}>
        <img
          src={business.business_photos?.[0]?.photo_url || "/placeholder.svg"}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
      </Link>
    </div>
  );
};