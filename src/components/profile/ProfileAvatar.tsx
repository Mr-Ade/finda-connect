import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useImageUpload } from "@/hooks/use-image-upload";

interface ProfileAvatarProps {
  avatarUrl?: string;
  onAvatarChange: (url: string) => void;
  updating: boolean;
}

export const ProfileAvatar = ({ avatarUrl, onAvatarChange, updating }: ProfileAvatarProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { uploadImage } = useImageUpload("avatars");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const url = await uploadImage(file);
      
      if (url) {
        onAvatarChange(url);
        toast({
          title: "Success",
          description: "Profile picture updated successfully",
        });
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload profile picture",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={avatarUrl || "/placeholder.svg"}
          alt="Profile"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div>
        <Label htmlFor="avatar" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              disabled={updating || isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Upload New Picture
            </Button>
          </div>
        </Label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={updating || isUploading}
        />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          JPG, GIF or PNG. Max size of 800K
        </p>
      </div>
    </div>
  );
};