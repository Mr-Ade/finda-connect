import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2, MapPin, Star, Edit, Eye, Trash2 } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const { toast } = useToast();
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
            state,
            description,
            reviews (
              rating
            )
          )
        `)
        .eq('user_id', session.user.id);

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (bookmarkId: string) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Bookmark removed successfully",
      });
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="md:col-span-3">
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
                  <i className="far fa-file-alt mr-2 text-primary"></i>
                  My Saved Listings
                </h4>
              </div>

              {isLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : bookmarks?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">You haven't saved any listings yet.</p>
              ) : (
                <div className="space-y-6">
                  {bookmarks?.map((bookmark) => (
                    <div key={bookmark.id} className="flex flex-col md:flex-row gap-6 border rounded-lg p-4">
                      <div className="w-full md:w-48 h-48">
                        <img 
                          src={bookmark.businesses?.photo_url || '/placeholder.svg'} 
                          alt={bookmark.businesses?.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{bookmark.businesses?.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{bookmark.businesses?.city}, {bookmark.businesses?.state}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {bookmark.businesses?._count?.reviews || 0} Reviews
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link to={`/business/${bookmark.business_id}/edit`}>
                              <Edit className="w-4 h-4 mr-1" />
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
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;