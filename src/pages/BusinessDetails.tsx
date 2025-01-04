import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Check, MapPin, Phone, Globe, Mail } from "lucide-react";
import { BusinessGallery } from "@/components/business/BusinessGallery";
import { BusinessInfo } from "@/components/business/BusinessInfo";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { FAQ } from "@/components/business/FAQ";
import { ReviewSection } from "@/components/business/ReviewSection";
import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import type { Business } from "@/types/business";

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
            id,
            rating,
            comment,
            created_at,
            profiles:user_id(username, avatar_url),
            review_responses(id, response_text, created_at),
            review_photos(id, photo_url)
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
      return data as unknown as Business;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  const avgRating = business.reviews?.reduce((acc, review) => acc + review.rating, 0) / (business.reviews?.length || 1);

  return (
    <div>
      {/* Featured Gallery Section */}
      <div className="featured-slick relative">
        <BusinessGallery photos={business.business_photos || []} />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-white rounded-lg p-2">
              <img src={business.owner?.avatar_url || "/placeholder.svg"} alt={business.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < avgRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
                <span>{business.reviews?.length || 0} Reviews</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                  <Check className="w-4 h-4 inline-block mr-1" />
                  Claimed
                </span>
                <span>{business.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-400">Open</span>
                <span>11:00 AM - 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="bg-gray-50 py-5 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <BusinessInfo business={business} isOwner={false} />
              <MenuItems businessId={business.id} />
              <Amenities amenities={[
                { name: "Health Score 8.7/10", available: true },
                { name: "Offers Delivery", available: true },
                { name: "Offers Takeout", available: true },
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
                reviews={business.reviews?.map(review => ({
                  ...review,
                  profiles: {
                    username: review.profiles?.username || "Anonymous",
                    avatar_url: review.profiles?.avatar_url || "/placeholder.svg"
                  }
                })) || []}
              />
            </div>
            
            <div className="lg:col-span-4">
              <BusinessSidebar business={business} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDetails;
