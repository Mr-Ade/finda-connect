import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { UserDashboard } from "@/components/profile/dashboard/UserDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout loading={loading}>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <UserDashboard />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileDetails />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Profile;