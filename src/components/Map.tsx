import { useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapContainer } from './map/MapContainer';
import { MapMarker } from './map/MapMarker';

interface MapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const Map = ({ onLocationSelect, initialLat = 40.7128, initialLng = -74.0060 }: MapProps) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const handleMapLoad = useCallback((loadedMap: mapboxgl.Map) => {
    console.log('Map loaded successfully');
    setMap(loadedMap);
  }, []);

  return (
    <MapContainer
      initialLat={initialLat}
      initialLng={initialLng}
      onMapLoad={handleMapLoad}
    >
      {map && onLocationSelect && (
        <MapMarker
          map={map}
          initialLat={initialLat}
          initialLng={initialLng}
          onLocationSelect={onLocationSelect}
        />
      )}
    </MapContainer>
  );
};

export default Map;