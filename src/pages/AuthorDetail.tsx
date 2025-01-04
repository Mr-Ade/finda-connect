import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Globe, FileText, ThumbsUp, Heart } from "lucide-react";
import { RecentListings } from "@/components/home/RecentListings";

const AuthorDetail = () => {
  const { username } = useParams();

  const { data: author, isLoading } = useQuery({
    queryKey: ['author', username],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select(`
          *,
          businesses:businesses(count),
          followers:follows(count)
        `)
        .eq('username', username)
        .single();

      return profile;
    }
  });

  const { data: listings } = useQuery({
    queryKey: ['author-listings', username],
    queryFn: async () => {
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', author?.id);
      return data;
    },
    enabled: !!author?.id
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!author) {
    return <div>Author not found</div>;
  }

  const locationData = author.location_data as { city?: string; address?: string } | null;

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Author Info Card */}
          <div className="md:col-span-4">
            <Card className="p-6">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Online Now
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={author.avatar_url || "/placeholder.svg"} 
                    alt={author.full_name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{author.full_name}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {locationData?.city || "Location not set"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="font-semibold text-xl">{author.businesses?.[0]?.count || 0}</div>
                    <div className="text-sm text-gray-600">Listings</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ThumbsUp className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="font-semibold text-xl">{author.followers?.[0]?.count || 0}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="font-semibold text-xl">0</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Button variant="outline" className="w-full">Follow</Button>
                  <Button className="w-full">Message</Button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Mail Us</h5>
                      <p className="text-gray-600 text-sm">{author.email || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Phone</h5>
                      <p className="text-gray-600 text-sm">{author.phone || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Location</h5>
                      <p className="text-gray-600 text-sm">{locationData?.address || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Globe className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Website</h5>
                      <p className="text-gray-600 text-sm">{author.website || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Listings Section */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold">
                  You have total <span className="text-primary px-2">{author.businesses?.[0]?.count || 0}</span> Listings
                </h4>
              </div>
            </div>

            {/* Display author's listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings?.map((listing) => (
                <RecentListings key={listing.id} data={listing} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;