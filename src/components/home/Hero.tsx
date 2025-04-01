
import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { PopularLocations } from "./hero/PopularLocations";

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 3 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Fetch popular cities
  const { data: popularCities, isLoading } = useQuery({
    queryKey: ['popularCities'],
    queryFn: async () => {
      try {
        console.log('Fetching popular cities...');
        const { data, error } = await supabase
          .from('businesses')
          .select('city')
          .not('city', 'is', null);

        if (error) throw error;

        // Count occurrences of each city
        const cityCounts = data.reduce((acc: { [key: string]: number }, curr) => {
          acc[curr.city] = (acc[curr.city] || 0) + 1;
          return acc;
        }, {});

        // Convert to array and sort by count
        const sortedCities = Object.entries(cityCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4); // Get top 4 cities

        console.log('Popular cities fetched:', sortedCities);
        return sortedCities;
      } catch (error) {
        console.error('Error fetching popular cities:', error);
        toast({
          title: "Error",
          description: "Failed to load popular cities",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  return (
    <div className="relative h-[600px]">
      <HeroBackground currentImageIndex={currentImageIndex} />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <HeroContent />
            <div className="animate-fade-in delay-200">
              <SearchBar />
            </div>
            <PopularLocations 
              popularCities={popularCities || []} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
