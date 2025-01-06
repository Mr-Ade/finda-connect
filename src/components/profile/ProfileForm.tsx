import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactDetailsForm } from "./ContactDetailsForm";
import { BioForm } from "./BioForm";

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