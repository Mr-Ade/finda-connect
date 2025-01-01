import { Card } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

const Wallet = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="md:col-span-3">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Wallet</h2>
              <p className="text-gray-500">Coming soon! Payment and wallet functionality will be available in a future update.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;