
import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const BusinessSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ['business-settings'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .eq('owner_id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const handleSave = async (formData: any) => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const { error } = await supabase
        .from('business_settings')
        .upsert({
          owner_id: session.user.id,
          ...formData
        });

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: "Your settings have been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BusinessOwnerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your business settings and preferences here.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input 
                  defaultValue={settings?.business_name}
                  placeholder="Enter your business name"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  defaultValue={settings?.description}
                  placeholder="Enter your business description"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Email Notifications</Label>
                <Switch defaultChecked={settings?.email_notifications} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Push Notifications</Label>
                <Switch defaultChecked={settings?.push_notifications} />
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full" 
            onClick={() => handleSave(settings)}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </BusinessOwnerLayout>
  );
};
