import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { BusinessGallery } from "@/components/business/BusinessGallery";
import { BusinessInfo } from "@/components/business/BusinessInfo";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { FAQ } from "@/components/business/FAQ";
import { ReviewSection } from "@/components/business/ReviewSection";
import { BusinessHours } from "@/components/business/BusinessHours";
import { BusinessSidebar } from "@/components/business/BusinessSidebar";

const BusinessDetails = () => {
  const { id } = useParams();

  const { data: business, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos(*),
          menu_items(*),
          business_hours(*),
          reviews(
            *,
            profiles:user_id(username, avatar_url),
            review_responses(*),
            review_photos(*)
          ),
          owner:owner_id(
            username,
            avatar_url,
            full_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div>
      <BusinessHeader business={business} />
      <BusinessGallery photos={business.business_photos} />

      <section className="gray py-5 position-relative">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <BusinessInfo business={business} isOwner={false} />
              <MenuItems businessId={business.id} />
              <Amenities amenities={[
                { name: "Health Score 8.7/10", available: true },
                { name: "Offers Delivery", available: true },
                { name: "Reservations", available: true },
                { name: "Staff wears masks", available: true },
                { name: "Vegan Options", available: true },
                { name: "Vegetarian Options", available: true },
                { name: "Accepts Credit Cards", available: true },
                { name: "Casual", available: true },
                { name: "Moderate Noise", available: true },
                { name: "Offers Catering", available: true },
                { name: "Good for Groups", available: true },
                { name: "Good For Kids", available: true },
                { name: "Good for Breakfast", available: true },
                { name: "Brunch, Lunch, Dinner", available: true },
                { name: "Private Lot Parking", available: true },
                { name: "Waiter Service", available: true },
                { name: "Free Wi-Fi", available: true },
                { name: "Beer & Wine", available: true },
                { name: "Drive-Thru", available: true },
                { name: "Wheelchair Accessible", available: false },
                { name: "TV Services", available: false },
                { name: "Outdoor Seating", available: false },
                { name: "Happy Hour", available: false },
                { name: "Pets Allow", available: false }
              ]} />
              <FAQ faqs={[
                {
                  question: "Can I get GoodUP listing for free?",
                  answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                },
                {
                  question: "How to Permanently Delete Files From Windows?", 
                  answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                  question: "For GoodUp which license is better for business purpose?",
                  answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                }
              ]} />
              <ReviewSection 
                businessId={business.id} 
                isOwner={false} 
                reviews={business.reviews} 
              />
              <BusinessHours businessId={business.id} />
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
              <BusinessSidebar business={business} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDetails;