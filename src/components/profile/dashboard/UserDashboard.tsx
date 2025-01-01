import { Card } from "@/components/ui/card";
import { Files, Eye, MessageSquare, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardChart } from "./DashboardChart";
import { DashboardStats } from "./DashboardStats";
import { RecentActivities } from "./RecentActivities";
import { InvoicesList } from "./InvoicesList";

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

      {/* Stats Grid */}
      <DashboardStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DashboardChart />
        </div>
        <div className="md:col-span-1">
          <Card className="p-5">
            <h3 className="font-semibold mb-4">Recent Followers</h3>
            {/* Add followers list here */}
          </Card>
        </div>
      </div>

      {/* Activities and Invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivities />
        <InvoicesList />
      </div>
    </div>
  );
};