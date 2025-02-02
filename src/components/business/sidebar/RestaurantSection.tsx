import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface RestaurantSectionProps {
  delivery_info?: {
    available: boolean;
    minimum_order?: number;
    fee?: number;
    estimated_time?: string;
  };
}

export const RestaurantSection = ({ delivery_info }: RestaurantSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-1">Order Food</h4>
      <div className="flex justify-between text-sm mb-4">
        <div>
          ${delivery_info?.fee?.toFixed(2) || '0.99'}+ 
          <span className="text-gray-500 block">delivery fee</span>
        </div>
        <div>
          ${delivery_info?.minimum_order || '0'} 
          <span className="text-gray-500 block">min</span>
        </div>
        <div>
          {delivery_info?.estimated_time || '35-45'} 
          <span className="text-gray-500 block">mins</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input className="pl-10" placeholder="Enter delivery address" />
        </div>
        <Button className="w-full">Start Your Order</Button>
      </div>
    </div>
  );
};