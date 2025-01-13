import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryCard } from "./CategoryCard";
import { ShowMoreButton } from "./ShowMoreButton";
import { useToast } from "@/hooks/use-toast";
import { INITIAL_CATEGORIES, ADDITIONAL_CATEGORIES } from "./CategoryData";

interface CategoryCount {
  category: string;
  count: number;
}

export const PopularCategories = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();
  
  const { data: categoryCounts, isLoading, error } = useQuery({
    queryKey: ['categoryCounts'],
    queryFn: async () => {
      console.log('Fetching category counts...');
      const { data, error } = await supabase
        .from('businesses')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
        throw error;
      }

      const counts = data.reduce((acc: { [key: string]: number }, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
      }, {});

      console.log('Category counts:', counts);
      return counts;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (error) {
    console.error('Error in businesses query:', error);
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

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/explore-listings?category=${encodeURIComponent(categoryName)}`);
  };

  // Show 12 categories (6x2 grid) instead of showing all
  const displayedCategories = INITIAL_CATEGORIES.slice(0, 12);

  // Update counts from database
  displayedCategories.forEach(category => {
    category.count = categoryCounts?.[category.name] || 0;
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p>Loading categories...</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h6 className="text-primary text-sm font-medium">What We Offer</h6>
          <h2 className="text-3xl font-bold mt-2">
            Popular <span className="text-primary">Categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayedCategories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              Icon={category.icon}
              count={category.count}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
