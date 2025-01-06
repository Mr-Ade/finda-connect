import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input
            value={fullName.split(' ')[0] || ''}
            onChange={(e) => {
              const lastName = fullName.split(' ').slice(1).join(' ');
              setFullName(`${e.target.value} ${lastName}`);
            }}
            disabled={updating}
            placeholder="Enter first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input
            value={fullName.split(' ').slice(1).join(' ')}
            onChange={(e) => {
              const firstName = fullName.split(' ')[0];
              setFullName(`${firstName} ${e.target.value}`);
            }}
            disabled={updating}
            placeholder="Enter last name"
          />
        </div>

        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={updating}
            placeholder="Enter username"
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            disabled
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Mobile</Label>
          <Input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={updating}
            placeholder="Enter mobile number"
          />
        </div>

        <div className="space-y-2">
          <Label>State</Label>
          <Input
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={updating}
            placeholder="Enter state"
          />
        </div>

        <div className="space-y-2">
          <Label>City</Label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={updating}
            placeholder="Enter city"
          />
        </div>

        <div className="space-y-2">
          <Label>Zip Code</Label>
          <Input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            disabled={updating}
            placeholder="Enter zip code"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={updating}
          placeholder="Enter full address"
        />
      </div>

      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea 
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
          className="min-h-[150px]"
          disabled={updating}
        />
      </div>

      <Button type="submit" disabled={updating}>
        {updating ? "Updating..." : "Save Changes"}
      </Button>
    </form>
  );
};