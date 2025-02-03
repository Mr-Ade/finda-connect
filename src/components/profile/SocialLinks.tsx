import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SOCIAL_PLATFORMS = {
  facebook: {
    icon: Facebook,
    label: "Facebook",
    placeholder: "https://facebook.com/yourprofile",
    pattern: "^https?://(www\\.)?facebook\\.com/.+"
  },
  twitter: {
    icon: Twitter,
    label: "Twitter",
    placeholder: "https://twitter.com/yourprofile",
    pattern: "^https?://(www\\.)?twitter\\.com/.+"
  },
  instagram: {
    icon: Instagram,
    label: "Instagram",
    placeholder: "https://instagram.com/yourprofile",
    pattern: "^https?://(www\\.)?instagram\\.com/.+"
  },
  linkedin: {
    icon: Linkedin,
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/yourprofile",
    pattern: "^https?://(www\\.)?linkedin\\.com/(company|in)/.+"
  }
};

export const SocialLinks = () => {
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateUrl = (url: string, platform: keyof typeof SOCIAL_PLATFORMS): boolean => {
    if (!url) return true; // Empty URLs are valid
    const pattern = new RegExp(SOCIAL_PLATFORMS[platform].pattern);
    return pattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ social_links: socialLinks })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Social links updated successfully",
      });
    } catch (error) {
      console.error('Error updating social links:', error);
      toast({
        title: "Error",
        description: "Failed to update social links",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(SOCIAL_PLATFORMS).map(([platform, config]) => {
          const Icon = config.icon;
          return (
            <div key={platform} className="space-y-2">
              <Label className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                {config.label}
              </Label>
              <Input
                value={socialLinks[platform] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !validateUrl(value, platform as keyof typeof SOCIAL_PLATFORMS)) {
                    toast({
                      title: "Invalid URL",
                      description: `Please enter a valid ${config.label} URL`,
                      variant: "destructive",
                    });
                    return;
                  }
                  setSocialLinks(prev => ({
                    ...prev,
                    [platform]: value
                  }));
                }}
                placeholder={config.placeholder}
                type="url"
                pattern={config.pattern}
                aria-label={`${config.label} URL`}
              />
            </div>
          );
        })}
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Social Links"}
      </Button>
    </form>
  );
};