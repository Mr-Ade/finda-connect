import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ListingFormActions } from "@/components/listings/edit/ListingFormActions";
import type { Json } from "@/integrations/supabase/types";

const uploadImages = async (files: File[], bucket: string) => {
  const uploadedUrls: string[] = [];
  
  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    uploadedUrls.push(publicUrl);
  }

  return uploadedUrls;
};

const AddListingForm = () => {
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
          description: "Please log in to create a listing",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      setProgress(10);

      // Insert business record with amenities as JSONB
      const { data: business, error: businessError } = await supabase
        .from('businesses')
        .insert({
          owner_id: session.user.id,
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
        .select()
        .single();

      if (businessError) throw businessError;

      setProgress(30);

      // Upload images
      if (formData.galleryImages.length > 0) {
        const imageUrls = await uploadImages(formData.galleryImages, 'business-images');
        
        const { error: photosError } = await supabase
          .from('business_photos')
          .insert(
            imageUrls.map(url => ({
              business_id: business.id,
              photo_url: url
            }))
          );

        if (photosError) throw photosError;
      }

      setProgress(50);

      // Insert working hours
      if (formData.workingHours.length > 0) {
        const { error: hoursError } = await supabase
          .from('business_hours')
          .insert(
            formData.workingHours.map(hour => ({
              business_id: business.id,
              day_of_week: hour.dayOfWeek,
              open_time: hour.openTime,
              close_time: hour.closeTime,
              is_closed: hour.isClosed,
            }))
          );

        if (hoursError) throw hoursError;
      }

      setProgress(70);

      // Insert menu items
      if (formData.menuItems.length > 0) {
        const { error: menuError } = await supabase
          .from('menu_items')
          .insert(
            formData.menuItems.map(item => ({
              business_id: business.id,
              name: item.name,
              description: item.description,
              price: item.price,
              category: item.category,
              image_url: item.imageUrl,
            }))
          );

        if (menuError) throw menuError;
      }

      setProgress(90);

      toast({
        title: "Success",
        description: "Your listing has been created successfully.",
      });

      setProgress(100);
      navigate(`/business/${business.id}`);
    } catch (error) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
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
      <ImageGallery />
      <MenuItems />
      <WorkingHours />
      <AmenitiesForm 
        amenities={formData.amenities} 
        onChange={(amenities) => formData.updateFormData('amenities', amenities)}
      />
      <SocialLinks />
      <ListingFormActions isSubmitting={isSubmitting} progress={progress} />
    </form>
  );
};

const AddListing = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Add Listing</h1>
        <nav className="text-sm breadcrumbs">
          <ol className="flex gap-2 text-muted-foreground">
            <li><a href="/">Home</a></li>
            <li>•</li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li>•</li>
            <li className="text-primary">Add Listing</li>
          </ol>
        </nav>
      </div>

      <BusinessFormProvider>
        <AddListingForm />
      </BusinessFormProvider>
    </DashboardLayout>
  );
};

export default AddListing;