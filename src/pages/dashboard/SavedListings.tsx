import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SavedListings = () => {
  const { toast } = useToast();

  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ['bookmarks'],
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
            state,
            business_photos (
              photo_url
            ),
            reviews (
              rating
            )
          )
        `)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching bookmarks:', error);
        throw error;
      }

      return data;
    }
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Bookmark removed successfully",
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Saved Listings</h1>
          <nav className="text-sm breadcrumbs">
            <ol className="flex gap-2 text-gray-500">
              <li><Link to="/">Home</Link></li>
              <li>•</li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li>•</li>
              <li className="text-primary">Saved Listings</li>
            </ol>
          </nav>
        </div>

        <Card className="p-6">
          <div className="border-b pb-4 mb-4">
            <h4 className="text-lg font-medium flex items-center">
              <i className="far fa-file-alt me-2 text-primary"></i>My Listings
            </h4>  
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">Loading saved listings...</div>
          ) : !bookmarks?.length ? (
            <div className="text-center py-8 text-gray-500">No saved listings found</div>
          ) : (
            <div className="space-y-6">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex flex-col md:flex-row gap-6 border rounded-lg p-4">
                  <div className="w-full md:w-48 h-48">
                    <img 
                      src={bookmark.businesses?.business_photos?.[0]?.photo_url || '/placeholder.svg'} 
                      alt={bookmark.businesses?.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{bookmark.businesses?.name}</h3>
                    <span className="flex items-center gap-1 text-gray-500 mb-3">
                      <i className="lni lni-map-marker"></i>
                      <span>{bookmark.businesses?.city}, {bookmark.businesses?.state}</span>
                    </span>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i 
                            key={star}
                            className={`fas fa-star ${star <= (bookmark.businesses?.reviews?.[0]?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {bookmark.businesses?.reviews?.length || 0} Reviews
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/business/${bookmark.business_id}/edit`}>
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/business/${bookmark.business_id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(bookmark.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SavedListings;