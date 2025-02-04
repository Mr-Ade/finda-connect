import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";
import { getStatesByCountry } from "@/lib/states";
import { MapSection } from "./location/MapSection";
import { AddressFields } from "./location/AddressFields";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";

export const LocationInfo = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const locationContext = useLocation();
  const [coordinates, setCoordinates] = useState({
    latitude: locationContext.coordinates.latitude || 9.0820,
    longitude: locationContext.coordinates.longitude || 8.6753
  });
  const [address, setAddress] = useState({
    country: "Nigeria",
    state: locationContext.state || "",
    city: locationContext.city || "",
    street: "",
    zip_code: "",
    phone: "",
    email: "",
    website: ""
  });

  const [availableStates] = useState<{ name: string; code: string }[]>(
    getStatesByCountry("Nigeria")
  );

  useEffect(() => {
    if (locationContext.coordinates.latitude && locationContext.coordinates.longitude) {
      setCoordinates({
        latitude: locationContext.coordinates.latitude,
        longitude: locationContext.coordinates.longitude
      });
      console.log("Updated coordinates from context:", locationContext.coordinates);
    }
    
    setAddress(prev => ({
      ...prev,
      state: locationContext.state || prev.state,
      city: locationContext.city || prev.city
    }));
  }, [locationContext]);

  const handleLocationSelect = async (lat: number, lng: number) => {
    setCoordinates({ latitude: lat, longitude: lng });
    console.log("Location selected:", { lat, lng });

    try {
      // Reverse geocoding using OpenCage API
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=155e6c1220b94de0a87f628b659b430b`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const components = data.results[0].components;
        console.log("Reverse geocoding result:", components);
        
        setAddress(prev => ({
          ...prev,
          state: components.state || prev.state,
          city: components.city || components.town || components.village || prev.city,
          zip_code: components.postcode || prev.zip_code,
          street: components.road ? 
            `${components.road}${components.house_number ? `, ${components.house_number}` : ''}` : 
            prev.street
        }));

        // Save the updated location to the database
        await updateBusinessLocation();
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      toast({
        title: "Location Error",
        description: "Could not fetch location details. Please enter them manually.",
        variant: "destructive",
      });
    }
  };

  const handleAddressChange = async (field: string, value: string) => {
    console.log("Address field changed:", field, value);
    setAddress(prev => ({ ...prev, [field]: value }));
    
    // Save changes to database after a short delay
    await updateBusinessLocation();
  };

  const updateBusinessLocation = async () => {
    if (!id) return;

    try {
      const { error } = await supabase
        .from('businesses')
        .update({
          address: address.street,
          city: address.city,
          state: address.state,
          zip_code: address.zip_code,
          phone: address.phone,
          email: address.email,
          website: address.website,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        })
        .eq('id', id);

      if (error) {
        console.error("Error updating business location:", error);
        toast({
          title: "Error",
          description: "Failed to save location information",
          variant: "destructive",
        });
      } else {
        console.log("Successfully updated business location");
      }
    } catch (error) {
      console.error("Error updating business location:", error);
      toast({
        title: "Error",
        description: "Failed to save location information",
        variant: "destructive",
      });
    }
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