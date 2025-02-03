import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ListingInfo } from "@/components/listings/ListingInfo";
import { LocationInfo } from "@/components/listings/LocationInfo";
import { ImageGallery } from "@/components/listings/ImageGallery";
import { MenuItems } from "@/components/listings/MenuItems";
import { WorkingHours } from "@/components/listings/WorkingHours";
import { AmenitiesForm } from "@/components/listings/AmenitiesForm";
import { SocialLinks } from "@/components/listings/SocialLinks";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { BusinessFormProvider, useBusinessForm } from "@/contexts/BusinessFormContext";
import { ListingFormHeader } from "@/components/listings/edit/ListingFormHeader";
import { ListingFormActions } from "@/components/listings/edit/ListingFormActions";
import { ListingDataLoader } from "@/components/listings/edit/ListingDataLoader";
import type { Json } from "@/integrations/supabase/types";

const EditListingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateFormData, isSubmitting, setIsSubmitting } = useBusinessForm();
  const [progress, setProgress] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  // Check if user is owner
  const checkOwnership = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const { data: business } = await supabase
      .from('businesses')
      .select('owner_id')
      .eq('id', id)
      .single();

    return business?.owner_id === session.user.id;
  };

  // Set ownership status on component mount
  useState(() => {
    checkOwnership().then(setIsOwner);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgress(0);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to update your listing",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      setProgress(30);

      // Update business record
      const { error: businessError } = await supabase
        .from('businesses')
        .update({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          phone: formData.phone,
          website: formData.website,
          email: formData.email,
          keywords: formData.keywords,
          amenities: formData.amenities as Json,
          business_hours: formData.workingHours.map(h => ({
            dayOfWeek: h.dayOfWeek,
            openTime: h.openTime,
            closeTime: h.closeTime,
            isClosed: h.isClosed
          })) as Json,
          social_links: formData.socialLinks as Json
        })
        .eq('id', id);

      if (businessError) throw businessError;

      setProgress(90);

      toast({
        title: "Success",
        description: "Your listing has been updated successfully.",
      });

      setProgress(100);
      navigate(`/business/${id}`);
    } catch (error) {
      console.error("Error updating listing:", error);
      toast({
        title: "Error",
        description: "Failed to update listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ListingInfo />
      <LocationInfo />
      <ImageGallery businessId={id!} isOwner={isOwner} />
      <MenuItems />
      <WorkingHours />
      <AmenitiesForm 
        amenities={formData.amenities} 
        onChange={(amenities) => updateFormData('amenities', amenities)}
      />
      <SocialLinks />
      <ListingFormActions isSubmitting={isSubmitting} progress={progress} />
    </form>
  );
};

const EditListing = () => {
  return (
    <DashboardLayout>
      <BusinessFormProvider>
        <ListingDataLoader>
          <ListingFormHeader isLoading={false} />
          <EditListingForm />
        </ListingDataLoader>
      </BusinessFormProvider>
    </DashboardLayout>
  );
};

export default EditListing;