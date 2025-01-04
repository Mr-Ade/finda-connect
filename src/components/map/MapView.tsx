import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from "@/integrations/supabase/client";

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
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Get token from Supabase
        const { data: { MAPBOX_PUBLIC_TOKEN } } = await supabase.functions.invoke('get-config', {
          body: { keys: ['MAPBOX_PUBLIC_TOKEN'] }
        });

        if (!MAPBOX_PUBLIC_TOKEN) {
          console.error('Mapbox token not found');
          return;
        }

        // Set the token
        mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;
        
        if (!mapRef.current) return;

        // Initialize map
        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [8.6753, 9.0820], // Nigeria center
          zoom: 6
        });

        mapInstanceRef.current = map;

        // Add navigation controls
        map.addControl(
          new mapboxgl.NavigationControl(),
          'top-right'
        );

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add markers
        markers.forEach(({ id, latitude, longitude, title }) => {
          const marker = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title))
            .addTo(map);

          if (onMarkerClick) {
            marker.getElement().addEventListener('click', () => onMarkerClick(id));
          }

          markersRef.current.push(marker);
        });

        // Fit bounds if there are markers
        if (markers.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          markers.forEach(({ longitude, latitude }) => {
            bounds.extend([longitude, latitude]);
          });
          map.fitBounds(bounds, { padding: 50 });
        }

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.remove());
      mapInstanceRef.current?.remove();
    };
  }, [markers, onMarkerClick]);

  return (
    <div ref={mapRef} className={`w-full h-full min-h-[400px] rounded-lg ${className}`} />
  );
};