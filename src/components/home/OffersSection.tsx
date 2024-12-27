import { Button } from "@/components/ui/button";

export const OffersSection = () => {
  return (
    <section className="pt-4 pb-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Summer Sale Offer */}
          <div className="relative overflow-hidden rounded-lg bg-primary text-white p-8">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-4">
                Summer Sale
              </span>
              <h4 className="text-2xl font-bold mb-4">30% Off on Eat &amp; Drink</h4>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                View Offers
              </Button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20">
              {/* Background pattern or image could be added here */}
            </div>
          </div>

          {/* Delight Offer */}
          <div className="relative overflow-hidden rounded-lg bg-[#1e293b] text-white p-8">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-4">
                Delight Offer
              </span>
              <h4 className="text-2xl font-bold mb-4">40% Off for Offices &amp; Space</h4>
              <Button variant="secondary" size="lg" className="bg-white text-[#1e293b] hover:bg-gray-100">
                View Offers
              </Button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20">
              {/* Background pattern or image could be added here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};