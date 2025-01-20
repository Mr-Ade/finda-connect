import { AdminLayout } from "@/components/layouts/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { CMSPageList } from "@/components/admin/cms/CMSPageList";
import { CMSPage } from "@/pages/dashboard/admin/cms/CMSPage";

export const adminRoutes = [
  {
    path: "/dashboard/admin",
    element: (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    ),
  },
  {
    path: "/dashboard/admin/cms",
    element: (
      <AdminLayout requireSuperAdmin>
        <CMSPageList />
      </AdminLayout>
    ),
  },
  {
    path: "/dashboard/admin/cms/:id",
    element: (
      <AdminLayout requireSuperAdmin>
        <CMSPage />
      </AdminLayout>
    ),
  },
];