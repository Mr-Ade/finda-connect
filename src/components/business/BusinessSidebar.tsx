import { cn } from "@/lib/utils";
import { RestaurantSection } from "./sidebar/RestaurantSection";
import { AccommodationSection } from "./sidebar/AccommodationSection";
import { ServiceSection } from "./sidebar/ServiceSection";
import { BusinessOwnerProfile } from "./sidebar/BusinessOwnerProfile";
import { ContactDetails } from "./sidebar/ContactDetails";
import { ActionButtons } from "./sidebar/ActionButtons";

interface BusinessSidebarProps {
  business: {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    phone?: string;
    website?: string;
    email?: string;
    category: string;
    delivery_info?: {
      available: boolean;
      minimum_order?: number;
      fee?: number;
      estimated_time?: string;
    };
    owner?: {
      username: string;
      avatar_url: string;
      full_name: string;
    };
  };
}

export const BusinessSidebar = ({ business }: BusinessSidebarProps) => {
  const isRestaurant = business.category?.toLowerCase().includes('restaurant') || 
                      business.category?.toLowerCase().includes('food');
  const isAccommodation = business.category?.toLowerCase().includes('hotel') || 
                         business.category?.toLowerCase().includes('apartment');
  const isService = business.category?.toLowerCase().includes('service') ||
                   business.category?.toLowerCase().includes('salon');

  return (
    <div className="space-y-4">
      {isRestaurant && <RestaurantSection delivery_info={business.delivery_info} />}
      {isAccommodation && <AccommodationSection />}
      {isService && <ServiceSection />}

      {business.owner && (
        <BusinessOwnerProfile 
          owner={business.owner} 
          city={business.city}
        />
      )}

      <ContactDetails
        website={business.website}
        email={business.email}
        phone={business.phone}
        address={business.address}
        city={business.city}
        state={business.state}
        zip_code={business.zip_code}
      />

      <ActionButtons />
    </div>
  );
};