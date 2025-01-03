import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ProfileAvatarProps {
  avatarUrl?: string;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updating: boolean;
}

export const ProfileAvatar = ({ avatarUrl, onAvatarChange, updating }: ProfileAvatarProps) => {
  return (
    <div className="space-y-2">
      <Label>Profile Picture</Label>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <img
            src={avatarUrl ? `https://ycmugolragcyqogscqhl.supabase.co/storage/v1/object/public/avatars/${avatarUrl}` : "/placeholder.svg"}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <Label htmlFor="avatar" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" disabled={updating}>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Picture
              </Button>
            </div>
          </Label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={onAvatarChange}
            disabled={updating}
          />
          <p className="text-sm text-muted-foreground mt-1">
            JPG, GIF or PNG. Max size of 800K
          </p>
        </div>
      </div>
    </div>
  );
};