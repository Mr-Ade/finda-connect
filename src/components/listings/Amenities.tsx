import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";

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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Coffee className="w-5 h-5" />
        <h3 className="font-medium">Amenities</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={`amenity-${index}`} />
              <Label htmlFor={`amenity-${index}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};