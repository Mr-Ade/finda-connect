import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const POPULAR_LOCATIONS = [
  { 
    name: "Lagos",
    image: "https://images.unsplash.com/photo-1587659901518-7020d4413085",
    businesses: "2,345"
  },
  {
    name: "Abuja",
    image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae",
    businesses: "1,987"
  },
  {
    name: "Port Harcourt",
    image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb",
    businesses: "1,456"
  },
  {
    name: "Ibadan",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21",
    businesses: "1,234"
  },
  {
    name: "Kano",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    businesses: "987"
  },
  {
    name: "Enugu",
    image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2",
    businesses: "876"
  },
  {
    name: "Calabar",
    image: "https://images.unsplash.com/photo-1506158669146-619067262a00",
    businesses: "765"
  },
  {
    name: "Warri",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    businesses: "654"
  },
  {
    name: "Benin City",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7",
    businesses: "543"
  },
  {
    name: "Owerri",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    businesses: "432"
  }
];

export const LocationCarousel = () => {
  const [api] = useEmblaCarousel(
    { 
      loop: true,
      duration: 50
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  );

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true
      }}
      className="w-full max-w-5xl mx-auto"
      setApi={api}
    >
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
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
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