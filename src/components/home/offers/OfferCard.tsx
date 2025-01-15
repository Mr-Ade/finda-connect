import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discount_amount: number;
  background_image: string;
}

interface OfferCardProps {
  offer: Offer;
  onOfferClick: (offerId: string) => void;
}

export const OfferCard = ({ offer, onOfferClick }: OfferCardProps) => {
  return (
    <div 
      key={offer.id}
      className="relative overflow-hidden rounded-lg bg-primary text-white p-8"
    >
      <div className="relative z-10">
        <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-4">
          {offer.title}
        </span>
        <h4 className="text-2xl font-bold mb-4">
          {offer.discount_amount}% Off on {offer.subtitle}
        </h4>
        <Button 
          variant="secondary" 
          size="lg" 
          className="bg-white text-primary hover:bg-gray-100"
          onClick={() => onOfferClick(offer.id)}
        >
          View Offer
        </Button>
      </div>
      <div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          backgroundImage: `url(${offer.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </div>
  );
};