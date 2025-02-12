
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useDashboardRealtime = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Create a channel for all dashboard-related tables
    const channel = supabase.channel('dashboard-updates')
      // Listen for new reviews
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reviews' },
        () => {
          console.log('Reviews updated, invalidating queries...');
          queryClient.invalidateQueries({ queryKey: ['userRecentReviews'] });
          queryClient.invalidateQueries({ queryKey: ['userStats'] });
          queryClient.invalidateQueries({ queryKey: ['activity-chart'] });
        }
      )
      // Listen for new bookmarks
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        () => {
          console.log('Bookmarks updated, invalidating queries...');
          queryClient.invalidateQueries({ queryKey: ['userBookmarks'] });
          queryClient.invalidateQueries({ queryKey: ['userStats'] });
        }
      )
      // Listen for new check-ins
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'checkins' },
        () => {
          console.log('Check-ins updated, invalidating queries...');
          queryClient.invalidateQueries({ queryKey: ['userCheckins'] });
          queryClient.invalidateQueries({ queryKey: ['userStats'] });
        }
      )
      // Listen for new activities
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'activities' },
        () => {
          console.log('Activities updated, invalidating queries...');
          queryClient.invalidateQueries({ queryKey: ['user-recent-activities'] });
          queryClient.invalidateQueries({ queryKey: ['activities'] });
          
          toast({
            title: "Dashboard Updated",
            description: "Your dashboard statistics have been updated in real-time",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);
};
