import { BusinessInfo } from "@/components/business/BusinessInfo";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { FAQ } from "@/components/business/FAQ";
import { ReviewSection } from "@/components/business/ReviewSection";
import { RecentlyViewedListings } from "@/components/business/RecentlyViewedListings";
import type { Business } from "@/types/business";

interface BusinessMainContentProps {
  business: Business;
}

export const BusinessMainContent = ({ business }: BusinessMainContentProps) => {
  return (
    <>
      <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <BusinessInfo 
          business={{
            id: business.id,
            name: business.name,
            description: business.description || "", // Provide default empty string
            address: business.address,
            city: business.city,
            state: business.state,
            zip_code: business.zip_code,
            phone: business.phone,
            website: business.website,
            email: business.email,
            owner_id: business.owner_id
          }} 
          isOwner={false} 
        />
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
          reviews={business.reviews?.map(review => ({
            ...review,
            profiles: {
              username: review.profiles?.username || "Anonymous",
              avatar_url: review.profiles?.avatar_url || "/placeholder.svg"
            }
          })) || []}
        />
      </div>
      <div className="w-full -mx-4">
        <RecentlyViewedListings />
      </div>
    </>
  );
};