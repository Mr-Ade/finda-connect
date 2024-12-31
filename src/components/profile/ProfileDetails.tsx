import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface ProfileDetailsProps {
  username: string;
  setUsername: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  avatarUrl: string | null;
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h4 className="text-lg font-semibold">Profile Information</h4>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="avatar">Profile Picture</Label>
              <div className="flex items-center gap-4 mt-2">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={avatarUrl || ""} />
                  <AvatarFallback>{fullName?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={onAvatarChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("avatar")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload new picture
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="bio">About</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h4 className="text-lg font-semibold">Social Links</h4>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                type="url"
                placeholder="https://facebook.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                type="url"
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={updating} className="w-full md:w-auto">
        Save Changes
      </Button>
    </form>
  );
};