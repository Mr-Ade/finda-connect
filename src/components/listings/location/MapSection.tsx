import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Map } from "@/components/Map";

interface MapSectionProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  onCoordinatesChange: (lat: number, lng: number) => void;
}

export const MapSection = ({ coordinates, onCoordinatesChange }: MapSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            value={coordinates.latitude}
            onChange={(e) => {
              const lat = parseFloat(e.target.value);
              if (!isNaN(lat)) onCoordinatesChange(lat, coordinates.longitude);
            }}
          />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            value={coordinates.longitude}
            onChange={(e) => {
              const lng = parseFloat(e.target.value);
              if (!isNaN(lng)) onCoordinatesChange(coordinates.latitude, lng);
            }}
          />
        </div>
      </div>
      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <Map 
          center={{ lat: coordinates.latitude, lng: coordinates.longitude }}
          markers={[{ lat: coordinates.latitude, lng: coordinates.longitude }]}
          onMapClick={(e) => {
            if (e.latLng) {
              onCoordinatesChange(e.latLng.lat(), e.latLng.lng());
            }
          }}
        />
      </div>
    </>
  );
};