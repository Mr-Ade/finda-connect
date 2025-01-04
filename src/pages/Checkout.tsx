import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { CreditCard, Wallet } from "lucide-react"

interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  paymentMethod: "flutterwave" | "paystack"
}

export default function Checkout() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const { register, handleSubmit, watch } = useForm<CheckoutFormData>()
  const selectedPaymentMethod = watch("paymentMethod")

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true)
    try {
      const reference = `order_${Date.now()}`
      const amount = 1000 // Replace with actual order amount

      const { data: paymentData, error } = await supabase.functions.invoke('process-payment', {
        body: {
          provider: data.paymentMethod,
          amount: amount,
          email: data.email,
          reference: reference,
        }
      })

      if (error) throw error

      if (data.paymentMethod === 'flutterwave' && paymentData.data.link) {
        window.location.href = paymentData.data.link
      } else if (data.paymentMethod === 'paystack' && paymentData.data.authorization_url) {
        window.location.href = paymentData.data.authorization_url
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="relative bg-primary/10 py-16 mb-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", { required: true })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register("phone", { required: true })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    {...register("address", { required: true })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      {...register("city", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      {...register("state", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      {...register("zipCode", { required: true })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <RadioGroup
                    defaultValue="flutterwave"
                    {...register("paymentMethod")}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
                  >
                    <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedPaymentMethod === 'flutterwave' ? 'border-primary' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="flutterwave" id="flutterwave" />
                        <Label htmlFor="flutterwave" className="cursor-pointer">
                          <div className="font-medium">Flutterwave</div>
                          <div className="text-sm text-muted-foreground">Pay with card via Flutterwave</div>
                        </Label>
                      </div>
                      <CreditCard className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedPaymentMethod === 'paystack' ? 'border-primary' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="paystack" id="paystack" />
                        <Label htmlFor="paystack" className="cursor-pointer">
                          <div className="font-medium">Paystack</div>
                          <div className="text-sm text-muted-foreground">Pay with card via Paystack</div>
                        </Label>
                      </div>
                      <Wallet className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦950.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₦50.00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₦1,000.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}