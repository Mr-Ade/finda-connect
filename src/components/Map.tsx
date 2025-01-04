import { useState, useCallback, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapContainer } from './map/MapContainer';
import { MapMarker } from './map/MapMarker';

interface MapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const Map = ({ onLocationSelect, initialLat = 40.7128, initialLng = -74.0060 }: MapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDVYLvGDi-_fuY1zd1DlDJPKd-5qCuktDY', // We'll move this to Supabase secrets
        version: 'weekly',
      });

      try {
        const google = await loader.load();
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: initialLat, lng: initialLng },
          zoom: 13,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        setMap(newMap);
        setIsMapLoaded(true);

        if (onLocationSelect) {
          newMap.addListener('click', (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
              onLocationSelect(e.latLng.lat(), e.latLng.lng());
            }
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [initialLat, initialLng, onLocationSelect]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="absolute inset-0" />
    </div>
  );
};

export default Map;