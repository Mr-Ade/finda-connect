import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import { RecentlyViewedListings } from "@/components/business/RecentlyViewedListings";
import type { Business } from "@/types/business";

interface BusinessRightSidebarProps {
  business: Business;
}

export const BusinessRightSidebar = ({ business }: BusinessRightSidebarProps) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
      <BusinessSidebar business={business} />
      <div className="mt-4">
        <RecentlyViewedListings />
      </div>
    </div>
  );
};