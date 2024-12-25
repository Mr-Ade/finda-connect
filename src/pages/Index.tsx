import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { BusinessCard } from "@/components/BusinessCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Building2, Utensils, Scissors, Wrench, ShoppingBag, Laptop, Stethoscope, Brush } from "lucide-react";

const FEATURED_BUSINESSES = [
  {
    id: "1",
    name: "The Cozy Corner Café",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    category: "Coffee & Tea",
    rating: 4.5,
    reviewCount: 127,
    location: "Downtown",
  },
  {
    id: "2",
    name: "Fresh Fusion Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    category: "Restaurant",
    rating: 4.8,
    reviewCount: 89,
    location: "Midtown",
  },
  {
    id: "3",
    name: "Zen Spa & Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    category: "Spa",
    rating: 4.7,
    reviewCount: 156,
    location: "Westside",
  },
];

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    title: "Discover Local Gems",
    description: "Find the best local businesses in your area",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Share Your Experience",
    description: "Help others by sharing your honest reviews",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    title: "Connect with Businesses",
    description: "Directly engage with your favorite local spots",
  },
];

const CATEGORIES = [
  { name: "Real Estate", icon: Building2, count: 48 },
  { name: "Restaurants", icon: Utensils, count: 92 },
  { name: "Beauty & Spa", icon: Scissors, count: 54 },
  { name: "Home Services", icon: Wrench, count: 76 },
  { name: "Shopping", icon: ShoppingBag, count: 89 },
  { name: "Technology", icon: Laptop, count: 42 },
  { name: "Healthcare", icon: Stethoscope, count: 36 },
  { name: "Art & Design", icon: Brush, count: 28 },
];

const Index = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Slideshow */}
      <section className="relative">
        <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent>
            {HERO_SLIDES.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[600px] w-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in">
                      {slide.description}
                    </p>
                    <div className="animate-fade-in">
                      <SearchBar />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore some of the most searched categories across our platform
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center cursor-pointer border border-gray-100 hover:border-primary hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                    <Icon size={32} />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} Listings</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Businesses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover top-rated local businesses and services in your area
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_BUSINESSES.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </div>
      </section>

      {/* Book Your Space */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to List Your Business?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of businesses that trust us to connect them with customers
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              List Your Business
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
