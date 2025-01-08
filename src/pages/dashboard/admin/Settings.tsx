import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface AdminSetting {
  id: string;
  key: string;
  value: string | number;
  updated_at: string | null;
  updated_by: string | null;
}

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  // Fetch current settings
  const { data: settings, isError, error: fetchError } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      console.log('Fetching admin settings...');
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .returns<AdminSetting[]>();

      if (error) {
        console.error('Error fetching settings:', error);
        throw error;
      }

      return data || [];
    },
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string, value: string }) => {
      console.log('Updating setting:', key, value);
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('No authenticated session');
      }

      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString(),
          updated_by: session.data.session.user.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast({
        title: "Settings updated",
        description: "The settings have been successfully updated."
      });
    },
    onError: (error) => {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update settings',
        variant: "destructive"
      });
    }
  });

  const handleUpdateSetting = async (key: string, value: string) => {
    setLoading(true);
    try {
      await updateSettingMutation.mutateAsync({ key, value });
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key: string) => {
    return settings?.find(s => s.key === key)?.value?.toString() || '';
  };

  if (isError) {
    return (
      <DashboardLayout>
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {fetchError instanceof Error ? fetchError.message : 'Failed to load settings'}
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
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
                    onChange={(e) => handleUpdateSetting('site_name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input 
                    id="contact-email"
                    type="email"
                    placeholder="Enter contact email"
                    defaultValue={getSetting('contact_email')}
                    onChange={(e) => handleUpdateSetting('contact_email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input 
                    id="support-phone"
                    type="tel"
                    placeholder="Enter support phone number"
                    defaultValue={getSetting('support_phone')}
                    onChange={(e) => handleUpdateSetting('support_phone', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <Input 
                    id="primary-color"
                    type="color"
                    defaultValue={getSetting('primary_color') || '#000000'}
                    onChange={(e) => handleUpdateSetting('primary_color', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input 
                    id="logo-url"
                    placeholder="Enter logo URL"
                    defaultValue={getSetting('logo_url')}
                    onChange={(e) => handleUpdateSetting('logo_url', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <Input 
                    id="maintenance-mode"
                    type="checkbox"
                    className="w-4 h-4"
                    checked={getSetting('maintenance_mode') === 'true'}
                    onChange={(e) => handleUpdateSetting('maintenance_mode', e.target.checked.toString())}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analytics-id">Analytics ID</Label>
                  <Input 
                    id="analytics-id"
                    placeholder="Enter analytics ID"
                    defaultValue={getSetting('analytics_id')}
                    onChange={(e) => handleUpdateSetting('analytics_id', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {loading && (
          <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <Settings />
  </AdminRoute>
);