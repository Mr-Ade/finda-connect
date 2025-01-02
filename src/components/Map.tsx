import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const Map = ({ onLocationSelect, initialLat = 40.7128, initialLng = -74.0060 }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      // Initialize map
      mapboxgl.accessToken = mapboxToken || 'YOUR_MAPBOX_TOKEN';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLng, initialLat],
        zoom: 13
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add initial marker
      marker.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([initialLng, initialLat])
        .addTo(map.current);

      // Handle marker drag events
      marker.current.on('dragend', () => {
        const lngLat = marker.current?.getLngLat();
        if (lngLat && onLocationSelect) {
          onLocationSelect(lngLat.lat, lngLat.lng);
        }
      });

      // Handle map click events
      map.current.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        marker.current?.setLngLat([lng, lat]);
        if (onLocationSelect) {
          onLocationSelect(lat, lng);
        }
      });
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, initialLat, initialLng, onLocationSelect]);

  if (!mapboxToken) {
    return (
      <div className="p-4">
        <input
          type="text"
          placeholder="Enter your Mapbox token"
          className="w-full p-2 border rounded"
          onChange={(e) => setMapboxToken(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-2">
          Please enter your Mapbox token to display the map. You can get one at mapbox.com
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;