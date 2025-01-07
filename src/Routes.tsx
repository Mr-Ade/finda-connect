import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ExploreListings from "@/pages/ExploreListings";
import BusinessDetails from "@/pages/BusinessDetails";
import SubmitListing from "@/pages/SubmitListing";
import { BusinessFormProvider } from "@/contexts/BusinessFormContext";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/explore" element={<ExploreListings />} />
      <Route path="/business/:id" element={<BusinessDetails />} />
      <Route 
        path="/submit-listing" 
        element={
          <BusinessFormProvider>
            <SubmitListing />
          </BusinessFormProvider>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;