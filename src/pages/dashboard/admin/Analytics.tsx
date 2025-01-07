import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";

const Analytics = () => {
  // Fetch analytics data
  const { data: analyticsData } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      console.log('Fetching analytics data...');
      
      // Get user signups per month
      const { data: signups, error: signupsError } = await supabase
        .from('profiles')
        .select('created_at')
        .order('created_at');

      if (signupsError) {
        console.error('Error fetching signups:', signupsError);
        throw signupsError;
      }

      // Get business listings per month
      const { data: listings, error: listingsError } = await supabase
        .from('businesses')
        .select('created_at')
        .order('created_at');

      if (listingsError) {
        console.error('Error fetching listings:', listingsError);
        throw listingsError;
      }

      // Process data for charts
      const monthlyData = signups?.reduce((acc: any[], signup: any) => {
        const month = new Date(signup.created_at).toLocaleString('default', { month: 'short' });
        const existingMonth = acc.find(item => item.month === month);
        if (existingMonth) {
          existingMonth.signups += 1;
        } else {
          acc.push({ month, signups: 1, listings: 0 });
        }
        return acc;
      }, []) || [];

      // Add listings data
      listings?.forEach((listing: any) => {
        const month = new Date(listing.created_at).toLocaleString('default', { month: 'short' });
        const existingMonth = monthlyData.find(item => item.month === month);
        if (existingMonth) {
          existingMonth.listings += 1;
        } else {
          monthlyData.push({ month, signups: 0, listings: 1 });
        }
      });

      return monthlyData;
    }
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Signups & Business Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="signups" fill="#8884d8" name="User Signups" />
                    <Bar dataKey="listings" fill="#82ca9d" name="Business Listings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <Analytics />
  </AdminRoute>
);