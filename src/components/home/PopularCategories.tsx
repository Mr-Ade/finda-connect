import { 
  Building2, Utensils, Scissors, Wrench, ShoppingBag, 
  Laptop, Stethoscope, Brush, GraduationCap, Car, 
  Dumbbell, Hotel
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = [
  { name: "Real Estate", icon: Building2, count: 0 },
  { name: "Restaurants", icon: Utensils, count: 0 },
  { name: "Fashion & Tailoring", icon: Scissors, count: 0 },
  { name: "Artisans & Repairs", icon: Wrench, count: 0 },
  { name: "Markets & Shops", icon: ShoppingBag, count: 0 },
  { name: "Technology", icon: Laptop, count: 0 },
  { name: "Healthcare", icon: Stethoscope, count: 0 },
  { name: "Arts & Culture", icon: Brush, count: 0 },
  { name: "Education", icon: GraduationCap, count: 0 },
  { name: "Automotive", icon: Car, count: 0 },
  { name: "Sports & Fitness", icon: Dumbbell, count: 0 },
  { name: "Hotels & Lodging", icon: Hotel, count: 0 }
];

export const PopularCategories = () => {
  const navigate = useNavigate();
  
  const { data: categoryCounts } = useQuery({
    queryKey: ['category-counts'],
    queryFn: async () => {
      console.log('Fetching category counts...');
      
      // Using select with count to get category counts
      const { data, error } = await supabase
        .from('businesses')
        .select('category, count', { count: 'exact', head: false })
        .select('category');

      if (error) {
        console.error('Error fetching category counts:', error);
        throw error;
      }

      // Process the data to get counts per category
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
          {CATEGORIES.map((category) => {
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
      </div>
    </section>
  );
};