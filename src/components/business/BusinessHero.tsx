import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Clock, CheckCircle, Image } from "lucide-react";
import type { Business, BusinessHour } from "@/types/business";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PhotoGallery } from "./PhotoGallery";

interface BusinessHeroProps {
  businessId: string;
}

export const BusinessHero = ({ businessId }: BusinessHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      if (!businessId) throw new Error('Business ID is required');
      
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos (
            id,
            photo_url,
            caption,
            order_index
          ),
          business_hours (
            id,
            day_of_week,
            open_time,
            close_time,
            is_closed
          ),
          business_reviews (
            id,
            rating,
            review_text,
            created_at,
            helpful_votes,
            reply_text,
            reply_date,
            user_id,
            profiles (
              username,
              avatar_url,
              full_name
            )
          ),
          owner:profiles!businesses_owner_id_fkey (
            id,
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', businessId)
        .single();

      if (error) throw error;

      const transformedData: Business = {
        ...data,
        business_hours: data.business_hours as BusinessHour[],
        amenities: data.amenities ? 
          (typeof data.amenities === 'string' ? 
            JSON.parse(data.amenities) : 
            data.amenities) : {},
        faqs: data.faqs ? 
          (typeof data.faqs === 'string' ? 
            JSON.parse(data.faqs) : 
            data.faqs) : [],
        delivery_info: data.delivery_info ? 
          (typeof data.delivery_info === 'string' ? 
            JSON.parse(data.delivery_info) : 
            data.delivery_info) : undefined,
        social_links: data.social_links ? 
          (typeof data.social_links === 'string' ? 
            JSON.parse(data.social_links) : 
            data.social_links) : {},
        reviews: data.business_reviews ? data.business_reviews.map(review => ({
          id: review.id,
          rating: review.rating,
          review_text: review.review_text,
          created_at: review.created_at,
          helpful_votes: review.helpful_votes || 0,
          reply_count: 0,
          user_id: review.user_id,
          profiles: review.profiles,
          review_photos: [],
          review_responses: review.reply_text ? [{
            id: review.id,
            response_text: review.reply_text,
            created_at: review.reply_date || review.created_at
          }] : []
        })) : [],
        is_open: data.is_open || false,
        price_range: data.price_range || null
      };

      return transformedData;
    }
  });

  if (isLoading) {
    return (
      <div className="h-[520px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="h-[520px] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Business not found</p>
        </div>
      </div>
    );
  }

  const photos = [
    ...(business.hero_image ? [{ id: 'hero', photo_url: business.hero_image }] : []),
    ...(business.gallery_images || []).map((url, index) => ({
      id: `gallery-${index}`,
      photo_url: url
    })),
    ...(business.business_photos || [])
  ];

  const defaultImage = '/placeholder.svg';

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const averageRating = business.reviews?.length 
    ? business.reviews.reduce((acc, review) => acc + review.rating, 0) / business.reviews.length
    : 0;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const getCurrentHours = () => {
    const today = new Date().getDay();
    const currentHours = business.business_hours?.find(h => h.day_of_week === today);
    
    if (!currentHours || currentHours.is_closed) {
      return "Closed";
    }
    
    return `${formatTime(currentHours.open_time)} - ${formatTime(currentHours.close_time)}`;
  };

  return (
    <div className="relative">
      <div className="hero-gallery grid grid-cols-3 gap-2 h-[520px] relative overflow-hidden">
        {photos.slice(currentSlide, currentSlide + 3).map((photo, index) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <div className={cn(
                "hero-gallery-image cursor-pointer relative overflow-hidden",
                index === 0 ? "col-span-2 row-span-2" : ""
              )}>
                <img 
                  src={photo.photo_url || defaultImage} 
                  alt={`${business.name} photo`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white bg-black/50 px-4 py-2 rounded-full">View Photo</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <img 
                src={photo.photo_url || defaultImage}
                alt={`${business.name} photo`}
                className="w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        ))}
        
        <div className="absolute bottom-4 right-4 space-x-2 z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={prevSlide}
            className="bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextSlide}
            className="bg-white/80 hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowGallery(true)}
            className="bg-white/80 hover:bg-white ml-2"
          >
            View All Photos
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center space-x-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({business.reviews?.length || 0} reviews)</span>
          </div>

          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="font-medium">{getCurrentHours()}</span>
          </div>

          {business.is_verified && (
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">Verified</span>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-6xl">
          <PhotoGallery photos={photos} businessName={business.name} />
        </DialogContent>
      </Dialog>
    </div>
  );
};