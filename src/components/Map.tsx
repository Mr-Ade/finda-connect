import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { supabase } from "@/integrations/supabase/client";
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  center?: { lat: number; lng: number };
  markers?: { lat: number; lng: number }[];
  onMapClick?: (e: mapboxgl.MapMouseEvent) => void;
  className?: string;
}

// Create a loader function that gets the API key from Supabase
const getMapboxToken = async () => {
  try {
    const { data: { MAPBOX_PUBLIC_TOKEN }, error } = await supabase.functions.invoke('get-config', {
      body: { keys: ['MAPBOX_PUBLIC_TOKEN'] }
    });

    if (error) {
      console.error("Error fetching Mapbox token:", error);
      throw new Error('Failed to fetch Mapbox token');
    }

    if (!MAPBOX_PUBLIC_TOKEN) {
      throw new Error('Mapbox token not found');
    }

    return MAPBOX_PUBLIC_TOKEN;
  } catch (error) {
    console.error("Error in getMapboxToken:", error);
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
        
        if (!mapRef.current) {
          console.error("Map container ref not found");
          return;
        }

        const defaultCenter = center || { lat: 9.0820, lng: 8.6753 }; // Nigeria center
        console.log("Initializing map with center:", defaultCenter);
        
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

          console.log("Map instance created successfully");
        } else {
          // Update existing map center if needed
          mapInstanceRef.current.setCenter([defaultCenter.lng, defaultCenter.lat]);
          console.log("Updated existing map center");
        }

        if (onMapClick && mapInstanceRef.current) {
          mapInstanceRef.current.on('click', (e) => {
            console.log("Map clicked at:", e.lngLat);
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

        console.log("Markers updated:", markers.length);

      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();

    return () => {
      console.log("Cleaning up map instance");
      markersRef.current.forEach(marker => marker.remove());
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [center, markers, onMapClick]);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
};