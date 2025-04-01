
import Index from "@/pages/Index";
import NotFound from "@/pages/404";
import AuthorDetail from "@/pages/AuthorDetail";
import ExploreListings from "@/pages/ExploreListings";
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

export const mainRoutes = [
  { path: "/", element: <Index /> },
  { path: "*", element: <NotFound /> },
  { path: "/author/:username", element: <AuthorDetail /> },
  { path: "/explore-listings", element: <ExploreListings /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/our-mission", element: <OurMission /> },
  { path: "/our-team", element: <OurTeam /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/security", element: <Security /> },
  { path: "/who-we-are", element: <WhoWeAre /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:id", element: <BlogDetail /> },
  { path: "/browse-authors", element: <BrowseAuthors /> },
  { path: "/browse-categories", element: <BrowseCategories /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/job-listing", element: <JobListing /> },
  { path: "/packages", element: <Packages /> },
  { path: "/payment-links", element: <PaymentLinks /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/saved-places", element: <SavedPlaces /> },
  { path: "/shortlisted", element: <Shortlisted /> },
  { path: "/sitemap", element: <SiteMap /> },
  { path: "/submit-listing", element: <SubmitListing /> },
  { path: "/business/:id", element: <BusinessDetail /> },
];
