import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats } from "./DashboardStats";
import { ActivityChart } from "./ActivityChart";
import { ActivitiesFeed } from "./ActivitiesFeed";
import { RecentReviews } from "./RecentReviews";
import { BookmarkedBusinesses } from "./BookmarkedBusinesses";
import { CheckInHistory } from "./CheckInHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

export const UserDashboard = () => {
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

  return (
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
          <button className="text-primary hover:opacity-75">
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
  );
};