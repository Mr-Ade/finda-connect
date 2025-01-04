import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const LocationSearch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  const handleSearch = () => {
    if (!selectedLocation) {
      toast({
        title: "No location selected",
        description: "Please click on the map to select a location",
        variant: "destructive",
      });
      return;
    }

    navigate(`/search?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Local Businesses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click anywhere on the map to discover businesses in that area
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Map 
            onMapClick={handleMapClick}
            markers={selectedLocation ? [selectedLocation] : []}
            className="w-full h-[400px] rounded-lg shadow-lg mb-6"
          />

          <div className="flex justify-center">
            <Button 
              onClick={handleSearch}
              size="lg"
              className="px-8"
            >
              Search This Area
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};