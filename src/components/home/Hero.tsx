import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SearchBar } from "@/components/SearchBar";

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

export const Hero = () => {
  return (
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
  );
};