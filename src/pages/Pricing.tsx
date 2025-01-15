import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingBasket, Check, X, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingCard = ({ 
  price, 
  oldPrice, 
  title, 
  subtitle, 
  features, 
  isPopular = false,
  recommended = "" 
}: {
  price: string;
  oldPrice: string;
  title: string;
  subtitle: string;
  features: string[];
  isPopular?: boolean;
  recommended?: string;
}) => {
  return (
    <div className="w-full">
      <div className={`relative bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${isPopular ? 'border-2 border-primary' : ''}`}>
        {isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>
        )}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-4xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-400 line-through">${oldPrice}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
              50% Off
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-2">{subtitle}</p>
          {recommended && (
            <p className="text-sm text-primary mt-2 font-medium">{recommended}</p>
          )}
        </div>
        
        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
        
        <Link
          to="/checkout"
          className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md transition-colors
            ${isPopular 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
        >
          <ShoppingBasket className="w-4 h-4" />
          Get Started
        </Link>
      </div>
    </div>
  );
};

const FAQSection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Are there any hidden fees?</AccordionTrigger>
          <AccordionContent>
            No, the price you see is the price you pay. We believe in transparent pricing with no hidden costs or surprise charges.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
          <AccordionContent>
            Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
          <AccordionContent>
            Yes, all plans come with a 14-day free trial. No credit card required to start.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const Pricing = () => {
  const pricingPlans = [
    {
      price: "49",
      oldPrice: "99",
      title: "Basic",
      subtitle: "Perfect for Getting Started",
      recommended: "Ideal for small businesses",
      features: [
        "List up to 5 businesses",
        "Basic analytics",
        "Email support",
        "Basic business profile",
        "Customer reviews",
        "Mobile-friendly listings"
      ]
    },
    {
      price: "99",
      oldPrice: "199",
      title: "Professional",
      subtitle: "Most Popular Choice",
      recommended: "Perfect for growing businesses",
      features: [
        "List up to 20 businesses",
        "Advanced analytics",
        "Priority email & chat support",
        "Enhanced business profile",
        "Customer reviews & responses",
        "Featured listings"
      ],
      isPopular: true
    },
    {
      price: "199",
      oldPrice: "399",
      title: "Enterprise",
      subtitle: "For Large Organizations",
      recommended: "Best for large businesses",
      features: [
        "Unlimited business listings",
        "Custom analytics",
        "24/7 priority support",
        "Custom business profiles",
        "Advanced review management",
        "Premium featured listings"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose the Right Plan for Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, transparent pricing that grows with your business. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="mt-16 max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-center mb-8">Feature Comparison</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 py-3 border-b">
                  <div className="font-medium">Feature</div>
                  <div className="text-center font-medium">Basic</div>
                  <div className="text-center font-medium">Professional</div>
                  <div className="text-center font-medium">Enterprise</div>
                </div>
                {[
                  { name: "Business Listings", basic: "5", pro: "20", enterprise: "Unlimited" },
                  { name: "Analytics", basic: "Basic", pro: "Advanced", enterprise: "Custom" },
                  { name: "Support", basic: "Email", pro: "Priority", enterprise: "24/7" },
                  { name: "Featured Listings", basic: <X className="mx-auto text-red-500 w-5 h-5" />, pro: <Check className="mx-auto text-primary w-5 h-5" />, enterprise: <Check className="mx-auto text-primary w-5 h-5" /> },
                  { name: "API Access", basic: <X className="mx-auto text-red-500 w-5 h-5" />, pro: <Check className="mx-auto text-primary w-5 h-5" />, enterprise: <Check className="mx-auto text-primary w-5 h-5" /> }
                ].map((feature, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b last:border-0">
                    <div className="flex items-center">{feature.name}</div>
                    <div className="text-center flex items-center justify-center">{feature.basic}</div>
                    <div className="text-center flex items-center justify-center">{feature.pro}</div>
                    <div className="text-center flex items-center justify-center">{feature.enterprise}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
          <p className="text-gray-600 mb-8">
            Our team is here to help you choose the right plan for your business
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-6 py-3 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;