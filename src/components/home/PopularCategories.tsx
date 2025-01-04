import { 
  Building2, Utensils, Scissors, Wrench, ShoppingBag, 
  Laptop, Stethoscope, School, Car, Heart, Plane,
  Plus, List
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CATEGORIES = [
  { 
    name: "Retail & Shopping",
    description: "Clothing, Electronics, Home & Garden",
    icon: ShoppingBag,
    count: 0 
  },
  { 
    name: "Food & Drink",
    description: "Restaurants, Cafes, Bars",
    icon: Utensils,
    count: 0 
  },
  { 
    name: "Professional Services",
    description: "Legal, Financial, Consulting",
    icon: Building2,
    count: 0 
  },
  { 
    name: "Personal Services",
    description: "Beauty, Wellness, Fitness",
    icon: Heart,
    count: 0 
  },
  { 
    name: "Home Services",
    description: "Repairs, Maintenance, Cleaning",
    icon: Wrench,
    count: 0 
  },
  { 
    name: "Technology",
    description: "IT Services, Web Development",
    icon: Laptop,
    count: 0 
  },
  { 
    name: "Healthcare",
    description: "Doctors, Dentists, Specialists",
    icon: Stethoscope,
    count: 0 
  },
  { 
    name: "Education",
    description: "Schools, Tutoring, Training",
    icon: School,
    count: 0 
  },
  { 
    name: "Automotive",
    description: "Repairs, Dealers, Services",
    icon: Car,
    count: 0 
  },
  { 
    name: "Beauty & Style",
    description: "Salons, Spas, Fashion",
    icon: Scissors,
    count: 0 
  },
  { 
    name: "Travel & Transport",
    description: "Hotels, Travel Agencies",
    icon: Plane,
    count: 0 
  },
  { 
    name: "General Services",
    description: "Various Business Services",
    icon: List,
    count: 0 
  }
];

const ALL_CATEGORIES = [
  ...CATEGORIES,
  // Additional categories hidden by default
  // ... Add more categories as needed
];

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

  const displayedCategories = showAll ? ALL_CATEGORIES : CATEGORIES;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of the most searched business categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedCategories.map((category) => {
            const Icon = category.icon;
            const count = categoryCounts?.[category.name] || 0;
            
            return (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center cursor-pointer border border-gray-100 hover:border-primary hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                  <Icon size={32} />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                <p className="text-sm text-gray-500">{count} Listings</p>
              </div>
            );
          })}
        </div>

        {ALL_CATEGORIES.length > 12 && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              {showAll ? 'Show Less' : 'See More Categories'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};