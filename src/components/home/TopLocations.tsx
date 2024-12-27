import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LOCATIONS = [
  {
    id: 1,
    name: "Redondo Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    link: "/search?location=redondo-beach"
  },
  {
    id: 2,
    name: "San Francisco",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    link: "/search?location=san-francisco"
  },
  {
    id: 3,
    name: "Santa Barbara",
    image: "https://images.unsplash.com/photo-1518730518541-d0843268c287",
    link: "/search?location=santa-barbara"
  },
  {
    id: 4,
    name: "Long Island City",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620",
    link: "/search?location=long-island-city"
  }
];

export const TopLocations = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-primary text-sm font-medium">Find By Location</h6>
          <h2 className="text-3xl font-bold mt-2">
            Explore By <span className="text-primary">Top Locations</span>
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {LOCATIONS.map((location) => (
              <CarouselItem key={location.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="relative overflow-hidden rounded-lg group">
                  <div className="relative h-64 w-full">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <h4 className="text-white font-medium text-lg">{location.name}</h4>
                    <Link 
                      to={location.link}
                      className="text-white hover:text-primary transition-colors"
                    >
                      <ArrowRightCircle className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};