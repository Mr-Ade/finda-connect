
import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const BusinessListings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: listings } = useQuery({
    queryKey: ['business-listings'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('owner_id', session.user.id);

      if (error) throw error;
      return data;
    }
  });

  const handleDelete = async (listingId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('business_listings')
        .delete()
        .eq('id', listingId);

      if (error) throw error;

      toast({
        title: "Listing Deleted",
        description: "Your listing has been successfully deleted."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BusinessOwnerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your business listings here.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings?.map((listing) => (
            <Card key={listing.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{listing.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(listing.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{listing.description}</p>
                <div className="mt-2 text-sm">
                  <p>Status: <span className="font-medium">{listing.status}</span></p>
                  <p>Views: <span className="font-medium">{listing.views || 0}</span></p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BusinessOwnerLayout>
  );
};
