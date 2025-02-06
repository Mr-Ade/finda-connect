import { Business } from "@/types/business";
import { BusinessSidebar } from "./BusinessSidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const SidebarWrapper = ({ business }: { business: Business }) => {
  const { id } = useParams();
  const { toast } = useToast();

  // Add a direct query to fetch latest business data
  const { data: latestBusiness } = useQuery({
    queryKey: ['business-details', id],
    queryFn: async () => {
      console.log('Fetching latest business details for ID:', id);
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          owner:profiles(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching business details:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch business details"
        });
        throw error;
      }

      console.log('Latest business data fetched:', data);
      return data;
    },
    initialData: business // Use the passed business as initial data
  });

  // Merge the latest data with passed props
  const businessData = {
    ...business,
    ...latestBusiness,
    address: latestBusiness?.address || business.address || '',
    city: latestBusiness?.city || business.city || '',
    state: latestBusiness?.state || business.state || '',
    zip_code: latestBusiness?.zip_code || business.zip_code || '',
    phone: latestBusiness?.phone || business.phone || '',
    website: latestBusiness?.website || business.website || '',
    email: latestBusiness?.email || business.email || '',
  };

  console.log("SidebarWrapper - Final business data:", businessData);

  return (
    <div className="lg:col-span-1 space-y-8">
      <BusinessSidebar business={{
        id: businessData.id,
        name: businessData.name,
        description: businessData.description || '',
        address: businessData.address,
        city: businessData.city,
        state: businessData.state,
        zip_code: businessData.zip_code,
        phone: businessData.phone,
        website: businessData.website,
        email: businessData.email,
        category: businessData.category,
        delivery_info: businessData.delivery_info ? {
          available: businessData.delivery_info.available || false,
          minimum_order: businessData.delivery_info.minimum_order,
          fee: businessData.delivery_info.fee,
          estimated_time: businessData.delivery_info.estimated_time
        } : undefined,
        owner: businessData.owner ? {
          username: businessData.owner.username || '',
          avatar_url: businessData.owner.avatar_url || '',
          full_name: businessData.owner.full_name || ''
        } : undefined
      }} />
    </div>
  );
};