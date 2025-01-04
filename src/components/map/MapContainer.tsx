import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  initialLat: number;
  initialLng: number;
  onMapLoad: (map: mapboxgl.Map) => void;
  children?: React.ReactNode;
}

export const MapContainer = ({ initialLat, initialLng, onMapLoad, children }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    console.log('Initializing Mapbox map');
    mapboxgl.accessToken = 'pk.eyJ1IjoibXItYWRlIiwiYSI6ImNtNWZ2MXZyazAxbDUyaXF2aDk5cnR2cDcifQ.nayeg3Bmwhnz4lkNHxImgg';
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialLng, initialLat],
      zoom: 13
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      mapRef.current = map;
      onMapLoad(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initialLat, initialLng, onMapLoad]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {children}
    </div>
  );
};