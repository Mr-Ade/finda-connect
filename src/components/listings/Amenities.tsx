import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AmenityType, AMENITY_LABELS } from "@/types/amenities";

interface AmenitiesProps {
  amenities: Partial<Record<AmenityType, boolean>>;
  isLoading?: boolean;
  showAll?: boolean;
}

export const Amenities = ({ amenities, isLoading = false, showAll = true }: AmenitiesProps) => {
  const availableAmenities = Object.entries(amenities)
    .filter(([_, value]) => value === true)
    .map(([key]) => key as AmenityType);

  const displayAmenities = showAll 
    ? Object.keys(AMENITY_LABELS) as AmenityType[]
    : availableAmenities;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-32" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenities and More</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayAmenities.map((amenity) => (
            <div
              key={amenity}
              className={`flex items-center gap-2 ${
                !amenities[amenity] && "text-gray-400"
              }`}
            >
              <div
                className={`rounded-full p-1 ${
                  amenities[amenity]
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm">{AMENITY_LABELS[amenity]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};