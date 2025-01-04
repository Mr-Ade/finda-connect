import React, { useEffect, useRef } from 'react';

interface MapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const Map = ({ onLocationSelect, initialLat = 40.7128, initialLng = -74.0060 }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Initialize map only once when component mounts
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Load Google Maps script dynamically
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDVYLvGDi-_fuY1zd1DlDJPKd-5qCuktDY`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return new Promise<void>((resolve) => {
          script.onload = () => resolve();
        });
      }
      return Promise.resolve();
    };

    loadGoogleMaps().then(() => {
      console.log('Google Maps loaded');
      
      const map = new google.maps.Map(mapContainer.current!, {
        center: { lat: initialLat, lng: initialLng },
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });

      mapRef.current = map;

      const marker = new google.maps.Marker({
        position: { lat: initialLat, lng: initialLng },
        map: map,
        draggable: true
      });

      markerRef.current = marker;

      // Handle marker drag events
      marker.addListener('dragend', () => {
        const position = marker.getPosition();
        if (position && onLocationSelect) {
          onLocationSelect(position.lat(), position.lng());
        }
      });

      // Handle map click events
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        const position = e.latLng;
        if (position && onLocationSelect) {
          marker.setPosition(position);
          onLocationSelect(position.lat(), position.lng());
        }
      });
    });

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // Empty dependency array for one-time initialization

  // Update marker position when initialLat/initialLng change
  useEffect(() => {
    const marker = markerRef.current;
    const map = mapRef.current;
    
    if (!marker || !map) return;
    
    const newPosition = { lat: initialLat, lng: initialLng };
    marker.setPosition(newPosition);
    map.setCenter(newPosition);
  }, [initialLat, initialLng]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;