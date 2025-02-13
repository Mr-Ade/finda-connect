
import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, MousePointerClick, Phone, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, subDays, format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const BusinessAnalytics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { data: analyticsHistory, isLoading } = useQuery({
    queryKey: ['analytics-history-detailed', dateRange],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const query = supabase
        .from('business_analytics')
        .select('*')
        .order('date', { ascending: true });

      if (dateRange?.from) {
        query.gte('date', dateRange.from.toISOString().split('T')[0]);
      }
      if (dateRange?.to) {
        query.lte('date', dateRange.to.toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  // Calculate overall trends
  const calculateTotalMetric = (metric: string) => {
    if (!analyticsHistory) return 0;
    return analyticsHistory.reduce((sum, day) => sum + (day[metric] || 0), 0);
  };

  // Calculate daily averages
  const calculateDailyAverage = (metric: string) => {
    if (!analyticsHistory || analyticsHistory.length === 0) return 0;
    const total = calculateTotalMetric(metric);
    return total / analyticsHistory.length;
  };

  return (
    <BusinessOwnerLayout loading={isLoading}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Detailed analytics and insights for your business
            </p>
          </div>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>

        {/* Overview Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateTotalMetric('views')}</div>
              <p className="text-xs text-muted-foreground">
                Avg {calculateDailyAverage('views').toFixed(1)} per day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateTotalMetric('unique_visitors')}</div>
              <p className="text-xs text-muted-foreground">
                Avg {calculateDailyAverage('unique_visitors').toFixed(1)} per day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateTotalMetric('website_clicks')}</div>
              <p className="text-xs text-muted-foreground">
                Avg {calculateDailyAverage('website_clicks').toFixed(1)} per day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phone Views</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateTotalMetric('phone_views')}</div>
              <p className="text-xs text-muted-foreground">
                Avg {calculateDailyAverage('phone_views').toFixed(1)} per day
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trends Chart */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Traffic Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    name="Views"
                    dataKey="views" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    name="Unique Visitors"
                    dataKey="unique_visitors" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Chart */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                  />
                  <Legend />
                  <Bar 
                    name="Website Clicks"
                    dataKey="website_clicks" 
                    fill="#ffc658" 
                  />
                  <Bar 
                    name="Phone Views"
                    dataKey="phone_views" 
                    fill="#ff7300" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessOwnerLayout>
  );
};
