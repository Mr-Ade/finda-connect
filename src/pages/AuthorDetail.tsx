import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AuthorListings } from "@/components/author/AuthorListings";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Globe, Heart, FileText, ThumbsUp } from "lucide-react";
import { LocationData } from "@/types/supabase/common";

const AuthorDetail = () => {
  const { username } = useParams();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          businesses:businesses(*)
        `)
        .eq('username', username)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['author-stats', username],
    queryFn: async () => {
      const [listings, followers, following] = await Promise.all([
        supabase.from('businesses').select('id', { count: 'exact' }).eq('owner_id', profile?.id),
        supabase.from('follows').select('id', { count: 'exact' }).eq('following_id', profile?.id),
        supabase.from('follows').select('id', { count: 'exact' }).eq('follower_id', profile?.id)
      ]);

      return {
        listings: listings.count || 0,
        followers: followers.count || 0,
        following: following.count || 0
      };
    },
    enabled: !!profile?.id
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Author not found</div>;
  }

  const locationData = profile.location_data as LocationData | null;

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Author Info Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <div className="absolute top-4 right-4 px-2 py-1 bg-green-500 text-white text-sm rounded">
                  Online Now
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={profile.avatar_url || "/placeholder.svg"}
                    alt={profile.full_name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h5 className="text-xl font-semibold">{profile.full_name}</h5>
                    <div className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {locationData?.city || 'Location not set'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="font-semibold">{stats?.listings}</div>
                    <div className="text-sm text-gray-600">Listings</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ThumbsUp className="w-5 h-5" />
                    </div>
                    <div className="font-semibold">{stats?.followers}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div className="font-semibold">{stats?.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Button variant="outline" className="w-full">
                    Follow
                  </Button>
                  <Button className="w-full">
                    Message
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h5 className="font-medium">Mail Us</h5>
                      <p className="text-gray-600">{profile.email || 'Email not set'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h5 className="font-medium">Make Call</h5>
                      <p className="text-gray-600">Phone not set</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h5 className="font-medium">Get Direction</h5>
                      <p className="text-gray-600">{locationData?.address || 'Address not set'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h5 className="font-medium">Live Web</h5>
                      <p className="text-gray-600">Website not set</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Author Listings */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-lg font-semibold">
                  You have total <span className="text-primary px-2">{stats?.listings}</span> Listings
                </h5>
                <div className="flex gap-4">
                  {/* Add filter buttons here if needed */}
                </div>
              </div>

              <AuthorListings data={profile.businesses} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorDetail;
