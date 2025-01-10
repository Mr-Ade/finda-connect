import { Route, Routes as RouterRoutes } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/404";
import AuthorDetail from "@/pages/AuthorDetail";
import ExploreListings from "@/pages/ExploreListings";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import OurMission from "@/pages/OurMission";
import OurTeam from "@/pages/OurTeam";
import Privacy from "@/pages/Privacy";
import Security from "@/pages/Security";
import WhoWeAre from "@/pages/WhoWeAre";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import BrowseAuthors from "@/pages/BrowseAuthors";
import BrowseCategories from "@/pages/BrowseCategories";
import Checkout from "@/pages/Checkout";
import JobListing from "@/pages/JobListing";
import Packages from "@/pages/Packages";
import PaymentLinks from "@/pages/PaymentLinks";
import Pricing from "@/pages/Pricing";
import SavedPlaces from "@/pages/SavedPlaces";
import Shortlisted from "@/pages/Shortlisted";
import SiteMap from "@/pages/SiteMap";
import SubmitListing from "@/pages/SubmitListing";
import BusinessDetail from "@/pages/BusinessDetail";

// Dashboard
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

// Admin
import AdminDashboard from "@/pages/dashboard/admin/Dashboard";
import AdminListings from "@/pages/dashboard/admin/Listings";
import AdminUsers from "@/pages/dashboard/admin/Users";
import AdminSettings from "@/pages/dashboard/admin/Settings";
import AdminAnalytics from "@/pages/dashboard/admin/Analytics";
import AuditLogs from "@/pages/dashboard/admin/AuditLogs";

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/change-password" element={<ChangePassword />} />
      <Route path="/dashboard/listings" element={<Listings />} />
      <Route path="/dashboard/add-listing" element={<AddListing />} />
      <Route path="/dashboard/saved-listings" element={<SavedListings />} />
      <Route path="/dashboard/messages" element={<Messages />} />
      <Route path="/dashboard/bookmarks" element={<Bookmarks />} />
      <Route path="/dashboard/my-bookings" element={<MyBookings />} />
      <Route path="/dashboard/appointments" element={<Appointments />} />
      <Route path="/dashboard/wallet" element={<Wallet />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/admin/listings" element={<AdminListings />} />
      <Route path="/dashboard/admin/users" element={<AdminUsers />} />
      <Route path="/dashboard/admin/settings" element={<AdminSettings />} />
      <Route path="/dashboard/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/dashboard/admin/audit-logs" element={<AuditLogs />} />
      <Route path="/author/:username" element={<AuthorDetail />} />
      <Route path="/explore-listings" element={<ExploreListings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/our-mission" element={<OurMission />} />
      <Route path="/our-team" element={<OurTeam />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/security" element={<Security />} />
      <Route path="/who-we-are" element={<WhoWeAre />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/browse-authors" element={<BrowseAuthors />} />
      <Route path="/browse-categories" element={<BrowseCategories />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/job-listing" element={<JobListing />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/payment-links" element={<PaymentLinks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/saved-places" element={<SavedPlaces />} />
      <Route path="/shortlisted" element={<Shortlisted />} />
      <Route path="/site-map" element={<SiteMap />} />
      <Route path="/submit-listing" element={<SubmitListing />} />
      <Route path="/business/:id" element={<BusinessDetail />} />
    </RouterRoutes>
  );
}