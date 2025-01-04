import { SearchBar } from "@/components/SearchBar";
import { useLocation } from "@/contexts/LocationContext";

export const Hero = () => {
  const { city } = useLocation();

  return (
    <div className="home-banner relative bg-primary py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Find Your Perfect Place in <span className="text-white">{city || "Your City"}</span>
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Explore wonderful places to stay, salon, shopping or visit local areas.
              </p>
              <SearchBar />
              <div className="mt-6 text-white">
                <span className="mr-2">Popular:</span>
                <button className="text-white/80 hover:text-white mr-4">Las Vegas</button>
                <button className="text-white/80 hover:text-white mr-4">Houston</button>
                <button className="text-white/80 hover:text-white mr-4">San Jose</button>
                <button className="text-white/80 hover:text-white">New York</button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-5/12">
            <div className="relative">
              <img 
                src="/assets/img/hero-image.jpg" 
                alt="Hero" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};