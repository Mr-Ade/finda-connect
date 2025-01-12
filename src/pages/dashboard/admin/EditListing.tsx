import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
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
};

const AdminEditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: business, isLoading } = useQuery({
    queryKey: ['adminListing', id],
    queryFn: async () => {
      console.log('Fetching business details for editing...');
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          owner:profiles(full_name),
          business_photos(photo_url)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching business:', error);
        toast({
          title: "Error",
          description: "Failed to fetch business details",
          variant: "destructive",
        });
        throw error;
      }

      return data as Business;
    }
  });

  if (isLoading) {
    return (
      <AdminRoute>
        <DashboardLayout>
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </DashboardLayout>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit Business: {business?.name}</h1>
          </div>
          
          <Card className="p-6">
            {/* Add your edit form here */}
            <p>Edit form coming soon...</p>
          </Card>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
};

export default AdminEditListing;