import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

export const SearchBar = () => {
  const { city, state, country, isLoading } = useLocation();
  const locationString = [city, state, country].filter(Boolean).join(", ");

  return (
    <div className="flex flex-col md:flex-row gap-2 max-w-3xl w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for restaurants, shops, services..."
          className="pl-10 h-12"
        />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder={isLoading ? "Detecting location..." : "Location"} 
          value={!isLoading ? locationString : ""} 
          className="pl-10 h-12"
        />
      </div>
      <Button className="h-12 px-8">
        Search
      </Button>
    </div>
  );
};