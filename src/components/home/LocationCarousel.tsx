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
import { LocationData } from "@/data/popularLocations";

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

  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['popularLocations'],
    queryFn: async () => {
      console.log('Fetching popular locations...');
      try {
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
        return data as LocationData[];
      } catch (err) {
        console.error('Error in popular locations query:', err);
        throw err;
      }
    },
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false
  });

  // Handle error state with toast
  useEffect(() => {
    if (error) {
      console.error('Error in popular locations query:', error);
      toast({
        title: "Error loading locations",
        description: "Unable to load locations. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Handle Embla initialization and cleanup
  useEffect(() => {
    if (emblaApi) {
      setApi(emblaApi);
    }

    return () => {
      if (emblaApi) {
        emblaApi.destroy();
      }
      if (autoplay) {
        autoplay.stop();
      }
    };
  }, [emblaApi, autoplay]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <LocationCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Don't render anything if there's no data
  if (!locations || locations.length === 0) {
    return null;
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
        {locations.map((location) => (
          <CarouselItem key={location.id} className="md:basis-1/4 lg:basis-1/4">
            <LocationCard location={location} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};