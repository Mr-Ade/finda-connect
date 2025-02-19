import { useEffect, useState } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { Business } from '../types/business';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Navigation } from 'lucide-react';

interface LocationRecommendationsProps {
  maxItems?: number;
  radius?: number; // in kilometers
}

export function LocationRecommendations({ maxItems = 6, radius = 10 }: LocationRecommendationsProps) {
  const { userLocation, getCurrentLocation } = useLocation();
  const [recommendations, setRecommendations] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Fetch nearby businesses from Supabase
  const fetchNearbyBusinesses = async () => {
    if (!userLocation) return;

    try {
      setLoading(true);
      const { data: businesses } = await supabase
        .from('businesses')
        .select('*')
        .filter('status', 'eq', 'active')
        .order('rating', { ascending: false });

      if (businesses) {
        // Filter and sort businesses by distance
        const nearbyBusinesses = businesses
          .map(business => ({
            ...business,
            distance: calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              business.latitude,
              business.longitude
            )
          }))
          .filter(business => business.distance <= radius)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, maxItems);

        setRecommendations(nearbyBusinesses);
      }
    } catch (error) {
      console.error('Error fetching nearby businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchNearbyBusinesses();
    }
  }, [userLocation]);

  const handleRefreshLocation = () => {
    getCurrentLocation();
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Nearby Businesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(maxItems)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-32" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Nearby Businesses</h2>
        <Button
          variant="outline"
          onClick={handleRefreshLocation}
          className="flex items-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          Update Location
        </Button>
      </div>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{business.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{business.distance.toFixed(1)} km away</span>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {business.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600">
          No businesses found within {radius} km of your location
        </div>
      )}
    </div>
  );
}