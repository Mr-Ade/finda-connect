import { FileText, Eye, MessageSquare, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const DashboardStats = () => {
  // Fetch user stats from Supabase
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      // Get active listings count
      const { count: activeListings } = await supabase
        .from('businesses')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', session.user.id)
        .eq('status', 'approved');

      // Get total views (from activities table)
      const { count: totalViews } = await supabase
        .from('activities')
        .select('*', { count: 'exact', head: true })
        .eq('activity_type', 'view')
        .eq('user_id', session.user.id);

      // Get total reviews
      const { count: totalReviews } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      // Get total bookings/appointments
      const { count: totalBookings } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      return {
        activeListings: activeListings || 0,
        totalViews: totalViews || 0,
        totalReviews: totalReviews || 0,
        totalBookings: totalBookings || 0
      };
    }
  });

  const statsData = [
    {
      title: "Active Listings",
      value: stats?.activeListings.toString() || "0",
      icon: FileText,
      bgColor: "bg-red-500",
    },
    {
      title: "Views Listing",
      value: stats?.totalViews.toString() || "0",
      icon: Eye,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews.toString() || "0",
      icon: MessageSquare,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings.toString() || "0",
      icon: Wallet,
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} text-white p-6 relative overflow-hidden`}>
          <div className="relative z-10">
            <h2 className="text-2xl font-medium mb-1">{stat.value}</h2>
            <p className="text-sm opacity-90">{stat.title}</p>
          </div>
          <stat.icon className="absolute right-4 bottom-4 opacity-20 w-12 h-12" />
        </Card>
      ))}
    </div>
  );
};