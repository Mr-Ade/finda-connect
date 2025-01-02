import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import Map from "@/components/Map";
import { useState } from "react";

export const LocationInfo = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 40.7128,
    longitude: -74.0060
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({
      latitude: lat,
      longitude: lng
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
            <Label htmlFor="state">State</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sf">San Francisco</SelectItem>
                <SelectItem value="la">Los Angeles</SelectItem>
                <SelectItem value="sd">San Diego</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Enter street address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input id="zipCode" placeholder="Enter zip code" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="Enter phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email address" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" type="url" placeholder="Enter website URL" />
        </div>
      </CardContent>
    </Card>
  );
};