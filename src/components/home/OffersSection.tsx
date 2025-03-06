
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { OfferGrid } from "./offers/OfferGrid";
import { OfferStats } from "./offers/OfferStats";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discount_amount: number;
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
          <OfferStats isLoading={true} />
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
        <OfferGrid offers={offers} onOfferClick={handleOfferClick} />
      </div>
    </section>
  );
};
