import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { BusinessGallery } from "@/components/business/BusinessGallery";
import { BusinessMainContent } from "@/components/business/details/BusinessMainContent";
import { BusinessRightSidebar } from "@/components/business/details/BusinessRightSidebar";
import type { Business, Review } from "@/types/business";
import { useToast } from "@/hooks/use-toast";

const BusinessDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: business, isLoading, error } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      console.log('Fetching business details...');
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
          reviews (
            id,
            rating,
            comment,
            created_at,
            profiles (
              username,
              avatar_url
            ),
            review_responses (
              id,
              response_text,
              created_at
            ),
            review_photos (
              id,
              photo_url
            )
          ),
          owner:profiles (
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching business:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load business details. Please try again.",
        });
        throw error;
      }

      // Transform the data to match our Business type
      const transformedData: Business = {
        ...data,
        reviews: data.reviews?.map((review: any) => ({
          ...review,
          review_responses: Array.isArray(review.review_responses) ? review.review_responses : [],
          review_photos: review.review_photos || []
        })) as Review[]
      };

      return transformedData;
    },
    retry: 2,
    retryDelay: 1000
  });

  if (isLoading) {
    return <div className="preloader"></div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error Loading Business</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div id="main-wrapper">
      {/* Featured Gallery */}
      <div className="featured-slick">
        <BusinessGallery photos={business.business_photos || []} />
      </div>

      {/* Business Header */}
      <BusinessHeader 
        business={{
          name: business.name,
          description: business.description || '',
          category: business.category,
          reviews_count: business.reviews?.length,
          rating: business.reviews?.reduce((acc, review) => acc + review.rating, 0) / (business.reviews?.length || 1),
          is_claimed: true,
          is_open: true,
          opening_time: business.business_hours?.[0]?.open_time,
          closing_time: business.business_hours?.[0]?.close_time
        }}
      />

      {/* Main Content */}
      <section className="gray py-5 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <BusinessMainContent business={business} />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <BusinessRightSidebar business={business} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDetails;