import { Business } from "@/types/business";
import { BusinessSidebar } from "./BusinessSidebar";

interface SidebarWrapperProps {
  business: Business;
}

export const SidebarWrapper = ({ business }: SidebarWrapperProps) => {
  // Add debug logs
  console.log("SidebarWrapper - Received business data:", business);

  return (
    <div className="lg:col-span-1 space-y-8">
      <BusinessSidebar business={{
        id: business.id,
        name: business.name,
        description: business.description || '',
        address: business.address || '',
        city: business.city || '',
        state: business.state || '',
        zip_code: business.zip_code || '',
        phone: business.phone || '',
        website: business.website || '',
        email: business.email || '',
        category: business.category,
        delivery_info: business.delivery_info,
        owner: business.owner ? {
          username: business.owner.username || '',
          avatar_url: business.owner.avatar_url || '',
          full_name: business.owner.full_name || ''
        } : undefined
      }} />
    </div>
  );
};