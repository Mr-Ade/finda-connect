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

      if (error) throw error;
      return data as unknown as Business;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div>
      <BusinessHeader 
        business={{
          name: business.name,
          description: business.description || "",
          category: business.category,
          reviews_count: business.reviews?.length,
          rating: business.reviews?.reduce((acc, review) => acc + review.rating, 0) / (business.reviews?.length || 1),
          is_claimed: true,
          is_open: true
        }}
      />
      <BusinessGallery photos={business.business_photos || []} />

      <section className="gray py-5 position-relative">
        <div className="container">
          <div className="row">
            <BusinessMainContent business={business} />
            <BusinessRightSidebar business={business} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDetails;