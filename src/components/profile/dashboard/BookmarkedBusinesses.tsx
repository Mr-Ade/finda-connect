import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const BookmarkedBusinesses = () => {
  const { data: bookmarks } = useQuery({
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
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Bookmarked Businesses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookmarks?.map((bookmark) => (
            <div key={bookmark.id} className="flex items-start space-x-4">
              <div>
                <Link 
                  to={`/business/${bookmark.business_id}`}
                  className="font-medium hover:underline"
                >
                  {bookmark.businesses?.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {bookmark.businesses?.category} • {bookmark.businesses?.city}, {bookmark.businesses?.state}
                </p>
                <p className="text-xs text-gray-400">
                  Bookmarked on {new Date(bookmark.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {(!bookmarks || bookmarks.length === 0) && (
            <p className="text-gray-500">No bookmarked businesses yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};