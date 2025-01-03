import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const Map = ({ onLocationSelect, initialLat = 40.7128, initialLng = -74.0060 }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  // Store these refs outside of React's state management to avoid cloning issues
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markerInstance = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with the provided token
    mapboxgl.accessToken = 'pk.eyJ1IjoibXItYWRlIiwiYSI6ImNtNWZ2MXZyazAxbDUyaXF2aDk5cnR2cDcifQ.nayeg3Bmwhnz4lkNHxImgg';
    
    // Create map instance
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialLng, initialLat],
      zoom: 13
    });

    // Add navigation controls
    mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add initial marker
    markerInstance.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([initialLng, initialLat])
      .addTo(mapInstance.current);

    // Handle marker drag events
    const handleMarkerDragEnd = () => {
      const lngLat = markerInstance.current?.getLngLat();
      if (lngLat && onLocationSelect) {
        onLocationSelect(lngLat.lat, lngLat.lng);
      }
    };

    // Handle map click events
    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      markerInstance.current?.setLngLat([lng, lat]);
      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    };

    markerInstance.current.on('dragend', handleMarkerDragEnd);
    mapInstance.current.on('click', handleMapClick);

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [initialLat, initialLng, onLocationSelect]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;