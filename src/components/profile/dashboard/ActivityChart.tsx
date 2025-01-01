import { ResponsiveLine } from '@nivo/line';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';

export const ActivityChart = () => {
  const { data: activityData } = useQuery({
    queryKey: ['user-activity-chart'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      // Get last 7 days of activity
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const [reviews, checkins, bookmarks] = await Promise.all([
        supabase
          .from('reviews')
          .select('created_at')
          .eq('user_id', session.user.id)
          .gte('created_at', startDate.toISOString()),
        supabase
          .from('checkins')
          .select('created_at')
          .eq('user_id', session.user.id)
          .gte('created_at', startDate.toISOString()),
        supabase
          .from('bookmarks')
          .select('created_at')
          .eq('user_id', session.user.id)
          .gte('created_at', startDate.toISOString()),
      ]);

      // Process data for chart
      const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      return [
        {
          id: 'Reviews',
          data: days.map(day => ({
            x: day,
            y: reviews.data?.filter(r => r.created_at.startsWith(day)).length || 0
          }))
        },
        {
          id: 'Check-ins',
          data: days.map(day => ({
            x: day,
            y: checkins.data?.filter(c => c.created_at.startsWith(day)).length || 0
          }))
        },
        {
          id: 'Bookmarks',
          data: days.map(day => ({
            x: day,
            y: bookmarks.data?.filter(b => b.created_at.startsWith(day)).length || 0
          }))
        }
      ];
    }
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
      <div style={{ height: 400 }}>
        {activityData && (
          <ResponsiveLine
            data={activityData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: 'circle',
              }
            ]}
          />
        )}
      </div>
    </Card>
  );
};