import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookmarkButton } from "@/components/business/BookmarkButton";
import { CheckInButton } from "@/components/business/CheckInButton";
import { Button } from "@/components/ui/button";
import { Share2, MapPin, Star } from "lucide-react";
import type { Business } from "@/types/business";
import type { Database } from "@/integrations/supabase/types";

interface BusinessHeroProps {
  businessId: string;
}

export const BusinessHero = ({ businessId }: BusinessHeroProps) => {
  const { data: business, isLoading } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_reviews(rating),
          owner:profiles(*)
        `)
        .eq('id', businessId)
        .single();

      if (error) throw error;

      // Transform the data to match our Business type
      const transformedData: Business = {
        ...data,
        business_hours: data.business_hours as Business['business_hours'],
        amenities: data.amenities as Business['amenities'],
        faqs: data.faqs as Business['faqs'],
        delivery_info: data.delivery_info as Business['delivery_info'],
        social_links: data.social_links as Business['social_links'],
        business_reviews: data.business_reviews as Business['business_reviews']
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

  return (
    <div className="relative">
      {/* Hero Image */}
      <div 
        className="h-[400px] w-full bg-cover bg-center relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${business.hero_image || '/placeholder.svg'})` 
        }}
      >
        <div className="container mx-auto h-full flex flex-col justify-end pb-8">
          <div className="text-white space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-primary text-white text-sm font-medium rounded">
                {business.category}
              </span>
              {business.status === 'approved' && (
                <span className="px-2 py-1 bg-green-500 text-white text-sm font-medium rounded">
                  Verified
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
          </div>
        </div>
      </div>
    </div>
  );
};