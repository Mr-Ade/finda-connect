
import { BusinessOwnerDashboard } from "@/pages/business-owner/Dashboard";
import { BusinessAnalytics } from "@/pages/business-owner/Analytics";
import { BusinessListings } from "@/pages/business-owner/Listings";
import { BusinessReviews } from "@/pages/business-owner/Reviews";
import { BusinessSettings } from "@/pages/business-owner/Settings";

export const businessOwnerRoutes = [
  { path: "/business-owner", element: <BusinessOwnerDashboard /> },
  { path: "/business-owner/analytics", element: <BusinessAnalytics /> },
  { path: "/business-owner/listings", element: <BusinessListings /> },
  { path: "/business-owner/reviews", element: <BusinessReviews /> },
  { path: "/business-owner/settings", element: <BusinessSettings /> },
];
