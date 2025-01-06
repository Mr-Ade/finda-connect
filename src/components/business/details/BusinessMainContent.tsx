import type { Business } from "@/types/business";
import { BusinessInfo } from "@/components/business/BusinessInfo";
import { MenuItems } from "@/components/business/MenuItems";
import { ReviewSection } from "@/components/business/ReviewSection";
import { FAQ } from "@/components/business/FAQ";
import { Amenities } from "@/components/business/Amenities";

interface BusinessMainContentProps {
  business: Business;
}

export const BusinessMainContent = ({ business }: BusinessMainContentProps) => {
  const amenities = [
    { name: "Free WiFi", available: true },
    { name: "Parking", available: true },
    { name: "Pet Friendly", available: false },
    { name: "Air Conditioning", available: true },
  ];

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We are open Monday through Friday from 9 AM to 6 PM, and Saturdays from 10 AM to 4 PM."
    },
    {
      question: "Do you accept credit cards?",
      answer: "Yes, we accept all major credit cards including Visa, MasterCard, and American Express."
    }
  ];

  return (
    <div className="space-y-6">
      <BusinessInfo business={business} isOwner={false} />
      
      <div className="mb-4">
        <MenuItems businessId={business.id} />
      </div>
      
      <div className="mb-4">
        <Amenities amenities={amenities} />
      </div>
      
      <div className="mb-4">
        <FAQ faqs={faqs} />
      </div>
      
      <ReviewSection 
        businessId={business.id}
        reviews={business.reviews || []}
        isOwner={business.owner_id === business.id}
      />
    </div>
  );
};