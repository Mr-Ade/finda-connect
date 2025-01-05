import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardStats } from "@/components/profile/dashboard/DashboardStats";
import { DashboardChart } from "@/components/profile/dashboard/DashboardChart";
import { FollowersList } from "@/components/profile/dashboard/FollowersList";
import { RecentActivities } from "@/components/profile/dashboard/RecentActivities";
import { InvoicesList } from "@/components/profile/dashboard/InvoicesList";
import { X } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-medium">Hello, Darnell Johns</h1>
          <nav className="text-sm breadcrumbs">
            <ul>
              <li className="text-muted"><a href="/">Home</a></li>
              <li><a href="#" className="text-primary">Dashboard</a></li>
            </ul>
          </nav>
        </div>

        {/* Alert */}
        <Alert variant="default" className="bg-primary/10 text-primary">
          <AlertDescription className="flex justify-between items-center">
            <p className="font-medium">
              Your listing <a href="#" className="text-success">Wedding Willa Resort</a> has been approved!
            </p>
            <button className="text-primary hover:opacity-75">
              <X className="h-4 w-4" />
            </button>
          </AlertDescription>
        </Alert>

        {/* Stats */}
        <DashboardStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DashboardChart />
          </div>
          <div className="md:col-span-1">
            <FollowersList />
          </div>
        </div>

        {/* Activities & Invoices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivities />
          <InvoicesList />
        </div>

        {/* Footer */}
        <div className="py-3 text-sm text-gray-500">
          © 2024 Finda. All rights reserved.
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;