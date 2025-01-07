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
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [error, setError] = useState<string | null>(null);

  // Fetch current settings
  const { data: settings, refetch, isError } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      console.log('Fetching admin settings...');
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('*')
          .returns<AdminSetting[]>();

        if (error) {
          console.error('Error fetching settings:', error);
          setError(error.message);
          throw error;
        }

        return data || [];
      } catch (err) {
        console.error('Error in query:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    retry: 1
  });

  const handleUpdateSetting = async (key: string, value: string | number) => {
    setLoading(true);
    setError(null);
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('No authenticated session');
      }

      const { error } = await supabase
        .from('admin_settings')
        .upsert({ 
          key,
          value: value.toString(),
          updated_at: new Date().toISOString(),
          updated_by: session.data.session.user.id
        });

      if (error) throw error;

      toast({
        title: "Settings updated",
        description: "The settings have been successfully updated."
      });

      refetch();
    } catch (error) {
      console.error('Error updating setting:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update settings';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
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
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                  defaultValue={settings?.find(s => s.key === 'site_name')?.value?.toString() || ''}
                  onChange={(e) => handleUpdateSetting('site_name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input 
                  id="contact-email"
                  type="email"
                  placeholder="Enter contact email"
                  defaultValue={settings?.find(s => s.key === 'contact_email')?.value?.toString() || ''}
                  onChange={(e) => handleUpdateSetting('contact_email', e.target.value)}
                />
              </div>

              <Button disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
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