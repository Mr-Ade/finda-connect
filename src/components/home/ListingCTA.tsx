import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ListingCTA = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleListBusiness = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list your business",
        variant: "default",
      });
      navigate("/login");
      return;
    }

    // TODO: Navigate to business creation page once implemented
    navigate("/create-business");
  };

  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Business?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of businesses that trust us to connect them with customers
          </p>
          <Button
            className="bg-white text-primary hover:bg-gray-100"
            size="lg"
            onClick={handleListBusiness}
          >
            List Your Business
          </Button>
        </div>
      </div>
    </section>
  );
};