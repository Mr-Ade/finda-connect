import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Map from "@/components/Map";

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
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input 
            id="latitude" 
            value={coordinates.latitude} 
            onChange={(e) => onCoordinatesChange(parseFloat(e.target.value), coordinates.longitude)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input 
            id="longitude" 
            value={coordinates.longitude} 
            onChange={(e) => onCoordinatesChange(coordinates.latitude, parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <Map 
          onLocationSelect={(lat, lng) => onCoordinatesChange(lat, lng)}
          initialLat={coordinates.latitude}
          initialLng={coordinates.longitude}
        />
      </div>
    </>
  );
};