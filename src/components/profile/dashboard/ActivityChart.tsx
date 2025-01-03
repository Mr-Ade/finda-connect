import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ActivityChart = () => {
  const { data: chartData } = useQuery({
    queryKey: ['activity-chart'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      // Get last 7 days of activity
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const { data, error } = await supabase
        .from('reviews')
        .select('created_at')
        .eq('user_id', session.user.id)
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      // Process data for chart
      const activityByDay = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          activity: data.filter(review => 
            new Date(review.created_at).toDateString() === date.toDateString()
          ).length
        };
      }).reverse();

      return activityByDay;
    }
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">View Chart</h3>
      <div className="h-[365px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="activity" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ fill: '#8884d8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};