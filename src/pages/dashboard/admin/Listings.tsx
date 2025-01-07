import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { AdminListingsHeader } from "@/components/admin/listings/AdminListingsHeader";
import { AdminListingsTable } from "@/components/admin/listings/AdminListingsTable";
import { AdminListingsFilters } from "@/components/admin/listings/AdminListingsFilters";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"] & {
  owner: {
    full_name: string | null;
  } | null;
  business_photos: {
    photo_url: string;
  }[] | null;
  reviews: {
    rating: number;
  }[] | null;
};

const AdminListings = () => {
  const { toast } = useToast();

  const { data: listings, isLoading } = useQuery({
    queryKey: ['adminListings'],
    queryFn: async () => {
      console.log('Fetching admin listings...');
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          owner:profiles(full_name),
          business_photos(photo_url),
          reviews(rating)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching listings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch listings",
          variant: "destructive",
        });
        throw error;
      }

      return data as Business[];
    }
  });

  return (
    <AdminRoute>
      <DashboardLayout>
        <AdminListingsHeader />
        
        <div className="mb-6">
          <AdminListingsFilters />
        </div>

        <Card>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <AdminListingsTable listings={listings || []} />
          )}
        </Card>
      </DashboardLayout>
    </AdminRoute>
  );
};

export default AdminListings;