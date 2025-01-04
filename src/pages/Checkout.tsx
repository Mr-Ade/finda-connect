import { OrderSummary } from "@/components/checkout/OrderSummary";
import { BillingForm } from "@/components/checkout/BillingForm";

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BillingForm />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;