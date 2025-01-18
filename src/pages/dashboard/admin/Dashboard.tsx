import { AdminRoute } from "@/components/auth/AdminRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, Building2, BarChart2, Settings, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      console.log('Fetching admin dashboard stats...');
      
      const [usersResponse, businessesResponse] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('businesses').select('*', { count: 'exact', head: true })
      ]);

      if (usersResponse.error) throw usersResponse.error;
      if (businessesResponse.error) throw businessesResponse.error;

      return {
        totalUsers: usersResponse.count || 0,
        totalBusinesses: businessesResponse.count || 0
      };
    }
  });

  const adminCards = [
    {
      title: "Users",
      value: stats?.totalUsers || 0,
      description: "Total registered users",
      icon: Users,
      link: "/dashboard/admin/users"
    },
    {
      title: "Businesses",
      value: stats?.totalBusinesses || 0,
      description: "Total businesses",
      icon: Building2,
      link: "/dashboard/admin/listings"
    },
    {
      title: "Content",
      value: "Manage",
      description: "CMS Pages",
      icon: FileText,
      link: "/dashboard/admin/cms"
    },
    {
      title: "Analytics",
      value: "View",
      description: "Platform analytics",
      icon: BarChart2,
      link: "/dashboard/admin/analytics"
    },
    {
      title: "Settings",
      value: "Manage",
      description: "Platform settings",
      icon: Settings,
      link: "/dashboard/admin/settings"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {adminCards.map((card) => (
              <Card key={card.title} className="hover:shadow-lg transition-shadow">
                <Link to={card.link}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <AdminDashboard />
  </AdminRoute>
);