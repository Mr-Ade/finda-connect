
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

      // Update business record with all fields
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
          social_links: formData.socialLinks as Json,
          // Add location fields
          latitude: formData.latitude,
          longitude: formData.longitude,
          // Add hero image and gallery images if changed
          ...(formData.featuredImage && {
            hero_image: await uploadImage(formData.featuredImage)
          }),
          ...(formData.galleryImages?.length && {
            gallery_images: await Promise.all(formData.galleryImages.map(uploadImage))
          })
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

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('business-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('business-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ListingInfo />
      <LocationInfo />
      <ImageGallery />
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
