import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/hooks/use-toast';

// Initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHJxYnB5Y2gwMGx1MnFsYzB0Z3J0NXpwIn0.HP3Qr7W5qVqkqbL6RFzs_A';

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
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Cleanup
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Error",
        description: "Failed to load map. Please try again later.",
        variant: "destructive",
      });
    }
  }, []);

  // Handle markers
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    markers.forEach(({ id, longitude, latitude, title }) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${title}</h3>`))
        .addTo(map.current!);

      if (onMarkerClick) {
        el.addEventListener('click', () => {
          onMarkerClick(id);
        });
      }

      markersRef.current[id] = marker;
    });
  }, [markers, onMarkerClick]);

  return (
    <div ref={mapContainer} className={className} />
  );
};