import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PricingCardProps {
  title: string;
  price: string;
  frequency?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  callToAction: string;
  idealFor: string;
}

export const PricingCard = ({
  title,
  price,
  frequency,
  description,
  features,
  recommended = false,
  callToAction,
  idealFor,
}: PricingCardProps) => {
  return (
    <Card className={`relative p-6 ${recommended ? 'border-2 border-primary' : ''}`}>
      {recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center justify-center gap-2 my-4">
          <span className="text-4xl font-bold">{price}</span>
          {frequency && <span className="text-gray-500">/{frequency}</span>}
        </div>
        <p className="text-gray-500">{description}</p>
        <p className="text-sm text-primary mt-2">{idealFor}</p>
      </div>
      
      <div className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button 
        className="w-full"
        variant={recommended ? "default" : "outline"}
      >
        {callToAction}
      </Button>
    </Card>
  );
};