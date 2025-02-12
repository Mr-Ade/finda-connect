
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { UserDashboard } from "@/components/profile/dashboard/UserDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [updating, setUpdating] = useState(false);

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
      
      setUsername(data.username || '');
      setFullName(data.full_name || '');
      
      return data;
    }
  });

  const handleAvatarChange = async (avatarUrl: string) => {
    try {
      setUpdating(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          id: session.user.id,
          avatar_url: avatarUrl 
        })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error('Error updating avatar');
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const { error } = await supabase
        .from('profiles')
        .update({
          id: session.user.id,
          username,
          full_name: fullName,
        })
        .eq('id', session.user.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <DashboardLayout loading={loading}>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <UserDashboard />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileDetails
            username={username}
            setUsername={setUsername}
            fullName={fullName}
            setFullName={setFullName}
            avatarUrl={profile?.avatar_url}
            onAvatarChange={handleAvatarChange}
            onSubmit={handleSubmit}
            updating={updating}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Profile;
