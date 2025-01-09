import { Button } from "@/components/ui/button";
import { ChevronDown, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

interface CategorySelectProps {
  onSelect: (category: string) => void;
  className?: string;
}

export const CategorySelect = ({ onSelect, className = "h-12" }: CategorySelectProps) => {
  const mainCategories = Object.keys(BUSINESS_CATEGORIES);

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
      <DropdownMenuContent align="start" className="w-[200px]">
        {mainCategories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => onSelect(category)}
          >
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};