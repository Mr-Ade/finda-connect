import { Button } from "@/components/ui/button";

export const PricingHero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Choose the Right Plan for Your Business
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Finda provides a range of plans to help businesses of all sizes manage their online reputation. Choose the plan that best fits your needs and budget.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg">
            Start Free Trial
          </Button>
          <p className="text-sm text-gray-500 flex items-center">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};