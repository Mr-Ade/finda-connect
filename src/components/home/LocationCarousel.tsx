import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const POPULAR_LOCATIONS = [
  { 
    name: "Lagos",
    image: "https://images.unsplash.com/photo-1588960952097-4fd7fc02fe8e",
    businesses: "2,345"
  },
  {
    name: "Abuja",
    image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    businesses: "1,987"
  },
  {
    name: "Port Harcourt",
    image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7",
    businesses: "1,456"
  },
  {
    name: "Ibadan",
    image: "https://images.unsplash.com/photo-1587659901518-7020d4413085",
    businesses: "1,234"
  },
  {
    name: "Kano",
    image: "https://images.unsplash.com/photo-1588960952097-4fd7fc02fe8e",
    businesses: "987"
  }
];

export const LocationCarousel = () => {
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {POPULAR_LOCATIONS.map((location, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Link 
              to={`/search?location=${location.name}`}
              className="relative block group overflow-hidden rounded-lg"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                <MapPin className="w-6 h-6 mb-2" />
                <h3 className="text-xl font-semibold">{location.name}</h3>
                <p className="text-sm opacity-90">{location.businesses} Businesses</p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};