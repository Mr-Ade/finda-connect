import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingFeatureComparison } from "@/components/pricing/PricingFeatureComparison";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    frequency: "month",
    description: "Perfect for individuals starting out and exploring the platform.",
    features: [
      "1 Listing",
      "Ability to receive Reviews",
      "Basic Support",
    ],
    recommended: false,
    callToAction: "Start Free",
    idealFor: "Individuals exploring the platform",
  },
  {
    title: "Pro",
    price: "$19",
    frequency: "month",
    description: "Ideal for small businesses and active users looking for enhanced features and benefits.",
    features: [
      "All Free features",
      "5 Listings",
      "Review Boosts",
      "1 Check-in",
      "Basic Analytics",
      "Premium Support",
    ],
    recommended: true,
    callToAction: "Choose Pro",
    idealFor: "Small businesses and active users",
  },
  {
    title: "Business",
    price: "$49",
    frequency: "month",
    description: "The best for businesses aiming to maximize exposure and leverage all platform benefits.",
    features: [
      "All Pro features",
      "Unlimited Listings",
      "Unlimited Check-ins",
      "Unlimited Reviews",
      "Advanced Analytics",
      "Lead Management Tools",
      "Custom Branding Options",
      "Priority Premium Support",
    ],
    recommended: false,
    callToAction: "Choose Business",
    idealFor: "Businesses looking for maximum exposure",
  },
];

const featureComparison = {
  headers: ["Features", "Free", "Pro", "Business"],
  rows: [
    { feature: "Listings", Basic: "1", Standard: "5", Premium: "Unlimited" },
    { feature: "Reviews", Basic: "Basic", Standard: "Enhanced", Premium: "Unlimited" },
    { feature: "Check-ins", Basic: "0", Standard: "1", Premium: "Unlimited" },
    { feature: "Analytics", Basic: "Basic", Standard: "Basic", Premium: "Advanced" },
    { feature: "Support Level", Basic: "Basic", Standard: "Premium", Premium: "Priority" },
  ],
};

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and PayPal.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, you can start with our Free plan to explore the platform.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your account dashboard.",
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PricingHero />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <PricingFeatureComparison {...featureComparison} />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <PricingFAQ faqs={faqs} />
      </section>

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