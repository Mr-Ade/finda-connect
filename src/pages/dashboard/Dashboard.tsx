import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardStats } from "@/components/profile/dashboard/DashboardStats";
import { ActivityChart } from "@/components/profile/dashboard/ActivityChart";
import { FollowersList } from "@/components/profile/dashboard/FollowersList";
import { RecentActivities } from "@/components/profile/dashboard/RecentActivities";
import { BookmarkedBusinesses } from "@/components/profile/dashboard/BookmarkedBusinesses";
import { CheckInHistory } from "@/components/profile/dashboard/CheckInHistory";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  // Fetch user profile data
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
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

  // Fetch any pending business approvals for notifications
  const { data: pendingApproval } = useQuery({
    queryKey: ['pendingBusinessApproval'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', session.user.id)
        .eq('status', 'pending')
        .maybeSingle();
        
      if (error) throw error;
      return data;
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-medium">Hello, {profile?.full_name || 'User'}</h1>
          <nav className="text-sm breadcrumbs">
            <ul>
              <li className="text-muted"><a href="/">Home</a></li>
              <li><a href="#" className="text-primary">Dashboard</a></li>
            </ul>
          </nav>
        </div>

        {/* Show pending approval notification if exists */}
        {pendingApproval && (
          <Alert variant="default" className="bg-primary/10 text-primary">
            <AlertDescription className="flex justify-between items-center">
              <p className="font-medium">
                Your listing <a href={`/business/${pendingApproval.id}`} className="text-success">{pendingApproval.name}</a> is pending approval
              </p>
              <button className="text-primary hover:opacity-75">
                <X className="h-4 w-4" />
              </button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <DashboardStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ActivityChart />
          </div>
          <div className="md:col-span-1">
            <FollowersList />
          </div>
        </div>

        {/* Activities & Bookmarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivities />
          <BookmarkedBusinesses />
        </div>

        {/* Check-in History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckInHistory />
          <RecentActivities />
        </div>

        {/* Footer */}
        <div className="py-3 text-sm text-gray-500">
          © {new Date().getFullYear()} Finda. All rights reserved.
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;