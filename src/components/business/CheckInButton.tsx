import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CheckInButtonProps {
  businessId: string;
}

export const CheckInButton = ({ businessId }: CheckInButtonProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleCheckIn = async () => {
    setIsChecking(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to check in",
      });
      setIsChecking(false);
      return;
    }

    const { error } = await supabase
      .from("checkins")
      .insert({
        business_id: businessId,
        user_id: user.id
      });

    if (error) {
      console.error("Check-in error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check in. Please try again.",
      });
    } else {
      toast({
        title: "Success",
        description: "You've checked in to this business!",
      });
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    }

    setIsChecking(false);
  };

  return (
    <Button
      onClick={handleCheckIn}
      disabled={isChecking}
      className="w-full"
      variant="outline"
    >
      <MapPin className="w-4 h-4 mr-2" />
      Check In
    </Button>
  );
};