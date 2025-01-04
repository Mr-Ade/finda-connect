import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCard = ({ 
  price, 
  oldPrice, 
  title, 
  subtitle, 
  features, 
  isPopular = false 
}: {
  price: string;
  oldPrice: string;
  title: string;
  subtitle: string;
  features: string[];
  isPopular?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl font-bold text-primary">${price}</span>
            <span className="text-gray-400 line-through">${oldPrice}</span>
          </div>
          <div className="relative inline-block">
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="absolute -right-16 -top-3">
              <span className={`text-xs px-2 py-1 rounded-full ${isPopular ? 'bg-primary' : 'bg-gray-100'} text-white`}>
                50% Off
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
        </div>
        
        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <i className="fas fa-angle-right text-primary"></i>
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
        
        <Link
          to="/checkout"
          className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md transition-colors
            ${isPopular 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          <ShoppingBasket className="w-4 h-4" />
          Purchase Now
        </Link>
      </div>
    </div>
  );
};

const Pricing = () => {
  const pricingPlans = [
    {
      price: "49",
      oldPrice: "149",
      title: "Personal",
      subtitle: "Best Choice for Individuals",
      features: [
        "Lifetime Bandwidth Usage",
        "6 Months Support & Updates",
        "10 Website License",
        "Quickstart Included",
        "Access to Plugins & Theme",
        "Branding/Copyright Removal"
      ]
    },
    {
      price: "129",
      oldPrice: "199",
      title: "Platinum",
      subtitle: "Best Choice for Businesses",
      features: [
        "Lifetime Bandwidth Usage",
        "12 Months Support & Updates",
        "20 Website License",
        "Quickstart Included",
        "Access to Plugins & Theme",
        "Branding/Copyright Removal"
      ],
      isPopular: true
    },
    {
      price: "149",
      oldPrice: "249",
      title: "Standard",
      subtitle: "Best Choice for Enterprises",
      features: [
        "Lifetime Bandwidth Usage",
        "Lifetime Support & Updates",
        "50 Website License",
        "Quickstart Included",
        "Access to Plugins & Theme",
        "Branding/Copyright Removal"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/pages" className="text-gray-300 hover:text-white">Pages</Link>
            <span className="text-gray-500">/</span>
            <span className="text-primary">Pricing</span>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h6 className="text-primary mb-2">Our Pricing</h6>
            <h2 className="text-3xl font-bold">Choose Your Package</h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;