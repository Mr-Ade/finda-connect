import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const SearchFilters = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState(2); // $$$

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h4 className="font-medium text-lg">Search Filter</h4>
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-500 hover:text-gray-700">Clear All</button>
          <button onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">Toggle filters</span>
            {/* Icon */}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4">
          {/* Price Range */}
          <div className="mb-6">
            <div className="flex justify-around">
              {[1,2,3,4].map((value) => (
                <Button 
                  key={value}
                  variant={priceRange === value ? "default" : "outline"}
                  onClick={() => setPriceRange(value)}
                  className="px-4"
                >
                  {"$".repeat(value)}
                </Button>
              ))}
            </div>
          </div>

          {/* Suggested */}
          <FilterSection 
            title="Suggested"
            items={[
              "Open Now",
              "Reservations",
              "Mexican",
              "Seafood",
              "Takeout"
            ]}
          />

          {/* Features */}
          <FilterSection 
            title="Features"
            items={[
              "Good for Kids",
              "Waiter Service", 
              "Open to All",
              "Dogs Allowed",
              "Outdoor Seating",
              "Hot and New",
              "Breakfast"
            ]}
          />

          {/* Distance */}
          <FilterSection 
            title="Bird's-eye View"
            items={[
              "Within 4 blocks",
              "Walking (1 mi.)",
              "Biking (2 mi.)",
              "Driving (5 mi.)",
              "Driving (10 mi.)"
            ]}
          />

          <Button className="w-full mt-4">
            Show Results
          </Button>
        </div>
      )}
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  items: string[];
}

const FilterSection = ({ title, items }: FilterSectionProps) => {
  return (
    <div className="mb-6">
      <h6 className="font-medium mb-3">{title}</h6>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox id={item} />
            <label 
              htmlFor={item}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};