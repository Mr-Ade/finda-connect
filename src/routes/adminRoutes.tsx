
import AdminDashboard from "@/pages/dashboard/admin/Dashboard";
import Users from "@/pages/dashboard/admin/Users";
import Listings from "@/pages/dashboard/admin/Listings";
import Reviews from "@/pages/dashboard/admin/Reviews";
import EditListing from "@/pages/dashboard/admin/EditListing";
import Settings from "@/pages/dashboard/admin/Settings";
import CMSPage from "@/pages/dashboard/admin/cms/CMSPage";
import KYCReviews from "@/pages/dashboard/admin/KYCReviews";
import DataExporter from "@/pages/dashboard/admin/DataExporter";

export const adminRoutes = [
  { path: "/dashboard/admin", element: <AdminDashboard /> },
  { path: "/dashboard/admin/users", element: <Users /> },
  { path: "/dashboard/admin/listings", element: <Listings /> },
  { path: "/dashboard/admin/reviews", element: <Reviews /> },
  { path: "/dashboard/admin/edit-listing/:id", element: <EditListing /> },
  { path: "/dashboard/admin/settings", element: <Settings /> },
  { path: "/dashboard/admin/cms/:id", element: <CMSPage /> },
  { path: "/dashboard/admin/kyc-reviews", element: <KYCReviews /> },
  { path: "/dashboard/admin/data-exporter", element: <DataExporter /> },
];
