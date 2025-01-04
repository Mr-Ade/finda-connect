import { useEffect, useState } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { LocationCard, LocationCardSkeleton } from "./LocationCard";
import { LocationData, POPULAR_LOCATIONS } from "@/data/popularLocations";

export const LocationCarousel = () => {
  const { toast } = useToast();
  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    playOnInit: true
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
      slidesToScroll: 4
    },
    [autoplay]
  );

  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);

  useEffect(() => {
    if (emblaApi) {
      setApi(emblaApi);
    }
  }, [emblaApi]);

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
      return (data || []) as LocationData[];
    },
    onError: (err) => {
      console.error('Error in popular locations query:', err);
      toast({
        title: "Error loading locations",
        description: "Using fallback data. Please try again later.",
        variant: "destructive",
      });
    }
  });

  const displayLocations = locations?.length ? locations : POPULAR_LOCATIONS;

  if (error) {
    console.error('Rendering with fallback data due to error:', error);
  }

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true
      }}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent ref={emblaRef}>
        {isLoading ? (
          // Show skeletons while loading
          Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/4">
              <LocationCardSkeleton />
            </CarouselItem>
          ))
        ) : (
          displayLocations.map((location) => (
            <CarouselItem key={location.id} className="md:basis-1/4 lg:basis-1/4">
              <LocationCard location={location} />
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};