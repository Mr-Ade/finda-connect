import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { ReviewManagementTable } from "@/components/admin/reviews/ReviewManagementTable";
import { ReviewFilters } from "@/components/admin/reviews/ReviewFilters";
import { ReviewAnalytics } from "@/components/admin/reviews/ReviewAnalytics"; // Added this import
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Filters {
  search: string;
  status: string;
  rating: string;
}

const Reviews = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "all",
    rating: "all",
  });

  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-reviews', filters],
    queryFn: async () => {
      console.log('Fetching reviews for admin with filters:', filters);
      let query = supabase
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

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters.rating !== 'all') {
        query = query.eq('rating', parseInt(filters.rating));
      }

      if (filters.search) {
        query = query.ilike('review_text', `%${filters.search}%`);
      }

      const { data, error } = await query;

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
          
          <ReviewAnalytics />
          
          <ReviewFilters onFilterChange={setFilters} />
          
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