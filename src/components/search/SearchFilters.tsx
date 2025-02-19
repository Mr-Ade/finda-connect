import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  onFilterChange: (filters: {
    priceRange: number[];
    rating: number;
    openNow: boolean;
    sortBy: string;
  }) => void;
  initialFilters?: {
    priceRange: number[];
    rating: number;
    openNow: boolean;
    sortBy: string;
  };
}

export const SearchFilters = ({ onFilterChange, initialFilters }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>(initialFilters?.priceRange || [0]);
  const [rating, setRating] = useState<number>(initialFilters?.rating || 0);
  const [openNow, setOpenNow] = useState<boolean>(initialFilters?.openNow || false);
  const [sortBy, setSortBy] = useState<string>(initialFilters?.sortBy || "relevance");

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h4 className="font-medium text-lg">Search Filter</h4>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => {
              setPriceRange([0]);
              setRating(0);
              setOpenNow(false);
              setSortBy("relevance");
              onFilterChange({
                priceRange: [0],
                rating: 0,
                openNow: false,
                sortBy: "relevance"
              });
            }}
          >
            Clear All
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle filters</span>
            {isOpen ? "−" : "+"}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Price Range</Label>
              <Slider
                defaultValue={priceRange}
                max={4}
                step={1}
                onValueChange={(value) => {
                  setPriceRange(value);
                  onFilterChange({ priceRange: value, rating, openNow, sortBy });
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
                <span>$$$$</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Slider
                defaultValue={[rating]}
                max={5}
                step={0.5}
                onValueChange={(value) => {
                  setRating(value[0]);
                  onFilterChange({ priceRange, rating: value[0], openNow, sortBy });
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Any</span>
                <span>5★</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Open Now</Label>
              <Switch
                checked={openNow}
                onCheckedChange={(checked) => {
                  setOpenNow(checked);
                  onFilterChange({ priceRange, rating, openNow: checked, sortBy });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  onFilterChange({ priceRange, rating, openNow, sortBy: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};