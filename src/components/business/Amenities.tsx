import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { AmenityType, AMENITY_LABELS } from "@/types/amenities";
import type { Amenities } from "@/types/amenities";

interface AmenitiesProps {
  amenities: Partial<Amenities>;
}

export const Amenities = ({ amenities }: AmenitiesProps) => {
  const amenityEntries = Object.entries(amenities) as [AmenityType, boolean][];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenities and More</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenityEntries.map(([amenity, available]) => (
            <div
              key={amenity}
              className={`flex items-center gap-2 ${
                !available && "text-gray-400"
              }`}
            >
              <div
                className={`rounded-full p-1 ${
                  available
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