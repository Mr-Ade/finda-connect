import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, MessageSquare, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        { count: usersCount },
        { count: businessesCount },
        { count: reviewsCount },
        { count: pagesCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('businesses').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true }),
        supabase.from('cms_pages').select('*', { count: 'exact', head: true })
      ]);

      return {
        users: usersCount || 0,
        businesses: businessesCount || 0,
        reviews: reviewsCount || 0,
        pages: pagesCount || 0
      };
    }
  });

  const statCards = [
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: Users,
      description: "Active users on the platform"
    },
    {
      title: "Businesses",
      value: stats?.businesses || 0,
      icon: Store,
      description: "Listed businesses"
    },
    {
      title: "Reviews",
      value: stats?.reviews || 0,
      icon: MessageSquare,
      description: "User reviews"
    },
    {
      title: "Pages",
      value: stats?.pages || 0,
      icon: FileText,
      description: "Content pages"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};