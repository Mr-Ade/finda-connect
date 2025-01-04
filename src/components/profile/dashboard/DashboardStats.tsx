import { Card } from "@/components/ui/card";
import { Files, Eye, MessageSquare, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const DashboardStats = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const [businesses, reviews, bookmarks, checkins] = await Promise.all([
        supabase.from('businesses').select('id', { count: 'exact' }).eq('owner_id', session.user.id),
        supabase.from('reviews').select('id', { count: 'exact' }).eq('user_id', session.user.id),
        supabase.from('bookmarks').select('id', { count: 'exact' }).eq('user_id', session.user.id),
        supabase.from('checkins').select('id', { count: 'exact' }).eq('user_id', session.user.id),
      ]);

      return {
        listings: businesses.count || 0,
        reviews: reviews.count || 0,
        bookmarks: bookmarks.count || 0,
        checkins: checkins.count || 0,
      };
    }
  });

  const statCards = [
    {
      title: "Active Listings",
      value: stats?.listings || 0,
      icon: Files,
      color: "bg-red-500",
    },
    {
      title: "Total Views",
      value: stats?.reviews || 0,
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Total Reviews",
      value: stats?.bookmarks || 0,
      icon: MessageSquare,
      color: "bg-yellow-500",
    },
    {
      title: "Total Bookings",
      value: stats?.checkins || 0,
      icon: Briefcase,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className={`${stat.color} text-white p-6 relative overflow-hidden`}>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-1">{stat.value}</h2>
            <p className="text-sm opacity-90">{stat.title}</p>
          </div>
          <stat.icon className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
        </Card>
      ))}
    </div>
  );
};