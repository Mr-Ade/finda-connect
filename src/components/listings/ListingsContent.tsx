import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ListingCard } from "@/components/home/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const ListingsContent = () => {
  const { data: businesses, isLoading } = useQuery({
    queryKey: ['userListings'],
    queryFn: async () => {
      console.log('Fetching user listings...');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.error('No user session found');
        throw new Error('No user session');
      }

      console.log('User ID:', session.user.id);
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos (photo_url),
          reviews (rating)
        `)
        .eq('owner_id', session.user.id);

      if (error) {
        console.error('Error fetching listings:', error);
        throw error;
      }

      console.log('Fetched listings:', data);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!businesses?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">You haven't created any listings yet.</p>
        <Button asChild>
          <Link to="/dashboard/add-listing">Create Your First Listing</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <ListingCard key={business.id} business={business} />
      ))}
    </div>
  );
};