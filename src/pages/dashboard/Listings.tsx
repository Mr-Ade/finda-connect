import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Star, Edit, Eye, Trash2, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  state: string;
  business_photos: { photo_url: string }[];
  reviews: { rating: number }[];
}

const Listings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: listings, isLoading, error } = useQuery({
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
          business_photos(photo_url),
          reviews(rating)
        `)
        .eq('owner_id', session.user.id);

      if (error) {
        console.error('Error fetching listings:', error);
        throw error;
      }

      console.log('Fetched listings:', data);
      return data as Business[];
    },
  });

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
      console.error('Error deleting business:', error);
      toast({
        title: "Error",
        description: "Failed to delete business listing",
        variant: "destructive",
      });
    }
  };

  if (error) {
    console.error('Error fetching listings:', error);
    return (
      <DashboardLayout>
        <div className="text-center text-red-600">
          Error loading listings. Please try again later.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">My Listings</h1>
            <nav className="text-sm breadcrumbs">
              <ol className="flex gap-2 text-muted-foreground">
                <li><Link to="/">Home</Link></li>
                <li className="before:content-['/'] before:mx-2">Dashboard</li>
                <li className="before:content-['/'] before:mx-2 text-primary">My Listings</li>
              </ol>
            </nav>
          </div>
          <Button asChild className="flex items-center gap-2">
            <Link to="/dashboard/add-listing">
              <Plus className="w-4 h-4" />
              Add New Listing
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : !listings?.length ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created any listings yet.</p>
              <Button asChild>
                <Link to="/dashboard/add-listing">Create Your First Listing</Link>
              </Button>
            </div>
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
                    <h3 className="text-lg font-semibold mb-2">{listing.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{listing.city}, {listing.state}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {listing.description}
                    </p>
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
                      <span className="text-sm text-muted-foreground">
                        {listing.reviews?.length || 0} Reviews
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/dashboard/listings/${listing.id}/edit`)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/business/${listing.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(listing.id)}
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
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Listings;