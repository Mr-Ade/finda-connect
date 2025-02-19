import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { BusinessAnalytics } from "@/components/profile/dashboard/BusinessAnalytics";
import { BusinessListings } from "@/components/profile/dashboard/BusinessListings";
import { CustomerInquiries } from "@/components/profile/dashboard/CustomerInquiries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BusinessOwnerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Business Dashboard</h1>
        </div>

        {/* Dashboard Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <BusinessAnalytics />
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <BusinessListings />
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <CustomerInquiries />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BusinessOwnerDashboard;