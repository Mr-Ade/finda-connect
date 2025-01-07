import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Activity, Award, Bell, Calendar, MessageSquare, Star, ThumbsUp, Heart } from "lucide-react";

type ActivityItem = {
  id: string;
  user_id: string;
  activity_type: string;
  target_id: string;
  target_name: string;
  rating?: number;
  created_at: string;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'review':
      return <Star className="h-5 w-5 text-yellow-500" />;
    case 'booking':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'message':
      return <MessageSquare className="h-5 w-5 text-green-500" />;
    case 'achievement':
      return <Award className="h-5 w-5 text-purple-500" />;
    case 'like':
      return <ThumbsUp className="h-5 w-5 text-pink-500" />;
    case 'notification':
      return <Bell className="h-5 w-5 text-orange-500" />;
    case 'favorite':
      return <Heart className="h-5 w-5 text-red-500" />;
    default:
      return <Activity className="h-5 w-5 text-gray-500" />;
  }
};

export const ActivityFeed = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      console.log('Fetching activities...');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching activities:', error);
        throw error;
      }

      console.log('Fetched activities:', data);
      return data as ActivityItem[];
    }
  });

  useEffect(() => {
    // Subscribe to real-time activity updates
    const channel = supabase
      .channel('activities-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activities'
        },
        (payload) => {
          console.log('New activity received:', payload);
          queryClient.invalidateQueries({ queryKey: ['activities'] });
          
          const newActivity = payload.new as ActivityItem;
          toast({
            title: "New Activity",
            description: `${newActivity.activity_type}: ${newActivity.target_name}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="p-2 rounded-full bg-gray-50">
              {getActivityIcon(activity.activity_type)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                {activity.activity_type}: {activity.target_name}
                {activity.rating && ` (${activity.rating}★)`}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(activity.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
        {(!activities || activities.length === 0) && (
          <p className="text-center text-gray-500">No recent activities</p>
        )}
      </div>
    </Card>
  );
};