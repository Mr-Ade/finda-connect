import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ListingInfo } from "@/components/listings/ListingInfo";
import { LocationInfo } from "@/components/listings/LocationInfo";
import { ImageGallery } from "@/components/listings/ImageGallery";
import { MenuItems } from "@/components/listings/MenuItems";
import { WorkingHours } from "@/components/listings/WorkingHours";
import { Amenities } from "@/components/listings/Amenities";
import { SocialLinks } from "@/components/listings/SocialLinks";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useBusinessForm } from "@/contexts/BusinessFormContext";

export const AddListingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, isSubmitting, setIsSubmitting } = useBusinessForm();
  const [progress, setProgress] = useState(0);

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
        })
        .select()
        .single();

      if (businessError) throw businessError;

      setProgress(30);
      await uploadImages(business.id);
      setProgress(50);

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
      <Amenities />
      <SocialLinks />
      
      <div className="flex flex-col gap-4">
        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto ml-auto"
        >
          {isSubmitting ? `Saving... ${progress}%` : "Submit & Preview"}
        </Button>
      </div>
    </form>
  );
};