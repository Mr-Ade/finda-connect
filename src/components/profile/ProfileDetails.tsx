import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";
import { SocialLinks } from "./SocialLinks";

interface ProfileDetailsProps {
  username: string;
  setUsername: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  avatarUrl?: string;
  onAvatarChange: (url: string) => void;
  onSubmit: (profile: ProfileUpdate) => void;
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: 'UPDATE',
      payload: {
        username,
        full_name: fullName
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Avatar Section */}
        <div className="md:col-span-3 order-last md:order-last">
          <Card>
            <CardContent className="p-6">
              <ProfileAvatar
                avatarUrl={avatarUrl}
                onAvatarChange={onAvatarChange}
                updating={updating}
              />
            </CardContent>
          </Card>
        </div>

        {/* Profile Form Section */}
        <div className="md:col-span-9">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-2 text-primary">
                <i className="fas fa-user-check"></i>
                <h4 className="font-medium">My Profile</h4>
              </div>
            </CardHeader>
            <CardContent className="p-6">
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

          {/* Social Links Section */}
          <Card className="mt-6">
            <CardHeader className="border-b">
              <div className="flex items-center gap-2 text-primary">
                <i className="fas fa-user-friends"></i>
                <h4 className="font-medium">Social Links</h4>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <SocialLinks />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
