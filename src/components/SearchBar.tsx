import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Car, Home } from "lucide-react";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationInput } from "@/components/search/LocationInput";
import { PriceInput } from "@/components/search/PriceInput";

export const SearchBar = () => {
  const [searchType, setSearchType] = useState("general");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  return (
    <div className="flex flex-col gap-4 max-w-3xl w-full">
      <div className="flex gap-2">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Search</SelectItem>
            <SelectItem value="car">Car Search</SelectItem>
            <SelectItem value="property">Property Search</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {searchType === "property" ? (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="pl-10 h-12">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PriceInput
            value={minPrice}
            onChange={setMinPrice}
            placeholder="Min Price"
          />
          <PriceInput
            value={maxPrice}
            onChange={setMaxPrice}
            placeholder="Max Price"
          />
          <div className="relative flex-1">
            <Input
              placeholder="Bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="h-12"
              type="number"
            />
          </div>
          <LocationInput />
          <Button className="h-12 px-8">
            Search
          </Button>
        </div>
      ) : searchType === "car" ? (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Car Make"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="relative flex-1">
            <Input
              placeholder="Car Model"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="relative flex-1">
            <Input
              placeholder="Year"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              className="h-12"
              type="number"
            />
          </div>
          <LocationInput />
          <Button className="h-12 px-8">
            Search
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for restaurants, shops, services..."
              className="pl-10 h-12"
            />
          </div>
          <LocationInput />
          <Button className="h-12 px-8">
            Search
          </Button>
        </div>
      )}
    </div>
  );
};