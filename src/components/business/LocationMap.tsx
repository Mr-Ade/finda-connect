import { useEffect, useState } from "react";
import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface LocationMapProps {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const LocationMap = ({
  address,
  city,
  state,
  zip_code,
  coordinates
}: LocationMapProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const getDirectionsUrl = () => {
    const destination = coordinates
      ? `${coordinates.lat},${coordinates.lng}`
      : encodeURIComponent(`${address}, ${city}, ${state} ${zip_code}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };

  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-[300px] rounded-lg overflow-hidden">
        <Map
          center={coordinates}
          markers={coordinates ? [coordinates] : []}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.open(getDirectionsUrl(), "_blank")}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleGetUserLocation}
          disabled={isLoading}
        >
          <Navigation className="w-4 h-4 mr-2" />
          {isLoading ? "Getting Location..." : "Find Nearest"}
        </Button>
      </div>
    </div>
  );
};