import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, UserPlus, UserMinus } from "lucide-react";

interface FollowButtonProps {
  profileId: string;
  className?: string;
}

export const FollowButton = ({ profileId, className = "" }: FollowButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;
      return session.user;
    }
  });

  const { data: isFollowing } = useQuery({
    queryKey: ['isFollowing', profileId],
    queryFn: async () => {
      if (!currentUser) return false;
      
      const { data, error } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', currentUser.id)
        .eq('following_id', profileId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking follow status:', error);
      }

      return !!data;
    },
    enabled: !!currentUser && currentUser.id !== profileId
  });

  const handleFollow = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to follow users",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      if (isFollowing) {
        const { error } = await supabase
          .from('follows')
          .delete()
          .eq('follower_id', currentUser.id)
          .eq('following_id', profileId);

        if (error) throw error;

        toast({
          title: "Unfollowed",
          description: "You have unfollowed this user",
        });
      } else {
        const { error } = await supabase
          .from('follows')
          .insert({
            follower_id: currentUser.id,
            following_id: profileId,
          });

        if (error) throw error;

        toast({
          title: "Following",
          description: "You are now following this user",
        });
      }

      // Invalidate relevant queries
      await queryClient.invalidateQueries({ queryKey: ['isFollowing', profileId] });
      await queryClient.invalidateQueries({ queryKey: ['followersCount', profileId] });
      await queryClient.invalidateQueries({ queryKey: ['followingCount', profileId] });
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser?.id === profileId) {
    return null;
  }

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      onClick={handleFollow}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        <>
          <UserMinus className="h-4 w-4 mr-2" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  );
};