import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BusinessHeader from "@/components/business/BusinessHeader";
import BusinessMainContent from "@/components/business/details/BusinessMainContent";
import BusinessSidebar from "@/components/business/BusinessSidebar";

const BusinessDetails = () => {
  const { id } = useParams();

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      console.log('Fetching business with ID:', id); // Debug log
      
      if (!id) throw new Error('Business ID is required');

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
            profiles:user_id(
              username,
              avatar_url
            ),
            review_responses(
              id,
              response_text,
              created_at
            ),
            review_photos(
              id,
              photo_url
            )
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
        console.error('Error fetching business:', error); // Debug log
        throw error;
      }

      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <BusinessHeader business={business} />
        </div>
        
        <div className="lg:col-span-8">
          <BusinessMainContent business={business} />
        </div>
        
        <div className="lg:col-span-4">
          <BusinessSidebar business={business} />
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;