import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AmenityType, AMENITY_LABELS, DEFAULT_AMENITIES } from "@/types/amenities";
import type { Amenities } from "@/types/amenities";

interface AmenitiesFormProps {
  amenities: Partial<Amenities>;
  onChange: (amenities: Amenities) => void;
  disabled?: boolean;
}

export const AmenitiesForm = ({ amenities = {}, onChange, disabled = false }: AmenitiesFormProps) => {
  const handleAmenityChange = (amenity: AmenityType, checked: boolean) => {
    const updatedAmenities = {
      ...DEFAULT_AMENITIES,
      ...amenities,
      [amenity]: checked
    };
    onChange(updatedAmenities);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Amenities</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(AMENITY_LABELS) as AmenityType[]).map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={amenities[amenity] ?? false}
                onCheckedChange={(checked) => 
                  handleAmenityChange(amenity, checked as boolean)
                }
                disabled={disabled}
              />
              <Label 
                htmlFor={`amenity-${amenity}`}
                className="text-sm"
              >
                {AMENITY_LABELS[amenity]}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};