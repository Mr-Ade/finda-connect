import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/home/Hero";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { PopularCategories } from "@/components/home/PopularCategories";
import { ListingCTA } from "@/components/home/ListingCTA";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log("No session found, redirecting to login");
        navigate("/login");
      }
    };
    
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FeaturedBusinesses />
      <PopularCategories />
      <ListingCTA />
    </div>
  );
};

export default Index;