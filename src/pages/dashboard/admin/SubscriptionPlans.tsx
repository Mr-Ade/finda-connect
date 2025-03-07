
import { AdminRoute } from "@/components/auth/AdminRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  duration: string;
}

const SubscriptionPlans = () => {
  const { toast } = useToast();
  
  const { data: plans, isLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      // Since subscription_plans table doesn't exist in the types,
      // we'll use mock data for the UI demonstration
      // In a real implementation, you would connect this to your actual subscription table
      return [
        {
          id: '1',
          name: 'Basic',
          price: 9.99,
          features: ['List 1 business', 'Basic analytics', 'Email support'],
          duration: 'monthly'
        },
        {
          id: '2',
          name: 'Premium',
          price: 29.99,
          features: ['List up to 5 businesses', 'Advanced analytics', 'Priority support', 'Featured listings'],
          duration: 'monthly'
        },
        {
          id: '3',
          name: 'Enterprise',
          price: 99.99,
          features: ['Unlimited businesses', 'Custom analytics', '24/7 Support', 'Featured listings', 'API Access'],
          duration: 'monthly'
        }
      ] as SubscriptionPlan[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Plan
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans?.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.duration}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm">• {feature}</li>
                  ))}
                </ul>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <SubscriptionPlans />
  </AdminRoute>
);
