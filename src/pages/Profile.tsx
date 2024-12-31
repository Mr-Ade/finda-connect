import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { UserDashboard } from "@/components/profile/dashboard/UserDashboard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          navigate("/login");
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) throw error;

        if (!profile) {
          const { error: insertError } = await supabase
            .from("profiles")
            .insert([
              {
                id: session.user.id,
                username: "",
                full_name: "",
                updated_at: new Date().toISOString(),
              },
            ]);

          if (insertError) throw insertError;

          setUsername("");
          setFullName("");
          setAvatarUrl(null);
        } else {
          setUsername(profile.username || "");
          setFullName(profile.full_name || "");
          setAvatarUrl(profile.avatar_url);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate, toast]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("No user session found");

      let newAvatarUrl = avatarUrl;

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `${session.user.id}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        newAvatarUrl = publicUrl;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username,
          full_name: fullName,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileHeader />
      
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="md:col-span-3">
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
                  avatarUrl={avatarUrl}
                  onAvatarChange={handleAvatarChange}
                  onSubmit={handleSubmit}
                  updating={updating}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;