import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import BusinessDetails from "@/pages/BusinessDetails";
import JobListing from "@/pages/JobListing";
import Login from "@/pages/Login";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import AboutUs from "@/pages/AboutUs";
import Listings from "@/pages/dashboard/Listings";
import AddListing from "@/pages/dashboard/AddListing";
import Appointments from "@/pages/dashboard/Appointments";
import Bookmarks from "@/pages/dashboard/Bookmarks";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import Messages from "@/pages/dashboard/Messages";
import Wallet from "@/pages/dashboard/Wallet";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/business/:id" element={<BusinessDetails />} />
      <Route path="/job/:id" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/dashboard/listings" element={<Listings />} />
      <Route path="/dashboard/add-listing" element={<AddListing />} />
      <Route path="/dashboard/appointments" element={<Appointments />} />
      <Route path="/dashboard/bookmarks" element={<Bookmarks />} />
      <Route path="/dashboard/change-password" element={<ChangePassword />} />
      <Route path="/dashboard/messages" element={<Messages />} />
      <Route path="/dashboard/wallet" element={<Wallet />} />
    </RouterRoutes>
  );
};

export default Routes;