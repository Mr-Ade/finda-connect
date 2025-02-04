import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Clock, CheckCircle, Image, ImageOff, Loader } from "lucide-react";
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
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="h-[520px] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <ImageOff className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Business not found</p>
        </div>
      </div>
    );
  }

  const photos = business.business_photos || [];
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
      <div className="hero-gallery">
        {photos.slice(currentSlide, currentSlide + 3).map((photo, index) => (
          <div key={photo.id} className="hero-gallery-image">
            <img src={photo.photo_url || defaultImage} alt={photo.caption || "Business photo"} />
          </div>
        ))}
        
        <div className="hero-gallery-nav">
          <button onClick={prevSlide} className="prev-btn">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="next-btn">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="hero-content">
          <div className="business-logo">
            <img 
              src={business.owner?.avatar_url || defaultImage} 
              alt={`${business.name} logo`}
            />
          </div>

          <div className="business-info">
            <h1 className="business-name">{business.name}</h1>
            
            <div className="business-meta">
              <div className="business-rating">
                {renderStars(Math.round(averageRating))}
                <span>({business.reviews?.length || 0})</span>
              </div>

              {business.claimed && (
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Claimed</span>
                </div>
              )}

              <div className="business-tags">
                <span>•</span>
                <span>{business.keywords?.join(", ")}</span>
              </div>
            </div>

            <div className="business-hours">
              <Clock className="w-4 h-4" />
              <span className={business.is_open ? "text-green-400" : "text-red-400"}>
                {business.is_open ? "Open" : "Closed"}
              </span>
              <span>•</span>
              <span>{getCurrentHours()}</span>
            </div>
          </div>

          <Dialog open={showGallery} onOpenChange={setShowGallery}>
            <DialogTrigger asChild>
              <Button 
                variant="secondary"
                className="see-photos-btn"
                onClick={() => setShowGallery(true)}
              >
                <Image className="w-4 h-4" />
                See {photos.length}+ Photos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[90vh]">
              <PhotoGallery businessId={businessId} isOwner={false} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};