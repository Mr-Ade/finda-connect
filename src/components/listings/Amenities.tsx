import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";

const amenities = [
  "Health Score 8.7/10", "Reservations", "Vegetarian Options",
  "Moderate Noise", "Good for Kids", "Private Lot Parking",
  "Beer & Wine", "TV Services", "Pets Allowed",
  "Offers Delivery", "Staff wears masks", "Accepts Credit Cards",
  "Offers Catering", "Good for Breakfast", "Waiter Service",
  "Drive-Thru", "Outdoor Seating", "Offers Takeout",
  "Vegan Options", "Casual", "Good for Groups",
  "Brunch, Lunch, Dinner", "Free Wi-Fi", "Wheelchair Accessible",
  "Happy Hour"
];

export const Amenities = () => {
  const { formData, updateFormData } = useBusinessForm();

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    const currentAmenities = formData.amenities || [];
    const updatedAmenities = checked
      ? [...currentAmenities, { name: amenity, available: true }]
      : currentAmenities.filter(a => a.name !== amenity);
    
    updateFormData('amenities', updatedAmenities);
  };

  const isAmenityChecked = (amenity: string) => {
    return formData.amenities?.some(a => a.name === amenity && a.available) || false;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Coffee className="w-5 h-5" />
        <h3 className="font-medium">Amenities</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={isAmenityChecked(amenity)}
                onCheckedChange={(checked) => handleAmenityToggle(amenity, checked as boolean)}
              />
              <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};