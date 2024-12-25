import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Finda
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </nav>
  );
};