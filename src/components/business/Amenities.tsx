import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface AmenitiesProps {
  amenities: {
    name: string;
    available: boolean;
  }[];
}

export const Amenities = ({ amenities }: AmenitiesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenities and More</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                !amenity.available && "text-gray-400"
              }`}
            >
              <div
                className={`rounded-full p-1 ${
                  amenity.available
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm">{amenity.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};