import { CreditCard, Wallet } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UseFormRegister } from "react-hook-form"
import { CheckoutFormData } from "./CheckoutForm"

interface PaymentMethodSelectorProps {
  selectedMethod: "flutterwave" | "paystack" | undefined
  register: UseFormRegister<CheckoutFormData>
}

export function PaymentMethodSelector({ selectedMethod, register }: PaymentMethodSelectorProps) {
  return (
    <div>
      <Label>Payment Method</Label>
      <RadioGroup
        defaultValue="flutterwave"
        {...register("paymentMethod")}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
      >
        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedMethod === 'flutterwave' ? 'border-primary' : ''}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="flutterwave" id="flutterwave" />
            <Label htmlFor="flutterwave" className="cursor-pointer">
              <div className="font-medium">Flutterwave</div>
              <div className="text-sm text-muted-foreground">Pay with card via Flutterwave</div>
            </Label>
          </div>
          <CreditCard className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedMethod === 'paystack' ? 'border-primary' : ''}`}>
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
  )
}