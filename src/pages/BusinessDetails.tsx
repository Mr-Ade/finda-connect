import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { BusinessGallery } from "@/components/business/BusinessGallery";
import { BusinessMainContent } from "@/components/business/details/BusinessMainContent";
import { BusinessRightSidebar } from "@/components/business/details/BusinessRightSidebar";
import type { Business } from "@/types/business";

const BusinessDetails = () => {
  const { id } = useParams();

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      console.log("Fetching business data for ID:", id);
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos(*),
          menu_items(*),
          business_hours(*),
          reviews(
            id,
            rating,
            comment,
            created_at,
            profiles:user_id(username, avatar_url),
            review_responses(id, response_text, created_at),
            review_photos(id, photo_url)
          ),
          owner:owner_id(
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching business:", error);
        throw error;
      }
      
      console.log("Fetched business data:", data);
      return data as unknown as Business;
    },
    enabled: !!id
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!business) {
    return <div className="flex items-center justify-center min-h-screen">Business not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Featured Gallery Section */}
      <div className="featured-slick relative">
        <BusinessGallery photos={business.business_photos || []} />
        <BusinessHeader 
          business={{
            name: business.name,
            description: business.description || "",
            category: business.category,
            reviews_count: business.reviews?.length,
            rating: business.reviews?.reduce((acc, review) => acc + review.rating, 0) / (business.reviews?.length || 1),
            is_claimed: true,
            is_open: true,
            opening_time: "11:00 AM",
            closing_time: "12:00 AM"
          }}
        />
      </div>

      {/* Main Content Section */}
      <section className="bg-gray-100 py-5 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <BusinessMainContent business={business} />
            </div>
            <div className="lg:col-span-4 relative z-10">
              <BusinessRightSidebar business={business} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDetails;