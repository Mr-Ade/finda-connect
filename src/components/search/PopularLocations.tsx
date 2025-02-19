import { POPULAR_LOCATIONS, LocationData } from "@/data/popularLocations";
import { useLocation } from "@/contexts/LocationContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PopularLocations = () => {
  const { setState, setCity } = useLocation();
  const navigate = useNavigate();

  const handleLocationSelect = (location: LocationData) => {
    // Extract state from location name (assuming format: "City, State")
    const [city, state] = location.name.split(", ");
    setState(state || location.name);
    setCity(city || location.name);
    navigate("/explore-listings");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Popular Locations</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {POPULAR_LOCATIONS.map((location) => (
          <Card
            key={location.id}
            className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
            onClick={() => handleLocationSelect(location)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={location.image}
                alt={location.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg">{location.name}</h4>
              <p className="text-sm text-muted-foreground">
                {location.businesses.toLocaleString()} businesses
              </p>
              <Button
                variant="ghost"
                className="mt-2 w-full group-hover:bg-primary group-hover:text-primary-foreground"
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};