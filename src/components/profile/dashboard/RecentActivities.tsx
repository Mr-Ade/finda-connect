import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Heart, CheckCircle } from "lucide-react";

export const RecentActivities = () => {
  const { data: activities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const [reviews, bookmarks, checkins] = await Promise.all([
        supabase
          .from('reviews')
          .select('*, businesses(name)')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('bookmarks')
          .select('*, businesses(name)')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('checkins')
          .select('*, businesses(name)')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      return [...(reviews.data || []), ...(bookmarks.data || []), ...(checkins.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
    }
  });

  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities?.map((activity: any) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
            {activity.rating ? (
              <Star className="w-5 h-5 text-yellow-500" />
            ) : activity.business_id ? (
              <Heart className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <div>
              <p className="text-sm">
                {activity.rating
                  ? `You reviewed ${activity.businesses?.name}`
                  : activity.business_id
                  ? `You bookmarked ${activity.businesses?.name}`
                  : `You checked in at ${activity.businesses?.name}`}
              </p>
              <span className="text-xs text-muted-foreground">
                {new Date(activity.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};