import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error checking session:", error);
        return;
      }
      setIsAuthenticated(!!session);
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      setIsAuthenticated(!!session);
      
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      } else if (event === 'SIGNED_IN') {
        toast({
          title: "Signed in",
          description: "Welcome back!",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4d0af716-aad5-4a66-a3db-4a158a8037a8.png" 
              alt="Finda Logo" 
              className="h-8"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-4">
                <Link to="/explore-listings" className="text-gray-600 hover:text-primary">
                  Explore
                </Link>
                <Link to="/browse-categories" className="text-gray-600 hover:text-primary">
                  Categories
                </Link>
                <Link to="/browse-authors" className="text-gray-600 hover:text-primary">
                  Authors
                </Link>
                <Link to="/blog" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
                <Link to="/shop" className="text-gray-600 hover:text-primary">
                  Shop
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-primary">
                  Profile
                </Link>
              </div>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};