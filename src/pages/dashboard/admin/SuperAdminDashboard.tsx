import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { SuperAdminStats } from "@/components/admin/dashboard/SuperAdminStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  // Check if user is super admin
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log('Checking super admin status...');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  // Fetch system stats
  const { data: stats } = useQuery({
    queryKey: ['super-admin-stats'],
    queryFn: async () => {
      console.log('Fetching super admin stats...');
      const [
        { count: usersCount },
        { count: adminsCount },
        { count: businessesCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_admin', true),
        supabase.from('businesses').select('*', { count: 'exact', head: true })
      ]);

      return {
        totalUsers: usersCount || 0,
        totalAdmins: adminsCount || 0,
        totalBusinesses: businessesCount || 0
      };
    },
    enabled: !!profile?.super_admin
  });

  useEffect(() => {
    if (!isLoading && !profile?.super_admin) {
      navigate('/dashboard');
    }
  }, [profile, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile?.super_admin) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>
        
        <SuperAdminStats />

        <Tabs defaultValue="settings" className="mt-6">
          <TabsList>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add system configuration controls here */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add user management table/controls here */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add audit log table here */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;