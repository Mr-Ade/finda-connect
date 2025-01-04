import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/profile/dashboard/DashboardStats";
import { DashboardChart } from "@/components/profile/dashboard/DashboardChart";
import { RecentActivities } from "@/components/profile/dashboard/RecentActivities";
import { InvoicesList } from "@/components/profile/dashboard/InvoicesList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Alert */}
        <Alert className="bg-primary/10 border-none text-primary mb-6">
          <AlertDescription className="flex items-center justify-between">
            <span>Your listing <a href="#" className="font-semibold hover:underline">Wedding Willa Resort</a> has been approved!</span>
            <button className="text-primary hover:opacity-75">
              <X className="h-4 w-4" />
            </button>
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DashboardChart />
          </div>
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Followers</h3>
              {/* Followers list will be implemented later */}
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivities />
          <InvoicesList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;