import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "@/pages/Index";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyBookings from "@/pages/dashboard/MyBookings";
import AddListing from "@/pages/dashboard/AddListing";
import Listings from "@/pages/dashboard/Listings";
import Messages from "@/pages/dashboard/Messages";
import Wallet from "@/pages/dashboard/Wallet";
import SavedListings from "@/pages/dashboard/SavedListings";
import Profile from "@/pages/dashboard/Profile";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import NotFound from "@/pages/404";
import AuthorDetail from "@/pages/AuthorDetail";
import ExploreListings from "@/pages/ExploreListings";
import BusinessDetails from "@/pages/BusinessDetails";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AboutUs from "@/pages/AboutUs";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/my-bookings" element={<MyBookings />} />
      <Route path="/dashboard/add-listing" element={<AddListing />} />
      <Route path="/dashboard/listings" element={<Listings />} />
      <Route path="/dashboard/messages" element={<Messages />} />
      <Route path="/dashboard/wallet" element={<Wallet />} />
      <Route path="/dashboard/saved-listings" element={<SavedListings />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/change-password" element={<ChangePassword />} />
      <Route path="/author/:username" element={<AuthorDetail />} />
      <Route path="/explore-listings" element={<ExploreListings />} />
      <Route path="/business/:id" element={<BusinessDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;