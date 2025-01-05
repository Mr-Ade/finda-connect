import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Activity } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Heart, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RecentActivities = () => {
  const { toast } = useToast();
  
  const { data: activities, isLoading } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      console.log('Fetching recent activities...');
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(7);

      if (error) {
        console.error('Error fetching activities:', error);
        toast({
          title: "Error loading activities",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Fetched activities:', data);
      return data as Activity[];
    },
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'bookmark':
        return <Heart className="h-5 w-5 text-red-500" />;
      default:
        return <Layers className="h-5 w-5 text-purple-500" />;
    }
  };

  const getActivityMessage = (activity: Activity) => {
    switch (activity.activity_type) {
      case 'review':
        return (
          <span>
            left a review {activity.rating && `(${activity.rating}★)`} on <strong>{activity.target_name}</strong>
          </span>
        );
      case 'bookmark':
        return <span>bookmarked <strong>{activity.target_name}</strong></span>;
      case 'listing_approved':
        return <span>Your listing <strong>{activity.target_name}</strong> has been approved!</span>;
      default:
        return <span>{activity.target_name}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : activities?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent activities
          </div>
        ) : (
          <div className="space-y-4">
            {activities?.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-gray-100">
                  {getActivityIcon(activity.activity_type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {getActivityMessage(activity)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};