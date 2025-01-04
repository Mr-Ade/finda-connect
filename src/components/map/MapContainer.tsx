import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  initialLat: number;
  initialLng: number;
  onMapLoad: (map: mapboxgl.Map) => void;
}

export const MapContainer = ({ initialLat, initialLng, onMapLoad }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    console.log('Initializing Mapbox map');
    mapboxgl.accessToken = 'pk.eyJ1IjoibXItYWRlIiwiYSI6ImNtNWZ2MXZyazAxbDUyaXF2aDk5cnR2cDcifQ.nayeg3Bmwhnz4lkNHxImgg';
    
    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLng, initialLat],
        zoom: 13
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.on('load', () => {
        onMapLoad(map);
      });

      mapRef.current = map;

      return () => {
        map.remove();
        mapRef.current = null;
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [initialLat, initialLng, onMapLoad]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};