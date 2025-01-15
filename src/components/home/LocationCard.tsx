import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { LocationData } from "@/data/popularLocations";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LocationCardProps {
  location: LocationData;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  // Fetch real-time business count for this location
  const { data: businessCount } = useQuery({
    queryKey: ['businessCount', location.name],
    queryFn: async () => {
      console.log(`Fetching business count for location: ${location.name}`);
      const { count, error } = await supabase
        .from('businesses')
        .select('*', { count: 'exact', head: true })
        .eq('city', location.name)
        .eq('status', 'approved');

      if (error) {
        console.error('Error fetching business count:', error);
        return 0;
      }

      console.log(`Found ${count} businesses in ${location.name}`);
      return count || 0;
    }
  });

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
        <p className="text-sm opacity-90">{businessCount || 0} Businesses</p>
      </div>
    </Link>
  );
};

export const LocationCardSkeleton = () => {
  return (
    <div className="relative block overflow-hidden rounded-lg">
      <Skeleton className="w-full h-48" />
    </div>
  );
};