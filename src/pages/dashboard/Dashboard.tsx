import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats } from "@/components/profile/dashboard/DashboardStats";
import { ActivityChart } from "@/components/profile/dashboard/ActivityChart";
import { ActivitiesFeed } from "@/components/profile/dashboard/ActivitiesFeed";
import { RecentReviews } from "@/components/profile/dashboard/RecentReviews";
import { BookmarkedBusinesses } from "@/components/profile/dashboard/BookmarkedBusinesses";
import { CheckInHistory } from "@/components/profile/dashboard/CheckInHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Dashboard = () => {
  const { toast } = useToast();
  
  const { data: profile, isLoading, error } = useQuery({
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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Error loading dashboard: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  const dismissNotification = () => {
    toast({
      description: "Notification dismissed",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Hello, {profile?.full_name || 'User'}</h1>
          <nav className="text-sm breadcrumbs">
            <ul className="flex gap-2 text-muted-foreground">
              <li><a href="/">Home</a></li>
              <li className="before:content-['/'] before:mx-2">Dashboard</li>
            </ul>
          </nav>
        </div>

        {/* Notification */}
        <Alert className="bg-primary/10 border-none text-primary mb-6">
          <AlertDescription className="flex items-center justify-between">
            <span>Your listing <a href="#" className="font-semibold hover:underline">Wedding Willa Resort</a> has been approved!</span>
            <button 
              onClick={dismissNotification}
              className="text-primary hover:opacity-75"
            >
              <X className="h-4 w-4" />
            </button>
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ActivityChart />
          </div>
          <div className="md:col-span-1">
            <ActivitiesFeed />
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentReviews />
          <BookmarkedBusinesses />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckInHistory />
          <ActivitiesFeed />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;