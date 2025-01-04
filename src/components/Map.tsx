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
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  
  // Initialize map only once when component mounts
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibXItYWRlIiwiYSI6ImNtNWZ2MXZyazAxbDUyaXF2aDk5cnR2cDcifQ.nayeg3Bmwhnz4lkNHxImgg';
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialLng, initialLat],
      zoom: 13
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([initialLng, initialLat])
      .addTo(map);

    markerRef.current = marker;

    // Clean up on unmount
    return () => {
      marker.remove();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // Empty dependency array for one-time initialization

  // Handle location updates separately
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    
    if (!map || !marker || !onLocationSelect) return;

    const handleMarkerDragEnd = () => {
      const lngLat = marker.getLngLat();
      onLocationSelect(lngLat.lat, lngLat.lng);
    };

    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      marker.setLngLat([lng, lat]);
      onLocationSelect(lat, lng);
    };

    marker.on('dragend', handleMarkerDragEnd);
    map.on('click', handleMapClick);

    return () => {
      marker.off('dragend', handleMarkerDragEnd);
      map.off('click', handleMapClick);
    };
  }, [onLocationSelect]); // Only re-run if onLocationSelect changes

  // Update marker position when initialLat/initialLng change
  useEffect(() => {
    const marker = markerRef.current;
    const map = mapRef.current;
    
    if (!marker || !map) return;
    
    marker.setLngLat([initialLng, initialLat]);
    map.setCenter([initialLng, initialLat]);
  }, [initialLat, initialLng]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;