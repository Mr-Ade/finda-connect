import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

const Listings = () => {
  const { data: listings, isLoading } = useQuery({
    queryKey: ['userListings'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', session.user.id);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="md:col-span-3">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">My Listings</h2>
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : listings?.length === 0 ? (
                <p className="text-gray-500">You haven't created any listings yet.</p>
              ) : (
                <div className="space-y-4">
                  {listings?.map((listing) => (
                    <div key={listing.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{listing.name}</h3>
                      <p className="text-sm text-gray-500">{listing.category}</p>
                      <p className="text-sm">{listing.address}, {listing.city}, {listing.state}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;