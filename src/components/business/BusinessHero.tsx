import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Clock, CheckCircle, Image } from "lucide-react";
import type { Business, BusinessHour } from "@/types/business";
import { useState } from "react";

interface BusinessHeroProps {
  businessId: string;
}

export const BusinessHero = ({ businessId }: BusinessHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
          business_reviews:reviews (
            id,
            rating,
            comment,
            created_at,
            helpful_count,
            reply_count,
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
        business_hours: data.business_hours || [],
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
        reviews: data.business_reviews || [],
        is_open: data.is_open || false,
        price_range: data.price_range || null
      };

      return transformedData;
    }
  });

  if (isLoading) {
    return (
      <div className="h-[400px] bg-gray-100 animate-pulse"></div>
    );
  }

  if (!business) {
    return null;
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

  const formatBusinessHours = (openTime: string, closeTime: string) => {
    return `${openTime} - ${closeTime}`;
  };

  return (
    <div className="relative">
      {/* Hero Image Gallery */}
      <div 
        className="h-[500px] w-full bg-cover bg-center relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${photos[currentSlide]?.photo_url || business.hero_image || defaultImage})` 
        }}
      >
        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* See Photos Button */}
        <Button 
          variant="secondary" 
          className="absolute bottom-4 right-4 bg-white hover:bg-white/90 text-black flex items-center gap-2"
          onClick={() => {/* Add photo gallery modal handler */}}
        >
          <Image className="w-4 h-4" />
          See {photos.length}+ Photos
        </Button>

        <div className="container mx-auto h-full flex flex-col justify-end pb-8">
          <div className="flex items-end gap-6">
            {/* Business Logo */}
            {business.owner?.avatar_url && (
              <div className="w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg mb-4">
                <img 
                  src={business.owner.avatar_url} 
                  alt={`${business.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="text-white space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold">{business.name}</h1>
                {business.claimed && (
                  <div className="flex items-center gap-1 text-sm bg-green-500/20 px-2 py-1 rounded">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Claimed</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(Math.round(averageRating))}</div>
                <span className="text-sm">
                  {business.reviews?.length || 0} Reviews
                </span>
                <span className="text-sm">
                  {business.price_range && `• ${business.price_range}`}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {business.category && (
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    {business.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={business.is_open ? "text-green-400" : "text-red-400"}>
                  {business.is_open ? "Open" : "Closed"}
                </span>
                {business.business_hours && business.business_hours[0] && (
                  <span>
                    • {formatBusinessHours(business.business_hours[0].open_time, business.business_hours[0].close_time)}
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