import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Checkout from "@/pages/Checkout";
import PaymentLinks from "@/pages/PaymentLinks";
import ProductDetails from "@/pages/ProductDetails";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-links" element={<PaymentLinks />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
