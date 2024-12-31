import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Bookmark } from "lucide-react";

export const ActivityOverview = () => {
  const { data: stats } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      const [reviews, checkins, bookmarks] = await Promise.all([
        supabase.from('reviews').select('*', { count: 'exact' }).eq('user_id', session.user.id),
        supabase.from('checkins').select('*', { count: 'exact' }).eq('user_id', session.user.id),
        supabase.from('bookmarks').select('*', { count: 'exact' }).eq('user_id', session.user.id),
      ]);

      return {
        reviewCount: reviews.count || 0,
        checkinCount: checkins.count || 0,
        bookmarkCount: bookmarks.count || 0,
      };
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reviews</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.reviewCount || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Check-ins</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.checkinCount || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.bookmarkCount || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
};