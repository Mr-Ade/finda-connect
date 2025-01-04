import { LocationCarousel } from "./LocationCarousel";

export const LocationSearch = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Locations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing businesses across Nigeria's most vibrant cities
          </p>
        </div>
        <LocationCarousel />
      </div>
    </section>
  );
};