import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Star, Heart, MapPin } from 'lucide-react';

export const ActivitiesFeed = () => {
  const { data: activities } = useQuery({
    queryKey: ['user-recent-activities'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

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
        .slice(0, 10);
    }
  });

  const getActivityIcon = (activity: any) => {
    if (activity.rating) return <Star className="w-5 h-5 text-yellow-500" />;
    if (activity.business_id && !activity.rating) return activity.created_at ? <MapPin className="w-5 h-5 text-green-500" /> : <Heart className="w-5 h-5 text-red-500" />;
    return null;
  };

  const getActivityText = (activity: any) => {
    if (activity.rating) return `You reviewed ${activity.businesses?.name}`;
    if (activity.business_id && !activity.rating) {
      return activity.created_at 
        ? `You checked in at ${activity.businesses?.name}`
        : `You bookmarked ${activity.businesses?.name}`;
    }
    return '';
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities?.map((activity: any) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="p-2 bg-gray-100 rounded-full">
              {getActivityIcon(activity)}
            </div>
            <div>
              <p className="text-sm text-gray-900">{getActivityText(activity)}</p>
              <p className="text-xs text-gray-500">
                {new Date(activity.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
        {(!activities || activities.length === 0) && (
          <p className="text-gray-500">No recent activities</p>
        )}
      </div>
    </Card>
  );
};