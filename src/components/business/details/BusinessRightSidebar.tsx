import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import type { Business } from "@/types/business";

interface BusinessRightSidebarProps {
  business: Business;
}

export const BusinessRightSidebar = ({ business }: BusinessRightSidebarProps) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
      <BusinessSidebar 
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
          owner: business.owner ? {
            username: business.owner.username || "Anonymous",
            avatar_url: business.owner.avatar_url || "/placeholder.svg",
            full_name: business.owner.full_name || "Anonymous"
          } : undefined
        }} 
      />
    </div>
  );
};