import type { Database } from "@/integrations/supabase/types";
import { ListingCard } from "./ListingCard";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

interface ListingsGridProps {
  businesses: Business[];
  showAll: boolean;
}

export const ListingsGrid = ({ businesses, showAll }: ListingsGridProps) => {
  const displayedBusinesses = showAll ? businesses : businesses.slice(0, 8);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedBusinesses.map((business) => (
        <ListingCard key={business.id} business={business} />
      ))}
    </div>
  );
};