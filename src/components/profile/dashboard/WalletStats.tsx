import React from "react";
import { Card } from "@/components/ui/card";
import { CreditCard, Wallet, MessageSquare, ShoppingBasket } from "lucide-react";

export const WalletStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-red-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">$12,500</h2>
        <p className="text-sm opacity-90">Withdrawable Balance</p>
        <CreditCard className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>

      <Card className="bg-green-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">$18,000</h2>
        <p className="text-sm opacity-90">Total Earnings</p>
        <Wallet className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>

      <Card className="bg-yellow-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">312</h2>
        <p className="text-sm opacity-90">Total Reviews</p>
        <MessageSquare className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>

      <Card className="bg-purple-500 p-6 text-white relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-1">616</h2>
        <p className="text-sm opacity-90">Total Orders</p>
        <ShoppingBasket className="absolute right-4 bottom-4 opacity-20 text-white w-12 h-12" />
      </Card>
    </div>
  );
};