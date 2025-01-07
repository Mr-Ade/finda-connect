import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Fetch current settings
  const { data: settings, refetch } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      console.log('Fetching admin settings...');
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');

      if (error) {
        console.error('Error fetching settings:', error);
        throw error;
      }

      return data || [];
    }
  });

  const handleUpdateSetting = async (key: string, value: any) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ 
          key,
          value,
          updated_at: new Date().toISOString(),
          updated_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "Settings updated",
        description: "The settings have been successfully updated."
      });

      refetch();
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
        
        <div className="grid gap-4">
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
                  defaultValue={settings?.find(s => s.key === 'site_name')?.value}
                  onChange={(e) => handleUpdateSetting('site_name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input 
                  id="contact-email"
                  type="email"
                  placeholder="Enter contact email"
                  defaultValue={settings?.find(s => s.key === 'contact_email')?.value}
                  onChange={(e) => handleUpdateSetting('contact_email', e.target.value)}
                />
              </div>

              <Button disabled={loading}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <Settings />
  </AdminRoute>
);