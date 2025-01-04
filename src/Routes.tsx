import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "@/pages/Index";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyBookings from "@/pages/dashboard/MyBookings";
import AddListing from "@/pages/dashboard/AddListing";
import Listings from "@/pages/dashboard/Listings";
import Messages from "@/pages/dashboard/Messages";
import Wallet from "@/pages/dashboard/Wallet";
import NotFound from "@/pages/404";
import AuthorDetail from "@/pages/AuthorDetail";
import ExploreListings from "@/pages/ExploreListings";
import BusinessDetails from "@/pages/BusinessDetails";
import Profile from "@/pages/Profile";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import Bookmarks from "@/pages/dashboard/Bookmarks";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/bookings" element={<MyBookings />} />
      <Route path="/dashboard/add-listing" element={<AddListing />} />
      <Route path="/dashboard/listings" element={<Listings />} />
      <Route path="/dashboard/messages" element={<Messages />} />
      <Route path="/dashboard/wallet" element={<Wallet />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/change-password" element={<ChangePassword />} />
      <Route path="/dashboard/bookmarks" element={<Bookmarks />} />
      <Route path="/author/:username" element={<AuthorDetail />} />
      <Route path="/explore-listings" element={<ExploreListings />} />
      <Route path="/business/:id" element={<BusinessDetails />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;