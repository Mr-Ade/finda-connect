import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { CheckoutForm, type CheckoutFormData } from "@/components/checkout/CheckoutForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"

export default function Checkout() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

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
            <CheckoutForm isProcessing={isProcessing} onSubmit={onSubmit} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}