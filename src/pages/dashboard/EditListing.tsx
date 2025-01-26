import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Loader2 } from "lucide-react";

const EditListingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateFormData, isSubmitting, setIsSubmitting } = useBusinessForm();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data: listing, error } = await supabase
          .from('businesses')
          .select(`
            *,
            business_photos(photo_url),
            business_hours(
              day_of_week,
              open_time,
              close_time,
              is_closed
            ),
            menu_items(
              name,
              description,
              price,
              category,
              image_url
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        if (!listing) {
          toast({
            title: "Error",
            description: "Listing not found",
            variant: "destructive",
          });
          navigate("/dashboard/listings");
          return;
        }

        // Transform the data to match form structure
        updateFormData('name', listing.name);
        updateFormData('description', listing.description || "");
        updateFormData('category', listing.category);
        updateFormData('address', listing.address);
        updateFormData('city', listing.city);
        updateFormData('state', listing.state);
        updateFormData('zipCode', listing.zip_code);
        updateFormData('phone', listing.phone || "");
        updateFormData('email', listing.email || "");
        updateFormData('website', listing.website || "");
        updateFormData('workingHours', listing.business_hours || []);
        updateFormData('menuItems', listing.menu_items || []);
        updateFormData('amenities', listing.amenities || []);
        updateFormData('socialLinks', listing.social_links || {});
        updateFormData('keywords', []);
        updateFormData('latitude', listing.latitude || 0);
        updateFormData('longitude', listing.longitude || 0);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching listing:', error);
        toast({
          title: "Error",
          description: "Failed to fetch listing details",
          variant: "destructive",
        });
        navigate("/dashboard/listings");
      }
    };

    fetchListing();
  }, [id, navigate, toast, updateFormData]);

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
        })
        .eq('id', id);

      if (businessError) throw businessError;

      setProgress(60);

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

      // Update menu items
      if (formData.menuItems.length > 0) {
        // First delete existing menu items
        await supabase
          .from('menu_items')
          .delete()
          .eq('business_id', id);

        // Then insert new menu items
        const { error: menuError } = await supabase
          .from('menu_items')
          .insert(
            formData.menuItems.map(item => ({
              business_id: id,
              name: item.name,
              description: item.description,
              price: item.price,
              category: item.category,
              image_url: item.imageUrl,
            }))
          );

        if (menuError) throw menuError;
      }

      setProgress(100);

      toast({
        title: "Success",
        description: "Your listing has been updated successfully.",
      });

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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

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
          {isSubmitting ? `Saving... ${progress}%` : "Update & Preview"}
        </Button>
      </div>
    </form>
  );
};

const EditListing = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Edit Listing</h1>
        <nav className="text-sm breadcrumbs">
          <ol className="flex gap-2 text-muted-foreground">
            <li><a href="/">Home</a></li>
            <li>•</li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li>•</li>
            <li className="text-primary">Edit Listing</li>
          </ol>
        </nav>
      </div>

      <BusinessFormProvider>
        <EditListingForm />
      </BusinessFormProvider>
    </DashboardLayout>
  );
};

export default EditListing;