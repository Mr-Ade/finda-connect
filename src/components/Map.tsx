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
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markerInstanceRef = useRef<mapboxgl.Marker | null>(null);
  const navigationControlRef = useRef<mapboxgl.NavigationControl | null>(null);
  
  // Initialize map only once when component mounts
  useEffect(() => {
    if (!mapContainer.current || mapInstanceRef.current) return;

    console.log('Initializing Mapbox map');
    mapboxgl.accessToken = 'pk.eyJ1IjoibXItYWRlIiwiYSI6ImNtNWZ2MXZyazAxbDUyaXF2aDk5cnR2cDcifQ.nayeg3Bmwhnz4lkNHxImgg';
    
    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLng, initialLat],
        zoom: 13
      });

      const navigationControl = new mapboxgl.NavigationControl();
      map.addControl(navigationControl, 'top-right');

      const marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([initialLng, initialLat])
        .addTo(map);

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;
      navigationControlRef.current = navigationControl;

      console.log('Map and marker initialized successfully');

      // Clean up on unmount
      return () => {
        console.log('Cleaning up map instance');
        if (mapInstanceRef.current) {
          if (navigationControlRef.current) {
            mapInstanceRef.current.removeControl(navigationControlRef.current);
          }
          if (markerInstanceRef.current) {
            markerInstanceRef.current.remove();
          }
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
          markerInstanceRef.current = null;
          navigationControlRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, []); // Empty dependency array for one-time initialization

  // Handle location updates separately
  useEffect(() => {
    const map = mapInstanceRef.current;
    const marker = markerInstanceRef.current;
    
    if (!map || !marker || !onLocationSelect) return;

    console.log('Setting up map event handlers');

    const handleMarkerDragEnd = () => {
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

    marker.on('dragend', handleMarkerDragEnd);
    map.on('click', handleMapClick);

    return () => {
      console.log('Removing map event handlers');
      if (marker && map) {
        marker.off('dragend', handleMarkerDragEnd);
        map.off('click', handleMapClick);
      }
    };
  }, [onLocationSelect]); // Only re-run if onLocationSelect changes

  // Update marker position when initialLat/initialLng change
  useEffect(() => {
    const marker = markerInstanceRef.current;
    const map = mapInstanceRef.current;
    
    if (!marker || !map) return;
    
    console.log('Updating marker position:', { initialLat, initialLng });
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