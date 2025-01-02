import React from "react";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { WalletStats } from "@/components/profile/dashboard/WalletStats";
import { WalletChart } from "@/components/profile/dashboard/WalletChart";
import { RecentActivities } from "@/components/profile/dashboard/RecentActivities";
import { InvoicesList } from "@/components/profile/dashboard/InvoicesList";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
            <div className="mb-6">
              <h1 className="text-2xl font-semibold mb-2">Wallet</h1>
              <Breadcrumb 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Dashboard", href: "/profile" },
                  { label: "Wallet", href: "/dashboard/wallet", active: true }
                ]} 
              />
            </div>

            {/* Alert */}
            <div className="mb-6">
              <div className="bg-gray-900 text-white p-4 rounded-lg flex items-center justify-between">
                <p className="font-medium">
                  Your listing <a href="#" className="text-green-400">Wedding Willa Resort</a> has been approved!
                </p>
                <button className="text-white hover:text-gray-200">×</button>
              </div>
            </div>

            {/* Stats */}
            <WalletStats />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-2">
                <WalletChart />
              </div>
              <div className="md:col-span-1">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Followers</h3>
                  {/* Followers list will be implemented later */}
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentActivities />
              <InvoicesList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;