import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Business } from "@/types/business";
import { BusinessForm } from "@/components/business/BusinessForm";
import { PageHeader } from "@/components/PageHeader";

export default function EditListing() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      if (!id) throw new Error('Business ID is required');
      
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
          menu_items (
            id,
            name,
            description,
            price,
            category,
            image_url
          ),
          reviews (
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
        .eq('id', id)
        .single();

      if (error) throw error;

      return data as unknown as Business;
    },
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error loading business",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    }
  });

  if (!id) {
    return <div>Business ID is required</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (updatedBusiness: Partial<Business>) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update(updatedBusiness)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Business updated successfully",
      });

      navigate(`/business/${id}`);
    } catch (error) {
      console.error('Error updating business:', error);
      toast({
        title: "Error",
        description: "Failed to update business",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        heading="Edit Business Listing"
        text="Update your business information"
      />

      <div className="mt-8">
        <BusinessForm
          business={business}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEdit
        />
      </div>
    </div>
  );
}