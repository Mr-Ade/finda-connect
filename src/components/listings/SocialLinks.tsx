import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";

export const SocialLinks = () => {
  const { formData, updateFormData } = useBusinessForm();

  

  const handleSocialLinkChange = (platform: keyof typeof formData.socialLinks, value: string) => {
    updateFormData('socialLinks', {
      ...formData.socialLinks,
      [platform]: value
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Share2 className="w-5 h-5" />
        <h3 className="font-medium">Social Links</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Facebook className="w-4 h-4 text-primary" />
              Facebook
            </Label>
            <Input
              value={formData.socialLinks?.facebook || ""}
              onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
              placeholder="https://facebook.com/"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Twitter className="w-4 h-4 text-primary" />
              Twitter
            </Label>
            <Input
              value={formData.socialLinks?.twitter || ""}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              placeholder="https://twitter.com/"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-primary" />
              Instagram
            </Label>
            <Input
              value={formData.socialLinks?.instagram || ""}
              onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
              placeholder="https://instagram.com/"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-primary" />
              LinkedIn
            </Label>
            <Input
              value={formData.socialLinks?.linkedin || ""}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};