import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { SettingsForm } from "@/components/admin/settings/SettingsForm";
import type { AdminSetting } from "@/types/admin";

export default function Settings() {
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
            <SettingsForm 
              settings={settings}
              isLoading={loading}
              onUpdateSetting={handleUpdateSetting}
            />
          </TabsContent>

          {/* Additional tabs content will be implemented in separate components */}
          <TabsContent value="appearance">
            {/* Appearance settings component will go here */}
          </TabsContent>

          <TabsContent value="advanced">
            {/* Advanced settings component will go here */}
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
}

export const AdminSettings = () => (
  <AdminRoute>
    <Settings />
  </AdminRoute>
);
