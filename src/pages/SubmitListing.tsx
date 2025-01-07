import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { ListingInfo } from "@/components/listings/ListingInfo";
import { LocationInfo } from "@/components/listings/LocationInfo";
import { WorkingHours } from "@/components/listings/WorkingHours";
import { ImageGallery } from "@/components/listings/ImageGallery";
import { MenuItems } from "@/components/listings/MenuItems";
import { Amenities } from "@/components/listings/Amenities";
import { SocialLinks } from "@/components/listings/SocialLinks";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const SubmitListing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData } = useBusinessForm();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Submit Listing", href: "#", active: true },
  ];

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please login to submit a listing",
        });
        return;
      }

      // Insert business record
      const { data: business, error: businessError } = await supabase
        .from('businesses')
        .insert({
          owner_id: user.id,
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
          latitude: formData.latitude,
          longitude: formData.longitude
        })
        .select()
        .single();

      if (businessError) throw businessError;

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
              is_closed: hour.isClosed
            }))
          );

        if (hoursError) throw hoursError;
      }

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
              category: item.category
            }))
          );

        if (menuError) throw menuError;
      }

      // Upload images
      if (formData.galleryImages.length > 0) {
        const uploadPromises = formData.galleryImages.map(async (file, index) => {
          const fileExt = file.name.split('.').pop();
          const filePath = `${business.id}/${crypto.randomUUID()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('business-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('business-images')
            .getPublicUrl(filePath);

          return {
            business_id: business.id,
            photo_url: publicUrl,
            order_index: index
          };
        });

        const uploadedPhotos = await Promise.all(uploadPromises);

        const { error: photosError } = await supabase
          .from('business_photos')
          .insert(uploadedPhotos);

        if (photosError) throw photosError;
      }

      toast({
        title: "Success",
        description: "Your listing has been submitted successfully",
      });

      navigate(`/business/${business.id}`);

    } catch (error) {
      console.error('Error submitting listing:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit listing. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Submit Your Listing</h1>
          <p className="text-gray-600 text-center mb-12">
            Add your business to our directory and reach more customers
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            <ListingInfo />
            <LocationInfo />
            <WorkingHours />
            <ImageGallery />
            <MenuItems />
            <Amenities />
            <SocialLinks />

            <div className="flex justify-end pt-4">
              <Button 
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Listing"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default SubmitListing;