
import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";

export const BusinessSettings = () => {
  return (
    <BusinessOwnerLayout>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground mt-2">
        Manage your business settings and preferences here.
      </p>
    </BusinessOwnerLayout>
  );
};
