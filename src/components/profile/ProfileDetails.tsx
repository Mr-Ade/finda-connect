import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";

interface ProfileDetailsProps {
  username: string;
  setUsername: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  avatarUrl?: string;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  updating: boolean;
}

export const ProfileDetails = ({
  username,
  setUsername,
  fullName,
  setFullName,
  avatarUrl,
  onAvatarChange,
  onSubmit,
  updating
}: ProfileDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <ProfileAvatar
          avatarUrl={avatarUrl}
          onAvatarChange={onAvatarChange}
          updating={updating}
        />
        <ProfileForm
          username={username}
          setUsername={setUsername}
          fullName={fullName}
          setFullName={setFullName}
          updating={updating}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
};