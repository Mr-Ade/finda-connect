import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, MousePointerClick, Phone, Download } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { subDays } from "date-fns";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const BusinessOwnerDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['business-analytics', dateRange],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const query = supabase
        .from('business_analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1);

      if (dateRange?.from) {
        query.gte('date', dateRange.from.toISOString().split('T')[0]);
      }
      if (dateRange?.to) {
        query.lte('date', dateRange.to.toISOString().split('T')[0]);
      }

      const { data, error } = await query.single();
      if (error) throw error;
      return data;
    }
  });

  const { data: analyticsHistory } = useQuery({
    queryKey: ['analytics-history', dateRange],
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

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getPercentageChange = (metric: string) => {
    if (!analyticsHistory || analyticsHistory.length < 2) return 0;
    const currentValue = analyticsHistory[analyticsHistory.length - 1][metric] || 0;
    const previousValue = analyticsHistory[0][metric] || 0;
    return calculatePercentageChange(currentValue, previousValue);
  };

  useEffect(() => {
    const channel = supabase.channel('analytics-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'business_analytics' },
        () => {
          console.log('Analytics updated, refreshing data...');
          queryClient.invalidateQueries({ queryKey: ['business-analytics'] });
          queryClient.invalidateQueries({ queryKey: ['analytics-history'] });
          
          toast({
            title: "Analytics Updated",
            description: "Your analytics data has been updated in real-time",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  const handleExport = async () => {
    if (!analyticsHistory) return;

    const csvContent = [
      // CSV Headers
      ['Date', 'Views', 'Unique Visitors', 'Website Clicks', 'Phone Views'].join(','),
      // CSV Data
      ...analyticsHistory.map(row => [
        row.date,
        row.views,
        row.unique_visitors,
        row.website_clicks,
        row.phone_views
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_${dateRange?.from?.toISOString().split('T')[0]}_to_${dateRange?.to?.toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Your analytics data has been exported to CSV",
    });
  };

  return (
    <BusinessOwnerLayout loading={isLoading}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your business dashboard. Here's an overview of your performance.
            </p>
          </div>
          <div className="flex gap-4">
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
            <Button
              variant="outline"
              size="icon"
              onClick={handleExport}
              title="Export to CSV"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.views || 0}</div>
              <p className={`text-xs ${getPercentageChange('views') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {getPercentageChange('views').toFixed(1)}% from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.unique_visitors || 0}</div>
              <p className={`text-xs ${getPercentageChange('unique_visitors') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {getPercentageChange('unique_visitors').toFixed(1)}% from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.website_clicks || 0}</div>
              <p className={`text-xs ${getPercentageChange('website_clicks') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {getPercentageChange('website_clicks').toFixed(1)}% from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phone Views</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.phone_views || 0}</div>
              <p className={`text-xs ${getPercentageChange('phone_views') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {getPercentageChange('phone_views').toFixed(1)}% from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    name="Views"
                    dataKey="views" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    name="Unique Visitors"
                    dataKey="unique_visitors" 
                    stroke="#82ca9d" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    name="Website Clicks"
                    dataKey="website_clicks" 
                    stroke="#ffc658" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    name="Phone Views"
                    dataKey="phone_views" 
                    stroke="#ff7300" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessOwnerLayout>
  );
};
