import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/dashboard/Profile";
import Listings from "@/pages/dashboard/Listings";
import Bookmarks from "@/pages/dashboard/Bookmarks";
import SavedListings from "@/pages/dashboard/SavedListings";
import Messages from "@/pages/dashboard/Messages";
import Appointments from "@/pages/dashboard/Appointments";
import MyBookings from "@/pages/dashboard/MyBookings";
import Wallet from "@/pages/dashboard/Wallet";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import AddListing from "@/pages/dashboard/AddListing";
import EditListing from "@/pages/dashboard/EditListing"; // Add this import

export const dashboardRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/profile", element: <Profile /> },
  { path: "/dashboard/listings", element: <Listings /> },
  { path: "/dashboard/add-listing", element: <AddListing /> },
  { path: "/dashboard/listings/edit/:id", element: <EditListing /> }, // Add this route
  { path: "/dashboard/bookmarks", element: <Bookmarks /> },
  { path: "/dashboard/saved", element: <SavedListings /> },
  { path: "/dashboard/messages", element: <Messages /> },
  { path: "/dashboard/appointments", element: <Appointments /> },
  { path: "/dashboard/bookings", element: <MyBookings /> },
  { path: "/dashboard/wallet", element: <Wallet /> },
  { path: "/dashboard/change-password", element: <ChangePassword /> },
];