import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "@/pages/Index";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyBookings from "@/pages/dashboard/MyBookings";
import AddListing from "@/pages/dashboard/AddListing";
import Listings from "@/pages/dashboard/Listings";
import Messages from "@/pages/dashboard/Messages";
import Wallet from "@/pages/dashboard/Wallet";
import NotFound from "@/pages/404";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/faq" component={FAQ} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/my-bookings" element={<MyBookings />} />
        <Route path="/dashboard/add-listing" component={AddListing} />
        <Route path="/dashboard/listings" component={Listings} />
        <Route path="/dashboard/messages" component={Messages} />
        <Route path="/dashboard/wallet" component={Wallet} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
