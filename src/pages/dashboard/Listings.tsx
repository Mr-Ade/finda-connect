import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ListingsHeader } from "@/components/listings/ListingsHeader";
import { ListingsContent } from "@/components/listings/ListingsContent";

const Listings = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <DashboardLayout>
      <ListingsHeader 
        showMap={showMap} 
        onToggleMap={() => setShowMap(!showMap)} 
      />
      <ListingsContent />
    </DashboardLayout>
  );
};

export default Listings;