import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const BusinessAnalytics = () => {
  // Fetch analytics data
  const { data: analyticsData } = useQuery({
    queryKey: ['business-analytics'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      // Fetch views, inquiries, and bookings data
      const { data, error } = await supabase
        .from('business_analytics')
        .select('*')
        .eq('owner_id', session.user.id)
        .order('date', { ascending: true })
        .limit(30);
        
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
                <Line type="monotone" dataKey="inquiries" stroke="#82ca9d" name="Inquiries" />
                <Line type="monotone" dataKey="bookings" stroke="#ffc658" name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {analyticsData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {analyticsData?.reduce((sum, item) => sum + (item.inquiries || 0), 0) || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {analyticsData?.reduce((sum, item) => sum + (item.bookings || 0), 0) || 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessAnalytics;