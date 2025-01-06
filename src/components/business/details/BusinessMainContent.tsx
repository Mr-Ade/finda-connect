import { BusinessInfo } from "@/components/business/BusinessInfo";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { FAQ } from "@/components/business/FAQ";
import { ReviewSection } from "@/components/business/ReviewSection";
import { BusinessHours } from "@/components/business/BusinessHours";
import { Map } from "@/components/Map";
import { RecentlyViewedListings } from "@/components/business/RecentlyViewedListings";
import type { Business } from "@/types/business";

interface BusinessMainContentProps {
  business: Business;
}

export const BusinessMainContent = ({ business }: BusinessMainContentProps) => {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <BusinessInfo 
        business={{
          id: business.id,
          name: business.name,
          description: business.description || "",
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

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuItems businessId={business.id} />
      </div>

      {/* Amenities Grid */}
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
      ]} />

      {/* FAQ Section */}
      <FAQ faqs={[
        {
          question: "Can I get GoodUP listing for free?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
          question: "How to Permanently Delete Files From Windows?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
          question: "For GoodUp which license is better for business purpose?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        }
      ]} />

      {/* Location & Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[400px] rounded-lg overflow-hidden">
          <Map 
            center={{ 
              lat: business.latitude || 0, 
              lng: business.longitude || 0 
            }}
            markers={[{ 
              lat: business.latitude || 0, 
              lng: business.longitude || 0 
            }]}
          />
        </div>
        <BusinessHours businessId={business.id} />
      </div>

      {/* Reviews Section */}
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

      {/* Recently Viewed Listings */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recently Viewed Listings</h3>
        <RecentlyViewedListings />
      </div>
    </div>
  );
};