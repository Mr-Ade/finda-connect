import { Button } from "@/components/ui/button";
import { INITIAL_CATEGORIES } from "@/components/home/CategoryData";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const CategoryFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const currentCategory = searchParams.get('category');

  const handleCategoryFilter = (category: string) => {
    console.log('Filtering by category:', category);
    
    try {
      // Update URL params
      if (category === currentCategory) {
        searchParams.delete('category');
      } else {
        searchParams.set('category', category);
      }
      setSearchParams(searchParams);

      toast({
        title: "Category filter updated",
        description: `Showing listings for ${category}`,
      });
    } catch (error) {
      console.error('Error updating category filter:', error);
      toast({
        title: "Error updating filter",
        description: "Failed to update category filter. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="bg-white border-b py-3">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center gap-2">
          {INITIAL_CATEGORIES.slice(0, 6).map((category) => (
            <Button
              key={category.name}
              variant={currentCategory === category.name ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => handleCategoryFilter(category.name)}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          ))}
          <Button 
            variant="default" 
            className="bg-gray-900"
            onClick={() => {
              if (currentCategory) {
                searchParams.delete('category');
                setSearchParams(searchParams);
                toast({
                  title: "Filters cleared",
                  description: "Showing all listings",
                });
              }
            }}
          >
            {currentCategory ? "Clear Filter" : "Update"}
          </Button>
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