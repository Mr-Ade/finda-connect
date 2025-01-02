import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MapPin, Star, Edit, Eye, Trash2 } from "lucide-react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: listings, isLoading } = useQuery({
    queryKey: ['userListings'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos(photo_url),
          reviews(rating)
        `)
        .eq('owner_id', session.user.id);

      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (id: string) => {
    navigate(`/business/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/business/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Business listing deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete business listing",
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
            <div className="mb-6">
              <h1 className="text-2xl font-semibold mb-2">Manage Listings</h1>
              <nav className="text-sm breadcrumbs">
                <ul className="flex gap-2 text-muted-foreground">
                  <li><a href="/">Home</a></li>
                  <li className="before:content-['/'] before:mx-2">Dashboard</li>
                  <li className="before:content-['/'] before:mx-2 text-primary">Manage Listings</li>
                </ul>
              </nav>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="border-b p-4">
                <h4 className="flex items-center gap-2 font-medium">
                  <i className="text-primary">📋</i>
                  My Listings
                </h4>
              </div>

              <div className="p-4">
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : !listings?.length ? (
                  <p className="text-center text-gray-500 p-8">
                    You haven't created any listings yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div key={listing.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                        <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden">
                          <img 
                            src={listing.business_photos?.[0]?.photo_url || "/placeholder.svg"} 
                            alt={listing.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-lg font-semibold mb-2">{listing.name}</h5>
                          <div className="flex items-center gap-1 text-gray-500 mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{listing.city}, {listing.state}</span>
                          </div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= (listing.reviews?.reduce((acc, review) => acc + review.rating, 0) / (listing.reviews?.length || 1))
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {listing.reviews?.length || 0} Reviews
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(listing.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleView(listing.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-green-600 bg-green-50 rounded-md hover:bg-green-100"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(listing.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;