import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapProps {
  center?: { lat: number; lng: number };
  markers?: { lat: number; lng: number }[];
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  className?: string;
}

// Create a singleton loader instance
const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  version: "weekly",
});

export const Map = ({ center, markers = [], onMapClick, className = "" }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        const { Map } = await loader.importLibrary("maps");
        
        if (!mapRef.current) return;

        const defaultCenter = center || { lat: 9.0820, lng: 8.6753 }; // Nigeria center
        
        // Only create new map instance if one doesn't exist
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new Map(mapRef.current, {
            center: defaultCenter,
            zoom: 8,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });
        } else {
          // Update existing map center if needed
          mapInstanceRef.current.setCenter(defaultCenter);
        }

        if (onMapClick && mapInstanceRef.current) {
          // Remove existing click listeners before adding new one
          google.maps.event.clearListeners(mapInstanceRef.current, 'click');
          mapInstanceRef.current.addListener("click", onMapClick);
        }

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add new markers
        markers.forEach(position => {
          if (mapInstanceRef.current) {
            const marker = new google.maps.Marker({
              position,
              map: mapInstanceRef.current,
            });
            markersRef.current.push(marker);
          }
        });

      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      }
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [center, markers, onMapClick]);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
};