import { HERO_IMAGES } from "./hero-constants";

interface HeroBackgroundProps {
  currentImageIndex: number;
}

export const HeroBackground = ({ currentImageIndex }: HeroBackgroundProps) => {
  return (
    <>
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${HERO_IMAGES[currentImageIndex].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Image Attribution */}
      <div className="absolute bottom-2 right-4 text-white/50 text-sm">
        Photo by {HERO_IMAGES[currentImageIndex].credit}
      </div>
    </>
  );
};