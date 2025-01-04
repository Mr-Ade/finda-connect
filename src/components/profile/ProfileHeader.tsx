import { Avatar } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FollowButton } from "./FollowButton";

export const ProfileHeader = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  const { data: followersCount } = useQuery({
    queryKey: ['followersCount', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return 0;
      
      const { count, error } = await supabase
        .from('follows')
        .select('id', { count: 'exact', head: true })
        .eq('following_id', profile.id);
        
      if (error) throw error;
      return count || 0;
    },
    enabled: !!profile?.id
  });

  const { data: followingCount } = useQuery({
    queryKey: ['followingCount', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return 0;
      
      const { count, error } = await supabase
        .from('follows')
        .select('id', { count: 'exact', head: true })
        .eq('follower_id', profile.id);
        
      if (error) throw error;
      return count || 0;
    },
    enabled: !!profile?.id
  });

  if (!profile) return null;

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || 'Profile'}
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">
              {profile.full_name || 'Anonymous User'}
            </h1>
            {profile.username && (
              <p className="text-gray-600 mb-4">@{profile.username}</p>
            )}
            
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <div className="text-center">
                <div className="font-semibold">{followersCount}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{followingCount}</div>
                <div className="text-gray-600 text-sm">Following</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <FollowButton profileId={profile.id} />
          </div>
        </div>
      </div>
    </div>
  );
};