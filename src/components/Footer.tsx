import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 block">
              Finda
            </Link>
            <p className="text-gray-600 mb-4">
              7742 Sadar Street Range Road, USA<br />
              United Kingdom GHQ11
            </p>
            <p className="text-gray-600 mb-4">
              40 568 423 6597<br />
              support@finda.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">About Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Who We're?</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Our Mission</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Our team</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-primary">Packages</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>

          {/* Main Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Main Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/explore-listings" className="text-gray-600 hover:text-primary">Explore Listings</Link></li>
              <li><Link to="/browse-authors" className="text-gray-600 hover:text-primary">Browse Authors</Link></li>
              <li><Link to="/submit-listing" className="text-gray-600 hover:text-primary">Submit Listings</Link></li>
              <li><Link to="/shortlisted" className="text-gray-600 hover:text-primary">Shortlisted</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>

          {/* Business Owners */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Business Owners</h4>
            <ul className="space-y-2">
              <li><Link to="/browse-categories" className="text-gray-600 hover:text-primary">Browse Categories</Link></li>
              <li><Link to="/payment-links" className="text-gray-600 hover:text-primary">Payment Links</Link></li>
              <li><Link to="/saved-places" className="text-gray-600 hover:text-primary">Saved Places</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Helpful Links</h4>
            <ul className="space-y-2">
              <li><Link to="/sitemap" className="text-gray-600 hover:text-primary">Site Map</Link></li>
              <li><Link to="/security" className="text-gray-600 hover:text-primary">Security</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary">FAQ's Page</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2024 Finda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};