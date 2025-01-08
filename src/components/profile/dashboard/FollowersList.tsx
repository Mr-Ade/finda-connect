import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FollowersList = () => {
  const { data: followers } = useQuery({
    queryKey: ['followers'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      // Get followers with their profile information
      const { data, error } = await supabase
        .from('follows')
        .select(`
          follower_id,
          followers:profiles!follows_follower_id_fkey (
            id,
            full_name,
            avatar_url,
            city,
            state
          )
        `)
        .eq('following_id', session.user.id)
        .limit(5);

      if (error) throw error;
      return data?.map(f => f.followers) || [];
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {followers?.map((follower) => (
            <div key={follower.id} className="flex items-center gap-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={follower.avatar_url || '/placeholder.svg'} alt={follower.full_name} />
                </Avatar>
              </div>
              <div>
                <h6 className="font-medium">{follower.full_name || 'Anonymous User'}</h6>
                <small className="text-gray-500">
                  <i className="mr-1">📍</i>
                  {follower.city && follower.state 
                    ? `${follower.city}, ${follower.state}`
                    : 'Location not set'}
                </small>
              </div>
            </div>
          ))}
          {!followers?.length && (
            <div className="text-center text-gray-500 py-4">
              No followers yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};