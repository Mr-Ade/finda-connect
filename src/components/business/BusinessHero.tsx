import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookmarkButton } from "@/components/business/BookmarkButton";
import { CheckInButton } from "@/components/business/CheckInButton";
import { Button } from "@/components/ui/button";
import { Share2, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_reviews(rating),
          business_photos(id, photo_url, order_index),
          owner:profiles(*)
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
        business_reviews: data.business_reviews || [],
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

  // Calculate average rating
  const reviews = business.business_reviews || [];
  const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 'N/A';

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
                {business.is_open && (
                  <span className="px-2 py-1 bg-green-500 text-white text-sm font-medium rounded">
                    Open Now
                  </span>
                )}
                {!business.is_open && (
                  <span className="px-2 py-1 bg-red-500 text-white text-sm font-medium rounded">
                    Closed
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold">{business.name}</h1>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>{averageRating}</span>
                  <span className="text-gray-300">({reviews.length} reviews)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{business.city}, {business.state}</span>
                </div>

                {business.price_range && (
                  <div className="text-gray-300">
                    {business.price_range}
                  </div>
                )}
              </div>

              {/* Tags/Categories */}
              <div className="flex items-center gap-2 text-sm">
                {business.category.split(',').map((cat, index) => (
                  <span key={index} className="text-gray-300">
                    {cat.trim()}{index < business.category.split(',').length - 1 && '•'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="container mx-auto">
        <div className="bg-white shadow-lg rounded-lg -mt-8 p-4 relative z-10">
          <div className="flex flex-wrap gap-4">
            <BookmarkButton businessId={businessId} />
            <CheckInButton businessId={businessId} />
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" className="ml-auto">
              See {photos.length}+ Photos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};