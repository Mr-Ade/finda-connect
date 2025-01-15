import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Home, User, ListPlus, CreditCard, Search, 
  AlertCircle, MessageSquare, Wallet, Settings,
  BookmarkPlus, FileText, Mail, HelpCircle,
  Building, Map, Lock, Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteMapCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: {
    name: string;
    path: string;
    requiresAuth?: boolean;
    isPriority?: boolean;
  }[];
}

const SiteMap = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Site Map", href: "#", active: true },
  ];

  const categories: SiteMapCategory[] = [
    {
      title: "Main Pages",
      description: "Essential pages for navigating our platform",
      icon: <Home className="w-6 h-6" />,
      links: [
        { name: "Home", path: "/", isPriority: true },
        { name: "About Us", path: "/about-us" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
        { name: "FAQ", path: "/faq" }
      ]
    },
    {
      title: "User Account",
      description: "Manage your profile and account settings",
      icon: <User className="w-6 h-6" />,
      links: [
        { name: "Login", path: "/login", isPriority: true },
        { name: "Signup", path: "/signup", isPriority: true },
        { name: "Dashboard", path: "/dashboard", requiresAuth: true },
        { name: "My Profile", path: "/dashboard/profile", requiresAuth: true },
        { name: "Change Password", path: "/dashboard/change-password", requiresAuth: true },
        { name: "My Bookings", path: "/dashboard/my-bookings", requiresAuth: true },
        { name: "My Listings", path: "/dashboard/listings", requiresAuth: true },
        { name: "Saved Listings", path: "/dashboard/saved-listings", requiresAuth: true },
        { name: "Messages", path: "/dashboard/messages", requiresAuth: true },
        { name: "Wallet", path: "/dashboard/wallet", requiresAuth: true }
      ]
    },
    {
      title: "Listing Management",
      description: "Create and manage your business listings",
      icon: <ListPlus className="w-6 h-6" />,
      links: [
        { name: "Add Listing", path: "/dashboard/add-listing", requiresAuth: true },
        { name: "Explore Listings", path: "/explore-listings", isPriority: true },
        { name: "Browse Categories", path: "/browse-categories" },
        { name: "Browse Authors", path: "/browse-authors" }
      ]
    },
    {
      title: "Payment & Booking",
      description: "Handle payments and manage bookings",
      icon: <CreditCard className="w-6 h-6" />,
      links: [
        { name: "Checkout", path: "/checkout", requiresAuth: true },
        { name: "Pricing", path: "/pricing", isPriority: true },
        { name: "Packages", path: "/packages" }
      ]
    },
    {
      title: "Help & Support",
      description: "Get help and learn more about our platform",
      icon: <HelpCircle className="w-6 h-6" />,
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Security", path: "/security" },
        { name: "Our Mission", path: "/our-mission" },
        { name: "Our Team", path: "/our-team" },
        { name: "Who We Are", path: "/who-we-are" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Site Map</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find everything you need on our platform with this comprehensive site map. 
              Pages marked with a <Lock className="w-4 h-4 inline mx-1" /> require authentication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.path}
                        className={cn(
                          "flex items-center gap-2 text-gray-600 hover:text-primary transition-colors",
                          link.isPriority && "font-medium text-primary"
                        )}
                      >
                        {link.requiresAuth && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        {link.name}
                        {link.isPriority && (
                          <Star className="w-4 h-4 text-yellow-400" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default SiteMap;