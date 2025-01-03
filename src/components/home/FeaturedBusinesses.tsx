import { BusinessCard } from "@/components/BusinessCard";
import { useLocation } from "@/contexts/LocationContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FeaturedBusinesses = () => {
  const { city, state, country } = useLocation();

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['featured-businesses', city, state, country],
    queryFn: async () => {
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

      const { data, error } = await query.limit(8);

      if (error) throw error;

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <span className="text-primary text-sm">Featured Listings</span>
          <h2 className="text-3xl font-bold mt-2">Featured Businesses</h2>
          <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
            <button className="px-4 py-2 rounded-full bg-primary text-white">Places</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Events</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Doctors</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Cars</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Real Estate</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Hotels</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">jobs</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {businesses?.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </div>
    </section>
  );
};