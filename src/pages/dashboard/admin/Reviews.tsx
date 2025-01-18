import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { ReviewManagementTable } from "@/components/admin/reviews/ReviewManagementTable";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Reviews = () => {
  const { toast } = useToast();

  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      console.log('Fetching reviews for admin...');
      const { data, error } = await supabase
        .from('business_reviews')
        .select(`
          id,
          business_id,
          user_id,
          rating,
          review_text,
          review_date,
          status,
          helpful_votes
        `)
        .order('review_date', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: "Error fetching reviews",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    }
  });

  if (error) {
    return (
      <AdminRoute>
        <DashboardLayout>
          <div className="p-4 text-red-500">
            Error loading reviews. Please try again later.
          </div>
        </DashboardLayout>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Review Management</h1>
          </div>
          
          <ReviewManagementTable 
            reviews={reviews || []}
            isLoading={isLoading}
            onReviewUpdated={refetch}
          />
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
};

export default Reviews;