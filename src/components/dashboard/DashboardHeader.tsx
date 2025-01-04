import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const DashboardHeader = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  return (
    <section className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/placeholder.svg')" }}>
      <div className="absolute right-4 top-4">
        <Button asChild>
          <Link to="/dashboard/add-listing" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Listing
          </Link>
        </Button>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white">
            <img 
              src={profile?.avatar_url || "/placeholder.svg"} 
              alt={profile?.full_name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-2xl font-semibold text-white">{profile?.full_name}</h4>
            <span className="text-gray-200">
              <i className="lni lni-map-marker me-1"></i>
              {profile?.location_data?.city}, {profile?.location_data?.country}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};