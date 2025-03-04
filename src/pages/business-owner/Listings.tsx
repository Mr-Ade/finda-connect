
import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";

export const BusinessListings = () => {
  return (
    <BusinessOwnerLayout>
      <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
      <p className="text-muted-foreground mt-2">
        Manage your business listings here.
      </p>
    </BusinessOwnerLayout>
  );
};
