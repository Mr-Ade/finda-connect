import { Card } from "@/components/ui/card";

export const OrderSummary = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$900.00</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$100.00</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$1,000.00</span>
          </div>
        </div>
      </div>
    </Card>
  );
};