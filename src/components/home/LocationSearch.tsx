import { MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const POPULAR_LOCATIONS = [
  { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9", count: 25 },
  { name: "Chicago", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f", count: 18 },
  { name: "Los Angeles", image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed", count: 22 },
  { name: "San Francisco", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29", count: 15 },
  { name: "Miami", image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3", count: 20 },
  { name: "Seattle", image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362", count: 12 }
];

export const LocationSearch = () => {
  return (
    <section className="py-16 bg-white">
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
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {POPULAR_LOCATIONS.map((location) => (
              <CarouselItem key={location.name} className="md:basis-1/2 lg:basis-1/3">
                <div className="relative overflow-hidden rounded-lg group cursor-pointer h-64">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-white" />
                      <h4 className="text-white font-medium text-lg">{location.name}</h4>
                    </div>
                    <p className="text-white/80 text-sm">{location.count} Listings</p>
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