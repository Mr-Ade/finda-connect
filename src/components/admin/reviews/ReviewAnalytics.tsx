import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ReviewStats {
  total: number;
  pending: number;
  published: number;
  rejected: number;
  flagged: number;
  averageRating: number;
}

export const ReviewAnalytics = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['review-stats'],
    queryFn: async () => {
      const { data: reviews, error } = await supabase
        .from('business_reviews')
        .select('status, rating');

      if (error) throw error;

      const stats: ReviewStats = {
        total: reviews.length,
        pending: reviews.filter(r => r.status === 'pending').length,
        published: reviews.filter(r => r.status === 'published').length,
        rejected: reviews.filter(r => r.status === 'rejected').length,
        flagged: reviews.filter(r => r.status === 'flagged').length,
        averageRating: reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length,
      };

      return stats;
    }
  });

  const chartData = stats ? [
    { name: 'Pending', value: stats.pending },
    { name: 'Published', value: stats.published },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Flagged', value: stats.flagged },
  ] : [];

  if (isLoading) return <div>Loading analytics...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total || 0}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.averageRating?.toFixed(1) || 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.pending || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.flagged || 0}</div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Review Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};