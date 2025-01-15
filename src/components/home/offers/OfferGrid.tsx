import { OfferCard } from "./OfferCard";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discount_amount: number;
  background_image: string;
}

interface OfferGridProps {
  offers: Offer[];
  onOfferClick: (offerId: string) => void;
}

export const OfferGrid = ({ offers, onOfferClick }: OfferGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {offers.map((offer) => (
        <OfferCard 
          key={offer.id} 
          offer={offer} 
          onOfferClick={onOfferClick}
        />
      ))}
    </div>
  );
};