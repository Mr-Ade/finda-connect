import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactDetailsForm } from "./ContactDetailsForm";
import { BioForm } from "./BioForm";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = {
  new: Profile;
  old: Profile;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
};

interface ProfileFormProps {
  username: string;
  setUsername: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  updating: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileForm = ({
  username,
  setUsername,
  fullName,
  setFullName,
  updating,
  onSubmit
}: ProfileFormProps) => {
  const [bio, setBio] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { toast } = useToast();

  // Subscribe to real-time profile updates
  useEffect(() => {
    const channel = supabase
      .channel('profile-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${(supabase.auth.getUser()).then(({ data }) => data.user?.id)}`
        },
        (payload: ProfileUpdate) => {
          console.log('Profile update received:', payload);
          const newProfile = payload.new;
          
          // Update local state with new values
          if (newProfile) {
            setUsername(newProfile.username || '');
            setFullName(newProfile.full_name || '');
            setBio(newProfile.bio || '');
            setMobile(newProfile.mobile || '');
            setState(newProfile.state || '');
            setCity(newProfile.city || '');
            setAddress(newProfile.address || '');
            setZipCode(newProfile.zip_code || '');
            
            toast({
              title: "Profile Updated",
              description: "Your profile has been updated in real-time",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Load initial profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setBio(data.bio || '');
          setMobile(data.mobile || '');
          setState(data.state || '');
          setCity(data.city || '');
          setAddress(data.address || '');
          setZipCode(data.zip_code || '');
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data",
        });
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('profiles')
        .update({
          id: user.id,
          username,
          full_name: fullName,
          bio,
          mobile,
          state,
          city,
          address,
          zip_code: zipCode
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalInfoForm
        username={username}
        setUsername={setUsername}
        fullName={fullName}
        setFullName={setFullName}
        updating={updating}
      />

      <ContactDetailsForm
        mobile={mobile}
        setMobile={setMobile}
        state={state}
        setState={setState}
        city={city}
        setCity={setCity}
        address={address}
        setAddress={setAddress}
        zipCode={zipCode}
        setZipCode={setZipCode}
        updating={updating}
      />

      <BioForm
        bio={bio}
        setBio={setBio}
        updating={updating}
      />

      <Button type="submit" disabled={updating}>
        {updating ? "Updating..." : "Save Changes"}
      </Button>
    </form>
  );
};