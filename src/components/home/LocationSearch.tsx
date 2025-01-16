import { useToast } from "@/hooks/use-toast";
import { LocationCarousel } from "./LocationCarousel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const LocationSearch = () => {
  const { toast } = useToast();

  // Fetch popular locations data
  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['popularLocations'],
    queryFn: async () => {
      console.log('Fetching popular locations...');
      const { data, error } = await supabase
        .from('popular_locations')
        .select('*')
        .eq('is_active', true)
        .order('businesses', { ascending: false });

      if (error) {
        console.error('Error fetching popular locations:', error);
        throw error;
      }

      console.log('Fetched popular locations:', data);
      return data;
    }
  });

  // Handle error state with toast
  if (error) {
    toast({
      title: "Error loading locations",
      description: "There was a problem loading the locations. Please try again later.",
      variant: "destructive",
    });
  }

  return (
    <section 
      className="py-16 bg-white"
      aria-labelledby="location-search-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 
            id="location-search-heading" 
            className="text-primary text-sm font-medium"
          >
            Explore
          </h6>
          <h2 className="text-3xl font-bold mt-2">
            Popular <span className="text-primary">Locations</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover top-rated businesses in these popular locations across Nigeria
          </p>
        </div>

        <LocationCarousel />
      </div>
    </section>
  );
};

export default LocationSearch;
