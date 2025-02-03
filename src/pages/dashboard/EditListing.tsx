import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ListingInfo } from "@/components/listings/ListingInfo";
import { LocationInfo } from "@/components/listings/LocationInfo";
import { ImageGallery } from "@/components/listings/ImageGallery";
import { MenuItems } from "@/components/listings/MenuItems";
import { WorkingHours } from "@/components/listings/WorkingHours";
import { Amenities } from "@/components/listings/Amenities";
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
  const { formData, isSubmitting, setIsSubmitting } = useBusinessForm();
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
          amenities: formData.amenities.map(a => a.name),
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

      setProgress(50);

      // Upload new images if any
      if (formData.logo || formData.featuredImage || formData.galleryImages.length > 0) {
        await uploadImages(id!);
      }

      setProgress(70);

      // Update working hours
      if (formData.workingHours.length > 0) {
        // First delete existing hours
        await supabase
          .from('business_hours')
          .delete()
          .eq('business_id', id);

        // Then insert new hours
        const { error: hoursError } = await supabase
          .from('business_hours')
          .insert(
            formData.workingHours.map(hour => ({
              business_id: id,
              day_of_week: hour.dayOfWeek,
              open_time: hour.openTime,
              close_time: hour.closeTime,
              is_closed: hour.isClosed,
            }))
          );

        if (hoursError) throw hoursError;
      }

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

  const uploadImages = async (businessId: string) => {
    const uploadPromises = [];
    
    if (formData.logo) {
      const logoExt = formData.logo.name.split(".").pop();
      const logoPath = `${businessId}/logo.${logoExt}`;
      uploadPromises.push(
        supabase.storage
          .from("business-images")
          .upload(logoPath, formData.logo)
      );
    }

    if (formData.featuredImage) {
      const featuredExt = formData.featuredImage.name.split(".").pop();
      const featuredPath = `${businessId}/featured.${featuredExt}`;
      uploadPromises.push(
        supabase.storage
          .from("business-images")
          .upload(featuredPath, formData.featuredImage)
      );
    }

    for (const [index, file] of formData.galleryImages.entries()) {
      const ext = file.name.split(".").pop();
      const path = `${businessId}/gallery-${index}.${ext}`;
      uploadPromises.push(
        supabase.storage
          .from("business-images")
          .upload(path, file)
      );
    }

    return Promise.all(uploadPromises);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ListingInfo />
      <LocationInfo />
      <ImageGallery />
      <MenuItems />
      <WorkingHours />
      <Amenities />
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