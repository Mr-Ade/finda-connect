import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocationData {
  city: string;
  country: string;
}

export const DashboardHeader = () => {
  const { data: profile, isLoading, error } = useQuery({
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

  // First cast to unknown, then to LocationData to satisfy TypeScript
  const locationData = (profile?.location_data as unknown) as LocationData;

  if (isLoading) {
    return (
      <section className="relative bg-cover bg-center py-16 flex items-center justify-center" 
               style={{ backgroundImage: "url('/placeholder.svg')" }}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-cover bg-center py-16" 
               style={{ backgroundImage: "url('/placeholder.svg')" }}>
        <div className="container mx-auto px-4">
          <Alert variant="destructive">
            <AlertDescription>
              Error loading profile: {error instanceof Error ? error.message : 'Unknown error'}
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-cover bg-center py-16" 
             style={{ backgroundImage: "url('/placeholder.svg')" }}>
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
            {locationData?.city && locationData?.country && (
              <span className="text-gray-200">
                <i className="lni lni-map-marker me-1"></i>
                {locationData.city}, {locationData.country}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};