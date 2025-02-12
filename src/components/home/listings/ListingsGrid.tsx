
import type { Business } from "@/types/business";
import { ListingCard } from "./ListingCard";

interface ListingsGridProps {
  businesses: Business[];
  showAll: boolean;
}

export const ListingsGrid = ({ businesses, showAll }: ListingsGridProps) => {
  const displayedBusinesses = showAll ? businesses : businesses.slice(0, 8);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedBusinesses.map((business) => {
        // Transform the data to match our Business type
        const transformedBusiness: Business = {
          ...business,
          business_hours: business.business_hours as Business['business_hours'],
          amenities: business.amenities as Business['amenities'],
          faqs: business.faqs as Business['faqs'],
          delivery_info: business.delivery_info as Business['delivery_info'],
          social_links: business.social_links as Business['social_links']
        };
        return <ListingCard key={business.id} business={transformedBusiness} />;
      })}
    </div>
  );
};
