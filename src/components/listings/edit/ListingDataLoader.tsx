import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { Loader2 } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface ListingDataLoaderProps {
  children: React.ReactNode;
}

export const ListingDataLoader = ({ children }: ListingDataLoaderProps) => {
  const { id } = useParams();
  const { toast } = useToast();
  const { updateFormData } = useBusinessForm();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (business && !initialDataLoaded) {
      updateFormData('name', business.name);
      updateFormData('description', business.description || '');
      updateFormData('category', business.category);
      updateFormData('keywords', business.keywords || []);
      updateFormData('address', business.address);
      updateFormData('city', business.city);
      updateFormData('state', business.state);
      updateFormData('zipCode', business.zip_code);
      updateFormData('phone', business.phone || '');
      updateFormData('email', business.email || '');
      updateFormData('website', business.website || '');
      
      const amenities = business.amenities as Json[] || [];
      updateFormData('amenities', amenities.map(item => ({
        name: String(item),
        available: true
      })));

      const workingHours = business.business_hours as Json[] || [];
      updateFormData('workingHours', workingHours.map(hour => ({
        dayOfWeek: Number((hour as any).dayOfWeek),
        openTime: String((hour as any).openTime),
        closeTime: String((hour as any).closeTime),
        isClosed: Boolean((hour as any).isClosed)
      })));

      const menuItems = (business as any).menu_items || [];
      updateFormData('menuItems', menuItems);

      const socialLinks = business.social_links as { [key: string]: string } || {};
      updateFormData('socialLinks', socialLinks);

      setInitialDataLoaded(true);
    }
  }, [business, initialDataLoaded, updateFormData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Business not found</p>
      </div>
    );
  }

  return <>{children}</>;
};