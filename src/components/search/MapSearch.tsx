import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MapView } from '@/components/map/MapView';
import { BusinessCard } from '@/components/BusinessCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapIcon, List } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

export const MapSearch = () => {
  const { city, state } = useLocation();
  const [showMap, setShowMap] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['map-businesses', searchTerm, city, state],
    queryFn: async () => {
      console.log('Fetching businesses for map:', { searchTerm, city, state });
      
      let query = supabase
        .from('businesses')
        .select(`
          *,
          business_photos (photo_url),
          reviews (rating)
        `);

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (city) {
        query = query.eq('city', city);
      }

      if (state) {
        query = query.eq('state', state);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      return data.map(business => ({
        id: business.id,
        name: business.name,
        image: business.business_photos?.[0]?.photo_url || "/placeholder.svg",
        category: business.category,
        rating: business.reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (business.reviews?.length || 1) || 0,
        reviewCount: business.reviews?.length || 0,
        location: `${business.city}, ${business.state}`,
        latitude: business.latitude || 0,
        longitude: business.longitude || 0,
        isOpen: true,
      }));
    },
  });

  const handleMarkerClick = (businessId: string) => {
    setSelectedBusinessId(businessId);
    const element = document.getElementById(`business-${businessId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? (
                <>
                  <List className="w-4 h-4 mr-2" />
                  Show List
                </>
              ) : (
                <>
                  <MapIcon className="w-4 h-4 mr-2" />
                  Show Map
                </>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading businesses...</div>
          ) : !businesses?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No businesses found matching your criteria.</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className={showMap ? "lg:w-1/2" : "w-full"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {businesses?.map((business) => (
                    <div 
                      key={business.id} 
                      id={`business-${business.id}`}
                      className={selectedBusinessId === business.id ? 'ring-2 ring-primary rounded-lg' : ''}
                    >
                      <BusinessCard {...business} />
                    </div>
                  ))}
                </div>
              </div>
              
              {showMap && (
                <div className="lg:w-1/2 h-[calc(100vh-200px)] sticky top-20">
                  <MapView
                    markers={businesses?.map(b => ({
                      id: b.id,
                      latitude: b.latitude,
                      longitude: b.longitude,
                      title: b.name
                    }))}
                    onMarkerClick={handleMarkerClick}
                    className="w-full h-full rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};