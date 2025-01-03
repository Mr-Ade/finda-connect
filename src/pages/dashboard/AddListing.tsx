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

const AddListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Submit logic will be implemented here
      toast({
        title: "Success",
        description: "Your listing has been created successfully.",
      });
      navigate("/dashboard/listings");
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
    </DashboardLayout>
  );
};

export default AddListing;