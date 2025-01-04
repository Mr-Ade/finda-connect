import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Mail, Star, Wifi, Car, Dog, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

export const RecentListings = () => {
  const [showAll, setShowAll] = useState(false);

  const { data: businesses, isLoading, error } = useQuery({
    queryKey: ['recentListings'],
    queryFn: async () => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .gte('created_at', oneWeekAgo.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Business[];
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings</div>;
  if (!businesses?.length) return <div>No listings found</div>;

  const displayedBusinesses = showAll ? businesses : businesses.slice(0, 8);
  const hasMore = businesses.length > 8;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-gray-500 mb-2">Recent Listings</h6>
          <h2 className="text-3xl font-bold">
            Browse Recent <span className="text-primary">Listings</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedBusinesses.map((business) => (
            <div key={business.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                    Open
                  </span>
                  <span className="bg-primary text-white px-2 py-1 rounded text-sm">
                    Featured
                  </span>
                </div>

                <Link to={`/business/${business.id}`}>
                  <img 
                    src="/placeholder.svg"
                    alt={business.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>

                <div className="absolute bottom-3 right-3 bg-white/90 rounded-full p-2 flex items-center gap-2">
                  <div className="text-yellow-500 font-bold">4.5</div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm ml-1">(32)</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src="/placeholder.svg"
                    alt="Author"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex gap-2 text-xs text-gray-500">
                      {business.category && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {business.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  <Link to={`/business/${business.id}`} className="hover:text-primary">
                    {business.name}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {business.description}
                </p>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Facilities:</div>
                  <div className="flex gap-3">
                    <Wifi className="h-4 w-4 text-gray-400" />
                    <Car className="h-4 w-4 text-gray-400" />
                    <Dog className="h-4 w-4 text-gray-400" />
                    <Wind className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Mail className="h-4 w-4 mr-1" />
                    {business.city}, {business.state}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
            >
              {showAll ? 'Show Less' : 'See More'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};