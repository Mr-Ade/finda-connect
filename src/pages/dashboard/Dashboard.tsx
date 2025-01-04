import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardStats } from "@/components/profile/dashboard/DashboardStats";
import { RecentActivities } from "@/components/profile/dashboard/RecentActivities";
import { InvoicesList } from "@/components/profile/dashboard/InvoicesList";
import { DashboardChart } from "@/components/profile/dashboard/DashboardChart";
import { FollowersList } from "@/components/profile/dashboard/FollowersList";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Alert variant="info" className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <p>Your listing <a href="#" className="text-success font-medium">Wedding Willa Resort</a> has been approved!</p>
        </Alert>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-12">
          {/* Area Chart */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold mb-4">View Chart</h4>
              <DashboardChart />
            </div>
          </div>

          {/* Followers List */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold mb-4">Followers</h4>
              <FollowersList />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivities />
          <InvoicesList />
        </div>

        <footer className="py-3 text-sm text-gray-500">
          © 2024 Lovable. All rights reserved.
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;