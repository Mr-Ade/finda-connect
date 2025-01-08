import React from "react";
import { Card } from "@/components/ui/card";
import { CreditCard, Wallet, MessageSquare, ShoppingBasket } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const WalletStats = () => {
  const { toast } = useToast();

  const { data: stats } = useQuery({
    queryKey: ['wallet-stats'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      // Get total earnings from appointments
      const { data: earnings, error: earningsError } = await supabase
        .from('appointments')
        .select('amount')
        .eq('status', 'completed')
        .eq('user_id', session.user.id);

      // Get total reviews
      const { count: reviewsCount, error: reviewsError } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      // Get total orders (appointments)
      const { count: ordersCount, error: ordersError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (earningsError || reviewsError || ordersError) {
        console.error('Error fetching wallet stats:', { earningsError, reviewsError, ordersError });
        toast({
          title: "Error loading wallet statistics",
          description: "Please try again later",
          variant: "destructive",
        });
        return null;
      }

      const totalEarnings = earnings?.reduce((sum, record) => sum + (record.amount || 0), 0) || 0;
      const withdrawableBalance = totalEarnings * 0.7; // Example: 70% of total earnings

      return {
        withdrawable: withdrawableBalance,
        total: totalEarnings,
        reviews: reviewsCount || 0,
        orders: ordersCount || 0
      };
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-red-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">${stats?.withdrawable.toFixed(2) || '0.00'}</h2>
        <p className="text-sm opacity-90">Withdrawable Balance</p>
        <CreditCard className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>

      <Card className="bg-green-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">${stats?.total.toFixed(2) || '0.00'}</h2>
        <p className="text-sm opacity-90">Total Earnings</p>
        <Wallet className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>

      <Card className="bg-yellow-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">{stats?.reviews || 0}</h2>
        <p className="text-sm opacity-90">Total Reviews</p>
        <MessageSquare className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>

      <Card className="bg-purple-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">{stats?.orders || 0}</h2>
        <p className="text-sm opacity-90">Total Orders</p>
        <ShoppingBasket className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>
    </div>
  );
};