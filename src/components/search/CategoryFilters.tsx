import { Button } from "@/components/ui/button";
import { 
  Coffee, 
  Wrench, 
  Home, 
  MoreHorizontal,
  FastForward,
  Utensils,
  Book,
  Car,
  ShoppingBag
} from "lucide-react";

export const CategoryFilters = () => {
  return (
    <section className="bg-white border-b py-3">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center gap-2">
          <FilterButton icon={<Coffee />} label="Restaurants" />
          <FilterButton icon={<Home />} label="Home Services" />
          <FilterButton icon={<Car />} label="Auto Services" />
          <FilterButton icon={<MoreHorizontal />} label="More" />
          <Button variant="default" className="bg-gray-900">Update</Button>
        </div>
      </div>
    </section>
  );
};

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
}

const FilterButton = ({ icon, label }: FilterButtonProps) => {
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};