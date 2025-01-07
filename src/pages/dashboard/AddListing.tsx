import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { BusinessFormProvider } from "@/contexts/BusinessFormContext";
import { AddListingForm } from "@/components/listings/forms/AddListingForm";

const AddListing = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Add Listing</h1>
        <nav className="text-sm breadcrumbs">
          <ol className="flex gap-2 text-muted-foreground">
            <li><a href="/">Home</a></li>
            <li>•</li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li>•</li>
            <li className="text-primary">Add Listing</li>
          </ol>
        </nav>
      </div>

      <BusinessFormProvider>
        <AddListingForm />
      </BusinessFormProvider>
    </DashboardLayout>
  );
};

export default AddListing;