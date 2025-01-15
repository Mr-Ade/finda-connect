import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/dashboard/Profile";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import Listings from "@/pages/dashboard/Listings";
import AddListing from "@/pages/dashboard/AddListing";
import SavedListings from "@/pages/dashboard/SavedListings";
import Messages from "@/pages/dashboard/Messages";
import Bookmarks from "@/pages/dashboard/Bookmarks";
import MyBookings from "@/pages/dashboard/MyBookings";
import Appointments from "@/pages/dashboard/Appointments";
import Wallet from "@/pages/dashboard/Wallet";

export const dashboardRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/profile", element: <Profile /> },
  { path: "/dashboard/change-password", element: <ChangePassword /> },
  { path: "/dashboard/listings", element: <Listings /> },
  { path: "/dashboard/add-listing", element: <AddListing /> },
  { path: "/dashboard/saved-listings", element: <SavedListings /> },
  { path: "/dashboard/messages", element: <Messages /> },
  { path: "/dashboard/bookmarks", element: <Bookmarks /> },
  { path: "/dashboard/my-bookings", element: <MyBookings /> },
  { path: "/dashboard/appointments", element: <Appointments /> },
  { path: "/dashboard/wallet", element: <Wallet /> },
];