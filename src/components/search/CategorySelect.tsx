import { Button } from "@/components/ui/button";
import { ChevronDown, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INITIAL_CATEGORIES, ADDITIONAL_CATEGORIES } from "@/components/home/CategoryData";

interface CategorySelectProps {
  onSelect: (category: string) => void;
  className?: string;
}

export const CategorySelect = ({ onSelect, className = "h-12" }: CategorySelectProps) => {
  const allCategories = [...INITIAL_CATEGORIES, ...ADDITIONAL_CATEGORIES];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${className} gap-2`}
        >
          <List className="h-4 w-4" />
          Categories
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] max-h-[300px] overflow-y-auto">
        {allCategories.map((category) => (
          <DropdownMenuItem
            key={category.name}
            onClick={() => onSelect(category.name)}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};