import { MapPin, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Business } from "@/types/business";

interface BusinessFooterProps {
  business: Business;
}

export const BusinessFooter = ({ business }: BusinessFooterProps) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContactClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to contact the business owner",
        variant: "destructive"
      });
      return;
    }
    setIsContactOpen(true);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (business.owner_id) {
      navigate(`/dashboard/messages?userId=${business.owner_id}`);
    }
  };

  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const location = `${business.address}, ${business.city}, ${business.state}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <>
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin 
            className="w-4 h-4 cursor-pointer hover:text-primary transition-colors"
            onClick={handleLocationClick}
          />
          <span className="text-sm">
            {business.city}, {business.state}
          </span>
        </div>
        <button 
          className="text-gray-400 hover:text-gray-600 transition-colors"
          onClick={handleContactClick}
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {business.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {business.email && (
              <Button
                onClick={() => window.location.href = `mailto:${business.email}`}
                className="w-full"
              >
                Send Email
              </Button>
            )}
            <Button
              onClick={handleMessageClick}
              className="w-full"
            >
              Send Direct Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};