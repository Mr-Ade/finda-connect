import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
          <Label>State</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>City</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sf">San Francisco</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
              <SelectItem value="sd">San Diego</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input placeholder="Enter your address" />
        </div>

        <div className="space-y-2">
          <Label>Zip Code</Label>
          <Input placeholder="Enter zip code" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>About</Label>
        <Textarea 
          placeholder="Tell us about yourself"
          className="min-h-[150px]"
        />
      </div>

      <Button type="submit" disabled={updating}>
        {updating ? "Updating..." : "Save Changes"}
      </Button>
    </form>
  );
};