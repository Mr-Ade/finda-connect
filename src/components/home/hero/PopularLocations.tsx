import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";

interface PopularLocationsProps {
  popularCities: Array<{
    name: string;
    count: number;
  }>;
  isLoading: boolean;
}

export const PopularLocations = ({ popularCities, isLoading }: PopularLocationsProps) => {
  const { setCity } = useLocation();
  const { toast } = useToast();

  const handleCityClick = (cityName: string) => {
    setCity(cityName);
    toast({
      title: "Location Updated",
      description: `Location changed to ${cityName}`,
    });
  };

  if (isLoading) {
    return (
      <div className="inline-block">
        <div className="h-8 w-20 bg-white/20 rounded animate-pulse inline-block mx-1"></div>
        <div className="h-8 w-20 bg-white/20 rounded animate-pulse inline-block mx-1"></div>
        <div className="h-8 w-20 bg-white/20 rounded animate-pulse inline-block mx-1"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 text-white animate-fade-in delay-300">
      <span className="mr-2 text-white/80">Popular:</span>
      {popularCities.map((popularCity) => (
        <Button
          key={popularCity.name}
          variant="ghost"
          className="text-white/80 hover:text-white hover:bg-white/10 mr-2"
          onClick={() => handleCityClick(popularCity.name)}
        >
          {popularCity.name}
        </Button>
      ))}
    </div>
  );
};