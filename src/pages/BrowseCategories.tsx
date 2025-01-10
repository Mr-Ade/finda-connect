import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/home/CategoryCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { INITIAL_CATEGORIES, ADDITIONAL_CATEGORIES } from "@/components/home/CategoryData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const BrowseCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Browse Categories", href: "#", active: true },
  ];

  // Fetch category counts from Supabase
  const { data: categoryCounts, isLoading } = useQuery({
    queryKey: ['category-counts'],
    queryFn: async () => {
      console.log('Fetching category counts...');
      const { data: businesses, error } = await supabase
        .from('businesses')
        .select('category')
        .eq('status', 'approved');

      if (error) {
        console.error('Error fetching category counts:', error);
        throw error;
      }

      // Count businesses per category
      const counts = businesses.reduce((acc: Record<string, number>, business) => {
        acc[business.category] = (acc[business.category] || 0) + 1;
        return acc;
      }, {});

      console.log('Category counts:', counts);
      return counts;
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const allCategories = [...INITIAL_CATEGORIES, ...ADDITIONAL_CATEGORIES];
  const displayedCategories = showAll ? allCategories : INITIAL_CATEGORIES;

  const filteredCategories = displayedCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(category => ({
    ...category,
    count: categoryCounts?.[category.name] || 0
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
            <p className="text-gray-600 mb-8">
              Explore our comprehensive list of business categories to find exactly what you're looking for
            </p>
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <CategoryCard
                  key={index}
                  name={category.name}
                  Icon={category.icon}
                  count={category.count}
                  onClick={() => {
                    window.location.href = `/explore-listings?category=${encodeURIComponent(category.name)}`;
                  }}
                />
              ))}
            </div>
          )}

          {!showAll && ADDITIONAL_CATEGORIES.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Show More Categories
              </button>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BrowseCategories;