import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardStats } from "@/components/profile/dashboard/DashboardStats";
import { RecentActivities } from "@/components/profile/dashboard/RecentActivities";
import { BookmarkedBusinesses } from "@/components/profile/dashboard/BookmarkedBusinesses";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardStats />
        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivities />
          <BookmarkedBusinesses />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;