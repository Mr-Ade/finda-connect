import { 
  Building2, Store, Utensils, Scissors, Wrench, ShoppingBag, 
  Laptop, Stethoscope, Brush, GraduationCap, Car, Hotel,
  ChevronDown, ChevronUp, Shirt, Book, Home, Gift,
  UtensilsCrossed, Coffee, Briefcase, Bath, Car2, Music,
  FirstAid, School
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const INITIAL_CATEGORIES = [
  { name: "Retail & Shopping", icon: Store, count: 0 },
  { name: "Food & Drink", icon: Utensils, count: 0 },
  { name: "Professional Services", icon: Building2, count: 0 },
  { name: "Personal Services", icon: Scissors, count: 0 },
  { name: "Home Services", icon: Wrench, count: 0 },
  { name: "Automotive Services", icon: Car, count: 0 },
  { name: "Technology", icon: Laptop, count: 0 },
  { name: "Healthcare", icon: Stethoscope, count: 0 },
  { name: "Arts & Entertainment", icon: Brush, count: 0 },
  { name: "Education", icon: GraduationCap, count: 0 },
  { name: "Travel & Transportation", icon: Hotel, count: 0 },
  { name: "Shopping", icon: ShoppingBag, count: 0 }
];

const ADDITIONAL_CATEGORIES = [
  { name: "Apparel & Fashion", icon: Shirt, count: 0 },
  { name: "Books & Media", icon: Book, count: 0 },
  { name: "Home & Garden", icon: Home, count: 0 },
  { name: "Gifts & Specialty", icon: Gift, count: 0 },
  { name: "Restaurants", icon: UtensilsCrossed, count: 0 },
  { name: "Cafes & Bakeries", icon: Coffee, count: 0 },
  { name: "Business Services", icon: Briefcase, count: 0 },
  { name: "Beauty & Wellness", icon: Bath, count: 0 },
  { name: "Auto Dealers", icon: Car2, count: 0 },
  { name: "Entertainment Venues", icon: Music, count: 0 },
  { name: "Medical Services", icon: FirstAid, count: 0 },
  { name: "Educational Services", icon: School, count: 0 }
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
                <p className="text-sm text-gray-500">{count} Listings</p>
              </div>
            );
          })}
        </div>
        
        {ADDITIONAL_CATEGORIES.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More Categories <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};