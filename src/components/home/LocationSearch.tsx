import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const POPULAR_LOCATIONS = [
  { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9", count: 25 },
  { name: "Chicago", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f", count: 18 },
  { name: "Los Angeles", image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed", count: 22 },
  { name: "San Francisco", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29", count: 15 }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_LOCATIONS.map((location) => (
            <div key={location.name} className="relative overflow-hidden rounded-lg group cursor-pointer">
              <div className="relative h-64">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-medium text-lg">{location.name}</h4>
                <p className="text-white/80 text-sm">{location.count} Listings</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};