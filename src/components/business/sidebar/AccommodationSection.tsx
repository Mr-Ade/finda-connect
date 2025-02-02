import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Users } from "lucide-react";
import { useState } from "react";

const amenities = [
  { id: "air_condition", label: "Air Condition", price: 10 },
  { id: "bedding", label: "Bedding", price: 7 },
  { id: "heating", label: "Heating", price: 20 },
  { id: "internet", label: "Internet", price: 10 },
  { id: "microwave", label: "Microwave", price: 5 },
];

export const AccommodationSection = () => {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-4">Book Your Order</h4>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Check In</Label>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Check In</span>
          </div>
        </div>
        <div>
          <Label>Check Out</Label>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Check Out</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label>Adults</Label>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setAdults(Math.max(1, adults - 1))}
            >-</Button>
            <span>{adults}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setAdults(adults + 1)}
            >+</Button>
          </div>
        </div>
        <div>
          <Label>Kids</Label>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setKids(Math.max(0, kids - 1))}
            >-</Button>
            <span>{kids}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setKids(kids + 1)}
            >+</Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h5 className="font-medium mb-3">Advance features</h5>
        <div className="space-y-3">
          {amenities.map(amenity => (
            <div key={amenity.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={() => handleAmenityChange(amenity.id)}
                />
                <Label htmlFor={amenity.id}>{amenity.label}</Label>
              </div>
              <span className="text-gray-600">${amenity.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <h5 className="font-medium mb-3">Price & Taxes</h5>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>1 Night</span>
            <span>$170</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount 25$</span>
            <span>-$210</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>$13</span>
          </div>
          <div className="flex justify-between">
            <span>Breakfast Per Adult</span>
            <span>$24</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between font-medium text-lg mb-4">
        <span>Total Payment</span>
        <span className="text-red-500">$218</span>
      </div>

      <Button className="w-full">Book Order Now</Button>
    </div>
  );
};