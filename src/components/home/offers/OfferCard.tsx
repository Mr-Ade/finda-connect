
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      onOfferClick(offer.id);
    } catch (error) {
      console.error('Error tracking offer click:', error);
      toast({
        title: "Error",
        description: "Failed to track offer click",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${offer.background_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '150px'
      }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        <div>
          <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
          <p className="text-lg opacity-90">{offer.subtitle}</p>
        </div>
        <div className="text-3xl font-bold">
          {offer.discount_amount}% OFF
        </div>
      </div>
    </div>
  );
};
