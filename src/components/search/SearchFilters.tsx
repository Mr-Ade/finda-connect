import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

export const SearchFilters = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Search Filters</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="h-4 w-4 mr-2" />
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {isOpen && (
        <CardContent>
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-4">Price Range</h3>
            <div className="space-y-4">
              <Slider
                defaultValue={[0]}
                max={4}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$</span>
                <span>$$$$</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-4">Features</h3>
            <div className="space-y-2">
              {[
                "Open Now",
                "Reservations",
                "Outdoor Seating",
                "WiFi",
                "Parking"
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox id={feature} />
                  <label
                    htmlFor={feature}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-4">Distance</h3>
            <div className="space-y-2">
              {[
                "Within 4 blocks",
                "Walking (1 mi.)",
                "Biking (2 mi.)",
                "Driving (5 mi.)"
              ].map((distance) => (
                <div key={distance} className="flex items-center space-x-2">
                  <Checkbox id={distance} />
                  <label
                    htmlFor={distance}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {distance}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </CardContent>
      )}
    </Card>
  );
};