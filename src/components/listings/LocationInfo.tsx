import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";
import { getStatesByCountry } from "@/lib/states";
import { MapSection } from "./location/MapSection";
import { AddressFields } from "./location/AddressFields";

export const LocationInfo = () => {
  const { toast } = useToast();
  const locationContext = useLocation();
  const [coordinates, setCoordinates] = useState({
    latitude: locationContext.coordinates.latitude || 9.0820,  // Nigeria's approximate center
    longitude: locationContext.coordinates.longitude || 8.6753
  });
  const [address, setAddress] = useState({
    country: "Nigeria",  // Default to Nigeria
    state: locationContext.state || "",
    city: locationContext.city || "",
    street: "",
    zip_code: "",
    phone: "",
    email: "",
    website: ""
  });

  const [availableStates, setAvailableStates] = useState<{ name: string; code: string }[]>(getStatesByCountry("Nigeria"));

  useEffect(() => {
    if (locationContext.coordinates.latitude && locationContext.coordinates.longitude) {
      setCoordinates({
        latitude: locationContext.coordinates.latitude,
        longitude: locationContext.coordinates.longitude
      });
    }
    
    setAddress(prev => ({
      ...prev,
      state: locationContext.state || prev.state,
      city: locationContext.city || prev.city
    }));
  }, [locationContext]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({ latitude: lat, longitude: lng });

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=155e6c1220b94de0a87f628b659b430b`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results[0]) {
          const components = data.results[0].components;
          console.log("Reverse geocoding result:", components);
          
          setAddress(prev => ({
            ...prev,
            state: components.state || prev.state,
            city: components.city || components.town || components.village || prev.city,
            zip_code: components.postcode || prev.zip_code,
            street: components.road ? `${components.road}${components.house_number ? `, ${components.house_number}` : ''}` : prev.street
          }));
        }
      })
      .catch(error => {
        console.error("Error reverse geocoding:", error);
        toast({
          title: "Location Error",
          description: "Could not fetch location details. Please enter them manually.",
          variant: "destructive",
        });
      });
  };

  const handleAddressChange = (field: string, value: string) => {
    console.log("Address field changed:", field, value);
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <MapPin className="w-5 h-5" />
        <h3 className="font-medium">Location Info</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <MapSection 
          coordinates={coordinates}
          onCoordinatesChange={handleLocationSelect}
        />
        <AddressFields 
          address={address}
          availableStates={availableStates}
          onAddressChange={handleAddressChange}
        />
      </CardContent>
    </Card>
  );
};