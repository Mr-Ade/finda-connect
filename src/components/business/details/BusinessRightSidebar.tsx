import { useEffect } from "react";
import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import type { Business } from "@/types/business";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BusinessRightSidebarProps {
  business: Business;
}

export const BusinessRightSidebar = ({ business }: BusinessRightSidebarProps) => {
  const { toast } = useToast();
  
  // Fetch real-time owner data
  const { data: ownerData, refetch: refetchOwner } = useQuery({
    queryKey: ['business-owner', business.owner_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', business.owner_id)
        .single();

      if (error) {
        console.error("Error fetching owner data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load business owner details"
        });
        throw error;
      }
      return data;
    },
    enabled: !!business.owner_id
  });

  // Subscribe to real-time profile changes
  useEffect(() => {
    if (!business.owner_id) return;

    const channel = supabase
      .channel('owner_profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${business.owner_id}`
        },
        () => {
          console.log('Owner profile changed, refreshing...');
          refetchOwner();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [business.owner_id, refetchOwner]);

  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 h-fit">
      <BusinessSidebar 
        business={{
          id: business.id,
          name: business.name,
          description: business.description || "",
          address: business.address,
          city: business.city,
          state: business.state,
          zip_code: business.zip_code,
          phone: business.phone,
          website: business.website,
          email: business.email,
          owner: ownerData ? {
            username: ownerData.username || "Anonymous",
            avatar_url: ownerData.avatar_url || "/placeholder.svg",
            full_name: ownerData.full_name || "Anonymous"
          } : undefined
        }} 
      />
    </div>
  );
};