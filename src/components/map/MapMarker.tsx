import { useEffect, useRef } from 'react';

interface MapMarkerProps {
  map: google.maps.Map;
  initialLat: number;
  initialLng: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

export const MapMarker = ({ map, initialLat, initialLng, onLocationSelect }: MapMarkerProps) => {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    console.log('Initializing marker');
    
    if (!markerRef.current) {
      const marker = new google.maps.Marker({
        position: { lat: initialLat, lng: initialLng },
        map: map,
        draggable: true
      });
      
      markerRef.current = marker;

      marker.addListener('dragend', () => {
        const position = marker.getPosition();
        if (position) {
          onLocationSelect(position.lat(), position.lng());
        }
      });

      return () => {
        if (markerRef.current) {
          markerRef.current.setMap(null);
          markerRef.current = null;
        }
      };
    }
  }, [map, initialLat, initialLng, onLocationSelect]);

  return null;
};