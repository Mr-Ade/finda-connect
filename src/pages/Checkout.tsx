import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { BillingForm, type CheckoutFormData } from "@/components/checkout/BillingForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const Checkout = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (values: CheckoutFormData) => {
    try {
      setIsProcessing(true);
      console.log("Processing payment with values:", values);

      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        "process-payment",
        {
          body: {
            amount: 1000,
            email: values.email,
            name: `${values.firstName} ${values.lastName}`,
            phone: values.phone,
            paymentMethod: values.paymentMethod,
          },
        }
      );

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      console.log("Payment response:", paymentData);

      if (values.paymentMethod === "flutterwave") {
        window.FlutterwaveCheckout({
          ...paymentData,
          callback: async (response: any) => {
            console.log("Payment callback response:", response);
            if (response.status === "successful") {
              toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
              });
            }
            window.FlutterwaveCheckout.close();
          },
          onclose: () => {
            setIsProcessing(false);
          },
        });
      } else {
        // Paystack
        window.PaystackPop.setup({
          ...paymentData,
          callback: async (response: any) => {
            console.log("Payment callback response:", response);
            if (response.status === "success") {
              toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
              });
            }
            setIsProcessing(false);
          },
          onClose: () => {
            setIsProcessing(false);
          },
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-[#05222A] py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-white hover:text-primary">Home</a>
            <span className="text-white">/</span>
            <a href="#" className="text-white hover:text-primary">Page</a>
            <span className="text-white">/</span>
            <span className="text-primary">Booking Page</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="p-6">
              <BillingForm onSubmit={handleSubmit} isProcessing={isProcessing} />
            </Card>
          </div>

          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Checkout;