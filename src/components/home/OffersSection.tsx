import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discount_amount: number;
  discount_type: 'percentage' | 'fixed';
  category: string;
  background_image: string;
  start_date: string;
  end_date: string;
}

export const OffersSection = () => {
  const { toast } = useToast();

  const { data: offers, isLoading } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      console.log('Fetching offers...');
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .gte('end_date', new Date().toISOString());

      if (error) {
        console.error('Error fetching offers:', error);
        throw error;
      }

      console.log('Fetched offers:', data);
      return data as Offer[];
    },
  });

  const handleOfferClick = async (offerId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { error } = await supabase
          .from('offer_clicks')
          .insert({
            offer_id: offerId,
            user_id: session.user.id
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error tracking offer click:', error);
    }
  };

  if (isLoading) {
    return (
      <section className="pt-4 pb-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!offers?.length) {
    return null;
  }

  return (
    <section className="pt-4 pb-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) => (
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
                  onClick={() => handleOfferClick(offer.id)}
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
          ))}
        </div>
      </div>
    </section>
  );
};