import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Business } from "@/types/business";
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
          )
        `)
        .eq('id', businessId)
        .single();

      if (error) throw error;

      // Transform the data to match our Business type
      const transformedData: Business = {
        ...data,
        business_photos: (data.business_photos || []).map(photo => ({
          ...photo,
          order_index: photo.order_index || 0
        })),
        business_hours: data.business_hours ? data.business_hours as Business['business_hours'] : [],
        amenities: data.amenities ? data.amenities as Business['amenities'] : {},
        faqs: data.faqs ? data.faqs as Business['faqs'] : [],
        delivery_info: data.delivery_info ? data.delivery_info as Business['delivery_info'] : undefined,
        social_links: data.social_links ? data.social_links as Business['social_links'] : {},
        business_reviews: data.business_reviews ? data.business_reviews.map(review => ({
          id: review.id,
          rating: review.rating,
          review_text: review.review_text,
          review_date: review.review_date,
          helpful_votes: review.helpful_votes,
          user_id: review.user_id,
          status: review.status,
          created_at: review.created_at,
          updated_at: review.updated_at
        })) : [],
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
              <h1 className="text-4xl font-bold">{business.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="container mx-auto">
        <div className="bg-white shadow-lg rounded-lg -mt-8 p-4 relative z-10">
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="ml-auto">
              See {photos.length}+ Photos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};