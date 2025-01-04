import { useEffect, useState } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { LocationCard } from "./LocationCard";
import { POPULAR_LOCATIONS } from "@/data/popularLocations";

export const LocationCarousel = () => {
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

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true
      }}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent ref={emblaRef}>
        {POPULAR_LOCATIONS.map((location, index) => (
          <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/4">
            <LocationCard location={location} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};