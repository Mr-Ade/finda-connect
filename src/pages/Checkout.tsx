import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<"flutterwave" | "paystack">("flutterwave");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    try {
      const { data: paymentData, error } = await supabase.functions.invoke('process-payment', {
        body: {
          provider: paymentMethod,
          amount: 1000, // Amount in smallest currency unit (e.g., kobo for NGN)
          email: data.email,
          phone: data.phone,
          name: `${data.firstName} ${data.lastName}`,
        },
      });

      if (error) throw error;

      // Redirect to payment URL
      window.location.href = paymentData.authorization_url;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName", { required: true })}
                  className={errors.firstName ? "border-red-500" : ""}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName", { required: true })}
                  className={errors.lastName ? "border-red-500" : ""}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className={errors.email ? "border-red-500" : ""}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone", { required: true })}
                className={errors.phone ? "border-red-500" : ""}
              />
            </div>

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                {...register("address", { required: true })}
                className={errors.address ? "border-red-500" : ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...register("city", { required: true })}
                  className={errors.city ? "border-red-500" : ""}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  {...register("state", { required: true })}
                  className={errors.state ? "border-red-500" : ""}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                {...register("zipCode", { required: true })}
                className={errors.zipCode ? "border-red-500" : ""}
              />
            </div>

            <div className="mt-6">
              <Label className="text-lg font-semibold mb-4">Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: "flutterwave" | "paystack") => setPaymentMethod(value)}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="flutterwave" id="flutterwave" />
                  <Label htmlFor="flutterwave" className="font-medium">
                    Flutterwave
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="paystack" id="paystack" />
                  <Label htmlFor="paystack" className="font-medium">
                    Paystack
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span>₦9,000</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Tax</span>
              <span>₦1,000</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total</span>
              <span>₦10,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;