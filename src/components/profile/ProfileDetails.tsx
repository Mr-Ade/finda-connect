import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h4 className="text-lg font-semibold">Profile Information</h4>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
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
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="Enter zip code"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    className="mt-2"
                  />
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
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback>{fullName?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
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
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload new picture
              </Button>
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
