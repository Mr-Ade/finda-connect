import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';

interface MapViewProps {
  markers?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title: string;
  }>;
  onMarkerClick?: (id: string) => void;
  className?: string;
}

export const MapView = ({ markers = [], onMarkerClick, className = '' }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Get API key from Supabase
        const { data: { GOOGLE_MAPS_API_KEY } } = await supabase.functions.invoke('get-config', {
          body: { keys: ['GOOGLE_MAPS_API_KEY'] }
        });

        if (!GOOGLE_MAPS_API_KEY) {
          console.error('Google Maps API key not found');
          return;
        }

        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 9.0820, lng: 8.6753 }, // Nigeria center
          zoom: 6,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        googleMapRef.current = map;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add markers
        markers.forEach(({ id, latitude, longitude, title }) => {
          const marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            title,
            animation: google.maps.Animation.DROP
          });

          if (onMarkerClick) {
            marker.addListener('click', () => onMarkerClick(id));
          }

          markersRef.current.push(marker);
        });

        // Fit bounds if there are markers
        if (markers.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          markers.forEach(({ latitude, longitude }) => {
            bounds.extend({ lat: latitude, lng: longitude });
          });
          map.fitBounds(bounds);
        }

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [markers, onMarkerClick]);

  return (
    <div ref={mapRef} className={`w-full h-full min-h-[400px] rounded-lg ${className}`} />
  );
};