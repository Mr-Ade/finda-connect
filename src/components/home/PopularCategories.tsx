import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryCard } from "./CategoryCard";
import { ShowMoreButton } from "./ShowMoreButton";
import { INITIAL_CATEGORIES, ADDITIONAL_CATEGORIES } from "./CategoryData";

export const PopularCategories = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  
  const { data: categoryCounts } = useQuery({
    queryKey: ['category-counts'],
    queryFn: async () => {
      console.log('Fetching category counts...');
      
      const { data, error } = await supabase
        .from('businesses')
        .select('category, count', { count: 'exact', head: false })
        .select('category');

      if (error) {
        console.error('Error fetching category counts:', error);
        throw error;
      }

      const counts: Record<string, number> = {};
      data.forEach(item => {
        if (item.category) {
          counts[item.category] = (counts[item.category] || 0) + 1;
        }
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
          {displayedCategories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              Icon={category.icon}
              count={categoryCounts?.[category.name] || 0}
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