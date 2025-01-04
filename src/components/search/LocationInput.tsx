import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/contexts/location";

interface LocationInputProps {
  className?: string;
}

export const LocationInput = ({ className = "h-12" }: LocationInputProps) => {
  const { city, state, country, isLoading } = useLocation();
  const locationString = [city, state, country].filter(Boolean).join(", ");

  return (
    <div className="relative flex-1">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input 
        placeholder={isLoading ? "Detecting location..." : "Location"} 
        value={!isLoading ? locationString : ""} 
        className={`pl-10 ${className}`}
        readOnly
      />
    </div>
  );
};