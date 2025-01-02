import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import BusinessDetails from "@/pages/BusinessDetails";
import Listings from "@/pages/dashboard/Listings";
import AddListing from "@/pages/dashboard/AddListing";
import Bookmarks from "@/pages/dashboard/Bookmarks";
import Messages from "@/pages/dashboard/Messages";
import Wallet from "@/pages/dashboard/Wallet";
import ChangePassword from "@/pages/dashboard/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/dashboard/listings" element={<Listings />} />
        <Route path="/dashboard/add-listing" element={<AddListing />} />
        <Route path="/dashboard/bookmarks" element={<Bookmarks />} />
        <Route path="/dashboard/messages" element={<Messages />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="/profile/password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;