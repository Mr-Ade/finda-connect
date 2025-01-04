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
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { BusinessFormProvider, useBusinessForm } from "@/contexts/BusinessFormContext";

const AddListingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, isSubmitting, setIsSubmitting } = useBusinessForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      // Insert business record
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

      toast({
        title: "Success",
        description: "Your listing has been created successfully.",
      });
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
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Creating..." : "Submit & Preview"}
        </Button>
      </div>
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