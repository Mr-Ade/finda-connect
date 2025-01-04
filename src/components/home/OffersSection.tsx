import { Button } from "@/components/ui/button";

export const OffersSection = () => {
  return (
    <section className="pt-4 pb-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Summer Sale Offer */}
          <div className="relative overflow-hidden rounded-lg bg-primary text-white p-8 transition-transform hover:scale-[1.02] duration-300">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-4">
                Summer Sale
              </span>
              <h4 className="text-3xl font-bold mb-6">30% Off on Eat &amp; Drink</h4>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100"
              >
                View Offers
              </Button>
            </div>
            <div 
              className="absolute inset-0 w-full h-full opacity-20 transition-opacity hover:opacity-25"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>

          {/* Delight Offer */}
          <div className="relative overflow-hidden rounded-lg bg-[#1e293b] text-white p-8 transition-transform hover:scale-[1.02] duration-300">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-4">
                Delight Offer
              </span>
              <h4 className="text-3xl font-bold mb-6">40% Off for Offices &amp; Space</h4>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-[#1e293b] hover:bg-gray-100"
              >
                View Offers
              </Button>
            </div>
            <div 
              className="absolute inset-0 w-full h-full opacity-20 transition-opacity hover:opacity-25"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};