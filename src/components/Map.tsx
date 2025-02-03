import { useEffect, useRef, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MapProps {
  center?: { lat: number; lng: number };
  markers?: { lat: number; lng: number }[];
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  className?: string;
}

// Create a loader function that gets the API key from Supabase
const getGoogleMapsKey = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('get-config', {
      body: { keys: ['GOOGLE_MAPS_API_KEY'] }
    });

    if (error) {
      console.error("Error fetching Google Maps key:", error);
      throw new Error('Failed to fetch Google Maps key');
    }

    if (!data?.GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps key not found in response');
    }

    return data.GOOGLE_MAPS_API_KEY;
  } catch (error) {
    console.error("Error in getGoogleMapsKey:", error);
    throw error;
  }
};

export const Map = ({ center, markers = [], onMapClick, className = "" }: MapProps) => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      // Only initialize once
      if (isInitialized || !mapRef.current) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const apiKey = await getGoogleMapsKey();
        
        const loader = new Loader({
          apiKey,
          version: "weekly",
        });

        const google = await loader.load();
        
        const defaultCenter = center || { lat: 9.0820, lng: 8.6753 }; // Nigeria center
        console.log("Initializing map with center:", defaultCenter);
        
        // Create new map instance
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 8,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        console.log("Map instance created successfully");

        if (onMapClick && mapInstanceRef.current) {
          mapInstanceRef.current.addListener('click', (e: google.maps.MapMouseEvent) => {
            console.log("Map clicked at:", e.latLng?.toJSON());
            onMapClick(e);
          });
        }

        setIsInitialized(true);
        setIsLoading(false);

      } catch (error) {
        console.error("Error initializing map:", error);
        setError(error instanceof Error ? error.message : 'Failed to initialize map');
        setIsLoading(false);
        toast({
          title: "Map Error",
          description: "There was an error loading the map. Please try again later.",
          variant: "destructive",
        });
      }
    };

    initMap();

    return () => {
      console.log("Cleaning up map instance");
      if (mapInstanceRef.current) {
        // Clear markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [center, onMapClick, toast]);

  // Update markers whenever they change
  useEffect(() => {
    if (!mapInstanceRef.current || !isInitialized) {
      return;
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(position => {
      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
      });
      markersRef.current.push(marker);
    });

    console.log("Markers updated:", markers.length);
  }, [markers, isInitialized]);

  // Update center when it changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isInitialized || !center) {
      return;
    }

    mapInstanceRef.current.setCenter(center);
    console.log("Updated map center to:", center);
  }, [center, isInitialized]);

  if (isLoading) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center text-gray-500">
          <p>Unable to load map</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
};