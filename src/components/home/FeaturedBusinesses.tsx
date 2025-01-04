import { BusinessCard } from "@/components/BusinessCard";
import { useLocation } from "@/contexts/LocationContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const CATEGORIES = ["Places", "Events", "Doctors", "Cars", "Real Estate", "Hotels", "Jobs"];

export const FeaturedBusinesses = () => {
  const { city, state, country } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("Places");

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['featured-businesses', city, state, country, selectedCategory],
    queryFn: async () => {
      console.log('Fetching featured businesses with filters:', { city, state, country, selectedCategory });
      
      let query = supabase
        .from('businesses')
        .select(`
          *,
          reviews (rating),
          business_photos (photo_url)
        `);

      // Filter by location if available
      if (city) query = query.eq('city', city);
      if (state) query = query.eq('state', state);
      
      // Filter by category
      if (selectedCategory) {
        query = query.ilike('category', `%${selectedCategory}%`);
      }

      const { data, error } = await query.limit(8);

      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      console.log('Fetched businesses:', data);
      return data.map(business => ({
        id: business.id,
        name: business.name,
        image: business.business_photos?.[0]?.photo_url || "https://images.unsplash.com/photo-1560066984-138dadb4c035",
        category: business.category,
        rating: business.reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (business.reviews?.length || 1) || 0,
        reviewCount: business.reviews?.length || 0,
        location: `${business.city}, ${business.state}`,
        isOpen: true, // This should be calculated based on business hours
        isFeatured: true
      }));
    },
  });

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <span className="text-primary text-sm">Featured Listings</span>
          <h2 className="text-3xl font-bold mt-2">Featured Businesses</h2>
          <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : businesses?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No businesses found in this category
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {businesses?.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};