import { Routes as RouterRoutes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import BusinessDetails from "@/pages/BusinessDetails";
import JobListing from "@/pages/JobListing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Checkout from "@/pages/Checkout";
import Pricing from "@/pages/Pricing";
import Privacy from "@/pages/Privacy";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/NotFound";
import Listings from "@/pages/dashboard/Listings";
import AddListing from "@/pages/dashboard/AddListing";
import Appointments from "@/pages/dashboard/Appointments";
import Bookmarks from "@/pages/dashboard/Bookmarks";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import Messages from "@/pages/dashboard/Messages";
import Wallet from "@/pages/dashboard/Wallet";
import ExploreListings from "@/pages/ExploreListings";
import BrowseAuthors from "@/pages/BrowseAuthors";
import SubmitListing from "@/pages/SubmitListing";
import Shortlisted from "@/pages/Shortlisted";
import BrowseCategories from "@/pages/BrowseCategories";
import PaymentLinks from "@/pages/PaymentLinks";
import SavedPlaces from "@/pages/SavedPlaces";
import WhoWeAre from "@/pages/WhoWeAre";
import OurMission from "@/pages/OurMission";
import OurTeam from "@/pages/OurTeam";
import Packages from "@/pages/Packages";
import SiteMap from "@/pages/SiteMap";
import Security from "@/pages/Security";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/job/:id" element={<JobListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/explore-listings" element={<ExploreListings />} />
        <Route path="/browse-authors" element={<BrowseAuthors />} />
        <Route path="/submit-listing" element={<SubmitListing />} />
        <Route path="/shortlisted" element={<Shortlisted />} />
        <Route path="/browse-categories" element={<BrowseCategories />} />
        <Route path="/payment-links" element={<PaymentLinks />} />
        <Route path="/saved-places" element={<SavedPlaces />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/security" element={<Security />} />
        <Route path="/dashboard/listings" element={<Listings />} />
        <Route path="/dashboard/add-listing" element={<AddListing />} />
        <Route path="/dashboard/appointments" element={<Appointments />} />
        <Route path="/dashboard/bookmarks" element={<Bookmarks />} />
        <Route path="/dashboard/change-password" element={<ChangePassword />} />
        <Route path="/dashboard/messages" element={<Messages />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </RouterRoutes>
  );
};

export default Routes;