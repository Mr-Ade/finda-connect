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

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Slideshow */}
      <section className="relative">
        <Carousel className="w-full" opts={{ loop: true, duration: 5000, align: "start", autoplay: true }}>
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

      {/* Featured Businesses */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_BUSINESSES.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Restaurants", "Shopping", "Beauty & Spa", "Home Services"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
                >
                  <h3 className="font-semibold">{category}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;