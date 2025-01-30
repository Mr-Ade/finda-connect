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
          ),
          owner:profiles!businesses_owner_id_fkey (
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', businessId)
        .single();

      if (error) throw error;

      // Transform the data to match our Business type
      const transformedData: Business = {
        ...data,
        business_hours: data.business_hours ? data.business_hours as Business['business_hours'] : [],
        amenities: data.amenities ? data.amenities as Business['amenities'] : {},
        faqs: data.faqs ? data.faqs as Business['faqs'] : [],
        delivery_info: data.delivery_info ? data.delivery_info as Business['delivery_info'] : undefined,
        social_links: data.social_links ? data.social_links as Business['social_links'] : {},
        business_photos: (data.business_photos || []).map(photo => ({
          ...photo,
          order_index: photo.order_index || 0
        })),
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
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary text-white text-sm font-medium rounded">
                  {business.category}
                </span>
                {business.status === 'approved' && (
                  <span className="px-2 py-1 bg-green-500 text-white text-sm font-medium rounded flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Verified
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold">{business.name}</h1>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span>{business.city}, {business.state}</span>
                </div>
              </div>
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