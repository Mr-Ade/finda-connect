import { useLocation } from "@/contexts/LocationContext";

export const HeroContent = () => {
  const { city } = useLocation();

  return (
    <div className="text-left">
      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
        Find Your Perfect Place in{" "}
        <span className="text-primary-foreground">{city || "Nigeria"}</span>
      </h1>
      <p className="text-lg text-white/90 mb-8 animate-fade-in delay-100">
        Explore wonderful places to stay, salon, shopping or visit local areas.
      </p>
    </div>
  );
};