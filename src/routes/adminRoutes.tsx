import AdminDashboard from "@/pages/dashboard/admin/Dashboard";
import AdminListings from "@/pages/dashboard/admin/Listings";
import AdminUsers from "@/pages/dashboard/admin/Users";
import AdminSettings from "@/pages/dashboard/admin/Settings";
import AdminAnalytics from "@/pages/dashboard/admin/Analytics";
import AuditLogs from "@/pages/dashboard/admin/AuditLogs";
import AdminEditListing from "@/pages/dashboard/admin/EditListing";
import SuperAdminDashboard from "@/pages/dashboard/admin/SuperAdminDashboard";
import Reviews from "@/pages/dashboard/admin/Reviews";

export const adminRoutes = [
  { path: "/dashboard/admin", element: <AdminDashboard /> },
  { path: "/dashboard/admin/listings", element: <AdminListings /> },
  { path: "/dashboard/admin/listings/:id/edit", element: <AdminEditListing /> },
  { path: "/dashboard/admin/users", element: <AdminUsers /> },
  { path: "/dashboard/admin/reviews", element: <Reviews /> },
  { path: "/dashboard/admin/settings", element: <AdminSettings /> },
  { path: "/dashboard/admin/analytics", element: <AdminAnalytics /> },
  { path: "/dashboard/admin/audit-logs", element: <AuditLogs /> },
  { path: "/dashboard/admin/super", element: <SuperAdminDashboard /> },
];