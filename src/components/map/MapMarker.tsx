import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapMarkerProps {
  map: mapboxgl.Map;
  initialLat: number;
  initialLng: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

export const MapMarker = ({ map, initialLat, initialLng, onLocationSelect }: MapMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    console.log('Initializing marker');
    
    // Create marker only if it doesn't exist
    if (!markerRef.current) {
      const marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([initialLng, initialLat]);
      
      try {
        marker.addTo(map);
        markerRef.current = marker;
        console.log('Marker added successfully');
      } catch (error) {
        console.error('Error adding marker:', error);
        return;
      }

      const handleDragEnd = () => {
        const lngLat = marker.getLngLat();
        console.log('Marker dragged to:', lngLat);
        onLocationSelect(lngLat.lat, lngLat.lng);
      };

      const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
        const { lng, lat } = e.lngLat;
        console.log('Map clicked at:', { lng, lat });
        marker.setLngLat([lng, lat]);
        onLocationSelect(lat, lng);
      };

      marker.on('dragend', handleDragEnd);
      map.on('click', handleMapClick);

      return () => {
        console.log('Cleaning up marker');
        marker.off('dragend', handleDragEnd);
        map.off('click', handleMapClick);
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
      };
    }
  }, [map, initialLat, initialLng, onLocationSelect]);

  return null;
};