import { Heart, MapPin, Mail, Star, Wifi, Car, Dog, Fan, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isBusinessOpen } from "@/lib/utils/businessHours";
import type { BusinessHour } from "@/lib/utils/businessHours";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Amenities } from "@/types/amenities";

interface BusinessCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  isFeatured?: boolean;
  description?: string;
  tags?: string[];
  authorImage?: string;
  amenities?: Partial<Amenities>;
  email?: string;
  authorId?: string;
}

export const BusinessCard = ({
  id,
  name,
  image,
  category,
  rating,
  reviewCount,
  location,
  isFeatured,
  description,
  tags = [],
  authorImage,
  amenities = {
    wifi: false,
    parking: false,
    petFriendly: false,
    airConditioned: false
  },
  email,
  authorId
}: BusinessCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { data: hours } = useQuery({
    queryKey: ['business-hours', id],
    queryFn: async () => {
      console.log('Fetching business hours for:', id);
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('business_id', id)
        .order('day_of_week');

      if (error) {
        console.error('Error fetching business hours:', error);
        throw error;
      }

      return data as BusinessHour[];
    },
  });

  // Fetch reviews for this business
  const { data: reviews } = useQuery({
    queryKey: ['business-reviews', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('business_id', id);

      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }

      return data;
    },
  });

  // Calculate actual rating and review count
  const actualRating = reviews?.length 
    ? Number((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1))
    : 0;
  
  const actualReviewCount = reviews?.length || 0;

  const isOpen = isBusinessOpen(hours || null);

  // Generate blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  )}`;

  const handleContactClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to contact the business owner",
        variant: "destructive"
      });
      return;
    }
    setIsContactOpen(true);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!authorId) {
      toast({
        title: "Error",
        description: "Cannot start conversation with this business owner",
        variant: "destructive"
      });
      return;
    }
    navigate(`/messages?userId=${authorId}`);
  };

  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <Link to={`/business/${id}`} className="block h-full">
      <Card className="overflow-hidden group relative h-full transition-all duration-200 hover:shadow-lg">
        {/* Image container */}
        <div className="relative h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{
              backgroundColor: '#f3f4f6',
              backgroundImage: `url(${blurDataURL})`,
              backgroundSize: 'cover'
            }}
          />

          {/* Author image */}
          {authorImage && (
            <div className="absolute -bottom-6 right-4">
              <img 
                src={authorImage} 
                alt="Author"
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
            </div>
          )}

          <button 
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5 text-gray-600" />
          </button>

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 text-xs font-medium text-white rounded ${isOpen ? 'bg-green-500' : 'bg-red-500'} uppercase`}>
              {isOpen ? 'Open' : 'Closed'}
            </span>
          </div>

          {/* Rating badge */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-md px-3 py-1.5">
              <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                {actualRating}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= actualRating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  ({actualReviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            <span className="text-sm text-primary uppercase">{category}</span>
            
            {description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {description}
              </p>
            )}

            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <MapPin 
                className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" 
                onClick={handleLocationClick}
              />
              <span className="text-sm line-clamp-1">{location}</span>
            </div>

            {/* Amenities */}
            <div className="flex justify-between mt-4">
              <div className="flex gap-4 text-gray-400">
                {amenities.wifi && <Wifi className="w-5 h-5" />}
                {amenities.parking && <Car className="w-5 h-5" />}
                {amenities.petFriendly && <Dog className="w-5 h-5" />}
                {amenities.airConditioned && <Fan className="w-5 h-5" />}
              </div>
              <div className="flex gap-2">
                {email && (
                  <Mail 
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors" 
                    onClick={handleContactClick}
                  />
                )}
                {authorId && (
                  <MessageSquare 
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors"
                    onClick={handleMessageClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {email && (
              <Button
                onClick={() => window.location.href = `mailto:${email}`}
                className="w-full"
              >
                Send Email
              </Button>
            )}
            <Button
              onClick={handleMessageClick}
              className="w-full"
            >
              Send Direct Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Link>
  );
};
