import { SearchBar } from "@/components/SearchBar";
import { useLocation } from "@/contexts/LocationContext";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1588960952097-4fd7fc02fe8e",
    caption: "Lagos Skyline",
    credit: "Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    caption: "Business District",
    credit: "Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7",
    caption: "Local Markets",
    credit: "Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1587659901518-7020d4413085",
    caption: "Modern Nigeria",
    credit: "Unsplash"
  }
];

export const Hero = () => {
  const { city } = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${HERO_IMAGES[currentImageIndex].url})`,
          opacity: 0.7
        }}
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Find Your Perfect Place in <span className="text-white">{city || "Nigeria"}</span>
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Explore wonderful places to stay, salon, shopping or visit local areas.
              </p>
              <SearchBar />
              <div className="mt-6 text-white">
                <span className="mr-2">Popular:</span>
                <button className="text-white/80 hover:text-white mr-4">Lagos</button>
                <button className="text-white/80 hover:text-white mr-4">Abuja</button>
                <button className="text-white/80 hover:text-white mr-4">Port Harcourt</button>
                <button className="text-white/80 hover:text-white">Ibadan</button>
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