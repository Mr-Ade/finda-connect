import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Business } from "@/types/business";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Transform the data to match Business type
      const transformedData: Business = {
        ...data,
        business_hours: data.business_hours ? JSON.parse(data.business_hours as string) : [],
        amenities: data.amenities || {},
        faqs: data.faqs ? JSON.parse(data.faqs as string) : [],
        delivery_info: data.delivery_info ? JSON.parse(data.delivery_info as string) : undefined,
        social_links: data.social_links ? JSON.parse(data.social_links as string) : {}
      };

      return transformedData;
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const handleUpdate = async () => {
    if (!business) return;

    // Transform business data back to database format
    const dbData = {
      ...business,
      business_hours: JSON.stringify(business.business_hours),
      amenities: JSON.stringify(business.amenities),
      faqs: JSON.stringify(business.faqs),
      delivery_info: business.delivery_info ? JSON.stringify(business.delivery_info) : null,
      social_links: JSON.stringify(business.social_links)
    };

    const { error } = await supabase
      .from('businesses')
      .update(dbData)
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Business updated successfully!",
      });
    }
  };

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Listing</h1>
      <Input
        value={business.name}
        onChange={(e) => setBusiness({ ...business, name: e.target.value })}
        placeholder="Business Name"
        className="mb-4"
      />
      <Textarea
        value={business.description || ''}
        onChange={(e) => setBusiness({ ...business, description: e.target.value })}
        placeholder="Business Description"
        className="mb-4"
      />
      <Button onClick={handleUpdate} className="mt-4">Update Listing</Button>
    </div>
  );
};

export default EditListing;