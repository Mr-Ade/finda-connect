
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { LocationInput } from "@/components/search/LocationInput";
import { CategorySelect } from "@/components/search/CategorySelect";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching with:", { searchTerm, selectedCategory });
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xl w-full">
      <div className="flex gap-2">
        <CategorySelect onSelect={setSelectedCategory} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for restaurants, shops, services..."
            className="pl-10 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <LocationInput />
        <Button className="h-12 px-8" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};
