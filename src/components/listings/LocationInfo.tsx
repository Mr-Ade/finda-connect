import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import Map from "@/components/Map";
import { useState, useEffect } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";
import { countries } from "@/lib/countries";
import { getStatesByCountry } from "@/lib/states";

export const LocationInfo = () => {
  const { toast } = useToast();
  const locationContext = useLocation();
  const [coordinates, setCoordinates] = useState({
    latitude: locationContext.coordinates.latitude || 40.7128,
    longitude: locationContext.coordinates.longitude || -74.0060
  });
  const [address, setAddress] = useState({
    country: locationContext.country || "",
    state: locationContext.state || "",
    city: locationContext.city || "",
    street: "",
    zipCode: "",
    phone: "",
    email: "",
    website: ""
  });

  const [availableStates, setAvailableStates] = useState<{ name: string; code: string }[]>([]);

  useEffect(() => {
    // Update coordinates when location context changes
    if (locationContext.coordinates.latitude && locationContext.coordinates.longitude) {
      setCoordinates({
        latitude: locationContext.coordinates.latitude,
        longitude: locationContext.coordinates.longitude
      });
    }
    
    // Update address fields
    setAddress(prev => ({
      ...prev,
      country: locationContext.country || prev.country,
      state: locationContext.state || prev.state,
      city: locationContext.city || prev.city
    }));
  }, [locationContext]);

  useEffect(() => {
    // Update available states when country changes
    if (address.country) {
      const states = getStatesByCountry(address.country);
      setAvailableStates(states);
      // Reset state if the current state is not available in the new country
      if (!states.find(s => s.name === address.state)) {
        setAddress(prev => ({ ...prev, state: "" }));
      }
    }
  }, [address.country]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({
      latitude: lat,
      longitude: lng
    });

    // Attempt to reverse geocode the selected location
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=155e6c1220b94de0a87f628b659b430b`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results[0]) {
          const result = data.results[0].components;
          console.log("Reverse geocoding result:", result);
          
          setAddress(prev => ({
            ...prev,
            country: result.country || prev.country,
            state: result.state || prev.state,
            city: result.city || prev.city,
            zipCode: result.postcode || prev.zipCode
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <MapPin className="w-5 h-5" />
        <h3 className="font-medium">Location Info</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input 
              id="latitude" 
              value={coordinates.latitude} 
              onChange={(e) => setCoordinates(prev => ({ ...prev, latitude: parseFloat(e.target.value) }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input 
              id="longitude" 
              value={coordinates.longitude} 
              onChange={(e) => setCoordinates(prev => ({ ...prev, longitude: parseFloat(e.target.value) }))}
            />
          </div>
        </div>

        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <Map 
            onLocationSelect={handleLocationSelect}
            initialLat={coordinates.latitude}
            initialLng={coordinates.longitude}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select 
              value={address.country} 
              onValueChange={(value) => setAddress(prev => ({ ...prev, country: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select 
              value={address.state} 
              onValueChange={(value) => setAddress(prev => ({ ...prev, state: value }))}
              disabled={!address.country}
            >
              <SelectTrigger>
                <SelectValue placeholder={address.country ? "Select state" : "Select country first"} />
              </SelectTrigger>
              <SelectContent>
                {availableStates.map((state) => (
                  <SelectItem key={state.code} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              value={address.city}
              onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input 
              id="zipCode" 
              value={address.zipCode}
              onChange={(e) => setAddress(prev => ({ ...prev, zipCode: e.target.value }))}
              placeholder="Enter zip code"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={address.phone}
              onChange={(e) => setAddress(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={address.email}
              onChange={(e) => setAddress(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            type="url" 
            value={address.website}
            onChange={(e) => setAddress(prev => ({ ...prev, website: e.target.value }))}
            placeholder="Enter website URL"
          />
        </div>
      </CardContent>
    </Card>
  );
};