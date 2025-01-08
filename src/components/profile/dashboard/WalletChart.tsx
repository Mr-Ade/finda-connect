import React from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const WalletChart = () => {
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ['wallet-chart'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      // Get earnings by month for the last 6 months
      const { data, error } = await supabase
        .from('appointments')
        .select('amount, created_at')
        .eq('user_id', session.user.id)
        .eq('status', 'completed')
        .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString());

      if (error) {
        console.error('Error fetching chart data:', error);
        toast({
          title: "Error loading chart data",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }

      // Process data by month
      const monthlyData = data.reduce((acc, record) => {
        const date = new Date(record.created_at);
        const monthYear = date.toLocaleString('default', { month: 'short' });
        
        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        acc[monthYear] += record.amount || 0;
        return acc;
      }, {});

      // Convert to array format for chart
      return Object.entries(monthlyData).map(([month, value]) => ({
        name: month,
        value: value
      }));
    }
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Earnings Overview</h3>
      <div className="h-[365px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
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