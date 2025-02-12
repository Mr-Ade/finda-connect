
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BioFormProps {
  bio: string;
  setBio: (value: string) => void;
  updating: boolean;
}

export const BioForm = ({
  bio,
  setBio,
  updating
}: BioFormProps) => {
  return (
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
  );
};
