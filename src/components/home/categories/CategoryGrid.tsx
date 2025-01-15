import { CategoryCard } from "@/components/home/CategoryCard";
import { INITIAL_CATEGORIES, ADDITIONAL_CATEGORIES } from "../CategoryData";

interface CategoryGridProps {
  showAll: boolean;
  categoryCounts: { [key: string]: number };
  onCategoryClick: (categoryName: string) => void;
}

export const CategoryGrid = ({ showAll, categoryCounts, onCategoryClick }: CategoryGridProps) => {
  const displayedCategories = showAll 
    ? [...INITIAL_CATEGORIES, ...ADDITIONAL_CATEGORIES]
    : INITIAL_CATEGORIES;

  // Update counts from database
  displayedCategories.forEach(category => {
    category.count = categoryCounts?.[category.name] || 0;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {displayedCategories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          Icon={category.icon}
          count={category.count}
          onClick={() => onCategoryClick(category.name)}
        />
      ))}
    </div>
  );
};