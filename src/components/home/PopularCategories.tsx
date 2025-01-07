import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryCard } from "./CategoryCard";
import { ShowMoreButton } from "./ShowMoreButton";
import { INITIAL_CATEGORIES, ADDITIONAL_CATEGORIES } from "./CategoryData";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface CategoryCount {
  category: string;
  count: number;
}

export const PopularCategories = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();
  
  const { data: categoryCounts, isLoading, error } = useQuery({
    queryKey: ['category-counts'],
    queryFn: async () => {
      console.log('Fetching category counts...');
      
      const { data, error } = await supabase
        .from('businesses')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching category counts:', error);
        toast({
          title: "Error loading categories",
          description: "Failed to load category counts. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }

      // Transform the data into category counts
      const counts: Record<string, number> = {};
      data.forEach(item => {
        // Get the top-level category by splitting on '/' and taking first part
        const mainCategory = item.category.split('/')[0].trim();
        counts[mainCategory] = (counts[mainCategory] || 0) + 1;
      });

      console.log('Category counts:', counts);
      return counts;
    },
  });

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/search?category=${encodeURIComponent(categoryName)}`);
  };

  const displayedCategories = showAll 
    ? [...INITIAL_CATEGORIES, ...ADDITIONAL_CATEGORIES]
    : INITIAL_CATEGORIES;

  // Map the categories with their counts
  const categoriesWithCounts = displayedCategories.map(category => ({
    ...category,
    count: categoryCounts?.[category.name] || 0
  }));

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore some of the most searched business categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6">
                <Skeleton className="w-16 h-16 rounded-lg mx-auto mb-4" />
                <Skeleton className="h-4 w-24 mx-auto mb-2" />
                <Skeleton className="h-3 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-red-600">
              Unable to load categories. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of the most searched business categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesWithCounts.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              Icon={category.icon}
              count={category.count}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
        
        {ADDITIONAL_CATEGORIES.length > 0 && (
          <ShowMoreButton 
            showAll={showAll} 
            onClick={() => setShowAll(!showAll)} 
          />
        )}
      </div>
    </section>
  );
};