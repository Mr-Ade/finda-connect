import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; title?: string }>;
  onMarkerClick?: (marker: google.maps.Marker) => void;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  className?: string;
}

export const Map = ({
  center = { lat: 9.0820, lng: 8.6753 }, // Default center on Nigeria
  zoom = 6,
  markers = [],
  onMarkerClick,
  onMapClick,
  className = "w-full h-[400px]"
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Fetch API key from Supabase Edge Function
        const { data, error: configError } = await supabase.functions.invoke('get-config', {
          body: { keys: ['GOOGLE_MAPS_API_KEY'] }
        });

        if (configError || !data?.GOOGLE_MAPS_API_KEY) {
          throw new Error('Failed to load Google Maps API key');
        }

        const loader = new Loader({
          apiKey: data.GOOGLE_MAPS_API_KEY,
          version: "weekly"
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Add markers
        markers.forEach(markerData => {
          const marker = new google.maps.Marker({
            position: { lat: markerData.lat, lng: markerData.lng },
            map,
            title: markerData.title,
            animation: google.maps.Animation.DROP
          });

          if (onMarkerClick) {
            marker.addListener("click", () => onMarkerClick(marker));
          }

          markersRef.current.push(marker);
        });

        // Add map click handler
        if (onMapClick) {
          map.addListener("click", onMapClick);
        }

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map');
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        // Remove markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [center, zoom, markers, onMarkerClick, onMapClick]);

  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};