import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AdminSetting } from "@/types/admin";

interface SettingsFormProps {
  settings: AdminSetting[] | undefined;
  isLoading: boolean;
  onUpdateSetting: (key: string, value: string) => Promise<void>;
}

export function SettingsForm({ settings, isLoading, onUpdateSetting }: SettingsFormProps) {
  const getSetting = (key: string) => {
    return settings?.find(s => s.key === key)?.value?.toString() || '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="site-name">Site Name</Label>
          <Input
            id="site-name"
            placeholder="Enter site name"
            defaultValue={getSetting('site_name')}
            onChange={(e) => onUpdateSetting('site_name', e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">Contact Email</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="Enter contact email"
            defaultValue={getSetting('contact_email')}
            onChange={(e) => onUpdateSetting('contact_email', e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="support-phone">Support Phone</Label>
          <Input
            id="support-phone"
            type="tel"
            placeholder="Enter support phone number"
            defaultValue={getSetting('support_phone')}
            onChange={(e) => onUpdateSetting('support_phone', e.target.value)}
            disabled={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}