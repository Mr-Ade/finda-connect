import { SearchBar } from "@/components/SearchBar";
import { useLocation } from "@/contexts/LocationContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    caption: "Fine Dining Restaurant",
    credit: "Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
    caption: "Modern Fitness Center",
    credit: "Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80",
    caption: "Luxury Hotel",
    credit: "Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80",
    caption: "Shopping Mall",
    credit: "Unsplash"
  }
];

interface PopularCity {
  name: string;
  count: number;
}

export const Hero = () => {
  const { city, setCity } = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [popularCities, setPopularCities] = useState<PopularCity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Fetch popular cities
  useEffect(() => {
    const fetchPopularCities = async () => {
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
        setPopularCities(sortedCities);
      } catch (error) {
        console.error('Error fetching popular cities:', error);
        toast({
          title: "Error",
          description: "Failed to load popular cities",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularCities();
  }, [toast]);

  const handleCityClick = (cityName: string) => {
    setCity(cityName);
    toast({
      title: "Location Updated",
      description: `Location changed to ${cityName}`,
    });
  };

  return (
    <div className="relative h-[600px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${HERO_IMAGES[currentImageIndex].url})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
                Find Your Perfect Place in{" "}
                <span className="text-primary-foreground">{city || "Nigeria"}</span>
              </h1>
              <p className="text-lg text-white/90 mb-8 animate-fade-in delay-100">
                Explore wonderful places to stay, salon, shopping or visit local areas.
              </p>
              <div className="animate-fade-in delay-200">
                <SearchBar />
              </div>
              <div className="mt-6 text-white animate-fade-in delay-300">
                <span className="mr-2 text-white/80">Popular:</span>
                {isLoading ? (
                  <div className="inline-block">
                    <div className="h-8 w-20 bg-white/20 rounded animate-pulse inline-block mx-1"></div>
                    <div className="h-8 w-20 bg-white/20 rounded animate-pulse inline-block mx-1"></div>
                    <div className="h-8 w-20 bg-white/20 rounded animate-pulse inline-block mx-1"></div>
                  </div>
                ) : (
                  popularCities.map((popularCity, index) => (
                    <Button
                      key={popularCity.name}
                      variant="ghost"
                      className="text-white/80 hover:text-white hover:bg-white/10 mr-2"
                      onClick={() => handleCityClick(popularCity.name)}
                    >
                      {popularCity.name}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Attribution */}
      <div className="absolute bottom-2 right-4 text-white/50 text-sm">
        Photo by {HERO_IMAGES[currentImageIndex].credit}
      </div>
    </div>
  );
};
