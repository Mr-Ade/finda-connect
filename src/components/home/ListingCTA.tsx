import { Button } from "@/components/ui/button";

export const ListingCTA = () => {
  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Business?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of businesses that trust us to connect them with customers
          </p>
          <Button
            className="bg-white text-primary hover:bg-gray-100"
            size="lg"
          >
            List Your Business
          </Button>
        </div>
      </div>
    </section>
  );
};