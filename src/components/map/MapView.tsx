import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from '@/hooks/use-toast';

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    longitude: number;
    latitude: number;
    title: string;
  }>;
  onMarkerClick?: (id: string) => void;
  className?: string;
}

export const MapView = ({
  center = [-74.5, 40],
  zoom = 9,
  markers = [],
  onMarkerClick,
  className = "w-full h-[400px]"
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current) return;

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyDVYLvGDi-_fuY1zd1DlDJPKd-5qCuktDY', // We'll move this to Supabase secrets
          version: 'weekly',
        });

        const google = await loader.load();
        map.current = new google.maps.Map(mapContainer.current, {
          center: { lat: center[1], lng: center[0] },
          zoom: zoom,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });
      } catch (error) {
        console.error('Error initializing map:', error);
        toast({
          title: "Error",
          description: "Failed to load map. Please try again later.",
          variant: "destructive",
        });
      }
    };

    initMap();

    return () => {
      // Cleanup
      Object.values(markersRef.current).forEach(marker => marker.setMap(null));
      markersRef.current = {};
    };
  }, []);

  // Handle markers
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};

    // Add new markers
    markers.forEach(({ id, longitude, latitude, title }) => {
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map.current,
        title: title
      });

      if (onMarkerClick) {
        marker.addListener('click', () => {
          onMarkerClick(id);
        });
      }

      const infoWindow = new google.maps.InfoWindow({
        content: `<div><strong>${title}</strong></div>`
      });

      marker.addListener('mouseover', () => {
        infoWindow.open(map.current, marker);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      markersRef.current[id] = marker;
    });
  }, [markers, onMarkerClick]);

  return (
    <div ref={mapContainer} className={className} />
  );
};