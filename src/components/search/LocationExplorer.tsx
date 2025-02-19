import { LocationRecommendations } from "./LocationRecommendations";
import { PopularLocations } from "./PopularLocations";
import { useLocation } from "@/contexts/LocationContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LocationExplorer = () => {
  const { isLoading, coordinates } = useLocation();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!coordinates.latitude || !coordinates.longitude) {
    return (
      <Alert>
        <AlertDescription>
          Please enable location services to see personalized recommendations.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <LocationRecommendations />
      <PopularLocations />
    </div>
  );
};