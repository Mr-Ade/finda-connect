import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProfileUpdate, ProfileUpdatePayload } from "@/types/profile";

interface UseProfileRealtimeProps {
  onProfileUpdate: (data: ProfileUpdatePayload) => void;
}

export const useProfileRealtime = ({ onProfileUpdate }: UseProfileRealtimeProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('profile-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload: ProfileUpdate) => {
          console.log('Profile update received:', payload);
          if (payload.new && typeof payload.new === 'object') {
            const newData = payload.new as ProfileUpdatePayload;
            onProfileUpdate(newData);
            
            toast({
              title: "Profile Updated",
              description: "Your profile has been updated in real-time",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onProfileUpdate, toast]);
};