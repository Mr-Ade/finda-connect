import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { supabase } from "@/integrations/supabase/client";
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "@/hooks/use-toast";

interface MapProps {
  center?: { lat: number; lng: number };
  markers?: { lat: number; lng: number }[];
  onMapClick?: (e: mapboxgl.MapMouseEvent) => void;
  className?: string;
}

// Create a loader function that gets the API key from Supabase
const getMapboxToken = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('get-config', {
      body: { keys: ['MAPBOX_PUBLIC_TOKEN'] }
    });

    if (error) {
      throw new Error('Failed to fetch Mapbox token');
    }

    if (!data.MAPBOX_PUBLIC_TOKEN) {
      throw new Error('Mapbox token not found');
    }

    return data.MAPBOX_PUBLIC_TOKEN;
  } catch (error) {
    console.error('Error fetching Mapbox token:', error);
    toast({
      title: "Error",
      description: "Failed to load map. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};

export const Map = ({ center, markers = [], onMapClick, className = "" }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        const token = await getMapboxToken();
        mapboxgl.accessToken = token;
        
        if (!mapRef.current) return;

        const defaultCenter = center || { lat: 9.0820, lng: 8.6753 }; // Nigeria center
        
        // Only create new map instance if one doesn't exist
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [defaultCenter.lng, defaultCenter.lat],
            zoom: 8,
          });

          // Add navigation controls
          mapInstanceRef.current.addControl(
            new mapboxgl.NavigationControl(),
            'top-right'
          );
        } else {
          // Update existing map center if needed
          mapInstanceRef.current.setCenter([defaultCenter.lng, defaultCenter.lat]);
        }

        if (onMapClick && mapInstanceRef.current) {
          mapInstanceRef.current.on('click', (e) => {
            onMapClick(e);
          });
        }

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        markers.forEach(position => {
          if (mapInstanceRef.current) {
            const marker = new mapboxgl.Marker()
              .setLngLat([position.lng, position.lat])
              .addTo(mapInstanceRef.current);
            markersRef.current.push(marker);
          }
        });

      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [center, markers, onMapClick]);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
};