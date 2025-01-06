import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProfileDetails } from "@/components/profile/ProfileDetails"; 
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [updating, setUpdating] = useState(false);

  const { toast } = useToast();

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

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile picture",
      });
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
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <DashboardLayout loading={loading}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Profile Info</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5 text-gray-400">/</span>
                  <a href="/dashboard" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5 text-gray-400">/</span>
                  <span className="text-gray-500">My Profile</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

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
      </div>
    </DashboardLayout>
  );
};

export default Profile;