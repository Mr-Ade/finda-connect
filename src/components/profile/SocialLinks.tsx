import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const SocialLinks = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Facebook className="w-4 h-4 text-primary" />
            Facebook
          </Label>
          <Input placeholder="https://facebook.com/" />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Twitter className="w-4 h-4 text-primary" />
            Twitter
          </Label>
          <Input placeholder="https://twitter.com/" />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-primary" />
            Instagram
          </Label>
          <Input placeholder="https://instagram.com/" />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-primary" />
            LinkedIn
          </Label>
          <Input placeholder="https://linkedin.com/" />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Social Links
      </Button>
    </div>
  );
};