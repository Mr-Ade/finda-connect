import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { LocationData } from "@/data/popularLocations";

interface LocationCardProps {
  location: LocationData;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <Link 
      to={`/search?location=${location.name}`}
      className="relative block group overflow-hidden rounded-lg"
    >
      <img
        src={location.image}
        alt={location.name}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
        <MapPin className="w-6 h-6 mb-2" />
        <h3 className="text-xl font-semibold">{location.name}</h3>
        <p className="text-sm opacity-90">{location.businesses} Businesses</p>
      </div>
    </Link>
  );
};