import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

const Bookmarks = () => {
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ['userBookmarks'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          *,
          businesses (
            id,
            name,
            category,
            city,
            state
          )
        `)
        .eq('user_id', session.user.id);

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
              <h2 className="text-2xl font-semibold mb-6">Saved Listings</h2>
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : bookmarks?.length === 0 ? (
                <p className="text-gray-500">You haven't saved any listings yet.</p>
              ) : (
                <div className="space-y-4">
                  {bookmarks?.map((bookmark) => (
                    <div key={bookmark.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{bookmark.businesses?.name}</h3>
                      <p className="text-sm text-gray-500">{bookmark.businesses?.category}</p>
                      <p className="text-sm">{bookmark.businesses?.city}, {bookmark.businesses?.state}</p>
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

export default Bookmarks;