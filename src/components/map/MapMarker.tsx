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
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([initialLng, initialLat])
      .addTo(map);

    markerRef.current = marker;

    const handleMarkerDragEnd = () => {
      if (!marker) return;
      const lngLat = marker.getLngLat();
      console.log('Marker dragged to:', lngLat);
      onLocationSelect(lngLat.lat, lngLat.lng);
    };

    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      if (!marker) return;
      const { lng, lat } = e.lngLat;
      console.log('Map clicked at:', { lng, lat });
      marker.setLngLat([lng, lat]);
      onLocationSelect(lat, lng);
    };

    marker.on('dragend', handleMarkerDragEnd);
    map.on('click', handleMapClick);

    return () => {
      marker.off('dragend', handleMarkerDragEnd);
      map.off('click', handleMapClick);
      marker.remove();
    };
  }, [map, initialLat, initialLng, onLocationSelect]);

  // Update marker position when coordinates change
  useEffect(() => {
    if (!markerRef.current) return;
    console.log('Updating marker position:', { initialLat, initialLng });
    markerRef.current.setLngLat([initialLng, initialLat]);
  }, [initialLat, initialLng]);

  return null;
};