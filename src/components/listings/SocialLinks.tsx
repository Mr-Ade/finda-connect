import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Share2, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useEffect } from "react";

const SOCIAL_PLATFORMS = {
  facebook: {
    icon: Facebook,
    label: "Facebook",
    placeholder: "https://facebook.com/yourbusiness",
    pattern: "^https?://(www\\.)?facebook\\.com/.+"
  },
  twitter: {
    icon: Twitter,
    label: "Twitter",
    placeholder: "https://twitter.com/yourbusiness",
    pattern: "^https?://(www\\.)?twitter\\.com/.+"
  },
  instagram: {
    icon: Instagram,
    label: "Instagram",
    placeholder: "https://instagram.com/yourbusiness",
    pattern: "^https?://(www\\.)?instagram\\.com/.+"
  },
  linkedin: {
    icon: Linkedin,
    label: "LinkedIn",
    placeholder: "https://linkedin.com/company/yourbusiness",
    pattern: "^https?://(www\\.)?linkedin\\.com/(company|in)/.+"
  }
};

export const SocialLinks = () => {
  const { formData, updateFormData } = useBusinessForm();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize social links if not present
    if (!formData.socialLinks) {
      updateFormData('socialLinks', {});
    }
  }, []);

  const validateUrl = (url: string, platform: keyof typeof SOCIAL_PLATFORMS): boolean => {
    if (!url) return true; // Empty URLs are valid
    const pattern = new RegExp(SOCIAL_PLATFORMS[platform].pattern);
    return pattern.test(url);
  };

  const handleSocialLinkChange = (platform: keyof typeof formData.socialLinks, value: string) => {
    try {
      if (value && !validateUrl(value, platform)) {
        toast({
          title: "Invalid URL",
          description: `Please enter a valid ${SOCIAL_PLATFORMS[platform].label} URL`,
          variant: "destructive",
        });
        return;
      }

      updateFormData('socialLinks', {
        ...formData.socialLinks,
        [platform]: value
      });

      if (value) {
        toast({
          title: "Social link updated",
          description: `${SOCIAL_PLATFORMS[platform].label} link has been updated`,
        });
      }
    } catch (error) {
      console.error("Error updating social link:", error);
      toast({
        title: "Error updating social link",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Share2 className="w-5 h-5" />
        <h3 className="font-medium">Social Links</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(SOCIAL_PLATFORMS).map(([platform, config]) => {
            const Icon = config.icon;
            return (
              <div key={platform} className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  {config.label}
                </Label>
                <Input
                  value={formData.socialLinks?.[platform] || ""}
                  onChange={(e) => handleSocialLinkChange(platform as keyof typeof formData.socialLinks, e.target.value)}
                  placeholder={config.placeholder}
                  type="url"
                  pattern={config.pattern}
                  aria-label={`${config.label} URL`}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};