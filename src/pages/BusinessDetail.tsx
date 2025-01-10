import { useParams } from "react-router-dom";
import { BusinessHero } from "@/components/business/BusinessHero";
import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import { BusinessHours } from "@/components/business/BusinessHours";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();

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
            photo_url
          ),
          owner:profiles (
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (!id) {
    return <div>Business not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  const amenities = [
    { name: "Free WiFi", available: true },
    { name: "Parking", available: true },
    { name: "Pet Friendly", available: false },
    { name: "Air Conditioning", available: true },
    { name: "Outdoor Seating", available: true },
    { name: "Delivery", available: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHero businessId={id} />
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <BusinessHours businessId={id} />
            <MenuItems businessId={id} />
            <Amenities amenities={amenities} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BusinessSidebar business={business} />
          </div>
        </div>
      </div>
    </div>
  );
}