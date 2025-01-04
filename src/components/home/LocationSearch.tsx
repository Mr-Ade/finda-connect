import { useToast } from "@/hooks/use-toast";
import { LocationCarousel } from "./LocationCarousel";

export const LocationSearch = () => {
  const { toast } = useToast();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-primary text-sm font-medium">Explore</h6>
          <h2 className="text-3xl font-bold mt-2">
            Popular <span className="text-primary">Locations</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover top-rated businesses in these popular locations across Nigeria
          </p>
        </div>

        <LocationCarousel />
      </div>
    </section>
  );
};