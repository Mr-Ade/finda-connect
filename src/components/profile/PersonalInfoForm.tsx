
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PersonalInfoFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  updating: boolean;
}

export const PersonalInfoForm = ({
  fullName,
  setFullName,
  username,
  setUsername,
  updating
}: PersonalInfoFormProps) => {
  return (
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
    </div>
  );
};
